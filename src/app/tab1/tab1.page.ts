import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AirportsFinderService } from '../services/airportfinder/airportsfinder.service';
import { AlertService } from '../services/alertservice/alert.service';
import { AirportsScheduleService } from '../services/airportschedule/airportschedule.service';
import { Subject, of } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FlightReducerService } from '../reducers/flights/flight.reducer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  public airportList: any = [];
  public airport: any = {};
  public loading: boolean;
  public flightList: any = [];
  public flightListFiltered: any = [];
  public displaySearchBar: boolean;
  private filterString: Subject<string> = new Subject<string>();
  public isFiltering: boolean;

  constructor(
    private storageService: StorageService,
    private airportFinderService: AirportsFinderService,
    private alertService: AlertService,
    private airportScheduleService: AirportsScheduleService,
    private changeRef: ChangeDetectorRef,
    private router: Router,
    private flightReducerSercice: FlightReducerService,
  ) {

  }

  ngOnInit(): void {
    this.filterString
    .pipe(
      debounceTime(300),
      switchMap(input => of(this.filter(input))),
    )
    .subscribe(data => {
      this.isFiltering = false;
      this.flightListFiltered = data;
    });
  }

  ngOnDestroy(): void {
    this.filterString.unsubscribe();
  }

  goToFlightDetails(flight: any) {
    this.flightReducerSercice.setActive(flight);
    this.router.navigate(['/flight-details']);
  }

  ionViewDidEnter() {
    // TODO: Transfer this to akita service
    this.initLocationAndAirportList()
      .then((airportList: any) => {
        this.airportList = !!airportList && airportList.data.airports ?
        airportList.data.airports.map((airport: { name: any; code: any; countryCode: any; }) => {
          return {
            name: airport.name,
            type: 'radio',
            label: `${airport.code} - ${airport.name} ${airport.countryCode}`,
            value: airport
          };
        }) : [];

        return this.storageService.get('selectedAirport');
      })
      .then((data: any) => {
        if (data) {
          this.airport = data;
          this.fetchData(this.airport);

        } else {
          this.chooseAirport();
        }
      });
  }

  chooseAirport() {
    this.alertService.showSelectAirportAlert(this.airportList, (data) => {
      if (data) {
        this.airport = data;
        this.storageService.set('selectedAirport', data);
        this.fetchData(this.airport);
      }
    });
  }

  fetchData(airport: any): Promise<any> {
    this.loading = true;
    this.flightList = [];
    this.flightListFiltered = [... this.flightList];
    // TODO: Transfer this to akita service
    return this.airportScheduleService.getScheduledFlightsFrom(airport.code)
      .then(result => {
        this.flightList = result.operationalFlights;
        this.flightListFiltered = [... this.flightList];
        this.flightReducerSercice.setFlightList([...this.flightList]);
        this.loading = false;
        this.changeRef.detectChanges();
      })
      .catch(() => {
        this.loading = false;
        this.changeRef.detectChanges();
      });
  }

  getAirlineLogo(icao: string): string {
    return this.airportFinderService.getAirlineLogo(icao, 32);
  }

  showSearchBar() {
    this.displaySearchBar = !this.displaySearchBar;
  }

  searchFlights(event: any) {
    this.isFiltering = true;
    this.filterString.next(event.detail.value);
  }

  filter(value: string): any[] {
    return this.flightList.filter(item => {
      const flightCode = !!item && !!item.airline && !!item.airline.code ? item.airline.code : '';
      const flightNumber = !!item && !!item.flightNumber ? item.flightNumber : '';
      const flightStatus = !!item && !!item.flightStatusPublicLangTransl ? item.flightStatusPublicLangTransl.toLowerCase() : '';
      const airlineName = !!item && !!item.airline && !!item.airline.name ? item.airline.name.toLowerCase() : '';

      return !!flightCode && flightCode.includes(value) ||
             !!flightNumber && flightNumber.toString().includes(value) ||
             !!flightStatus && flightStatus.includes(value.toLowerCase()) ||
             !!item && !!item.route && item.route.includes(value) ||
             !!airlineName && airlineName.includes(value.toLowerCase());
    });
  }

  private async initLocationAndAirportList(): Promise<any> {
    // const coords = await this.geolocationService.getCurrentPosition();
    return this.airportFinderService.getNearbyAirports('', '');
  }
}
