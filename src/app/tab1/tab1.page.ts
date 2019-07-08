import { Component, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AirportsFinderService } from '../services/airportfinder/airportsfinder.service';
import { AlertService } from '../services/alertservice/alert.service';
import { AirportsScheduleService } from '../services/airportschedule/airportschedule.service';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public airportList: any = [];
  public airport: any = {};
  public loading: boolean;
  public flightList: any = [];
  public displaySearchBar: boolean;
  private filterString: Subject<string> = new Subject<string>();

  constructor(
    private storageService: StorageService,
    private airportFinderService: AirportsFinderService,
    private alertService: AlertService,
    private airportScheduleService: AirportsScheduleService,
    private changeRef: ChangeDetectorRef
  ) {

  }

  ionViewDidEnter() {
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

  ionViewDidLoad() {
    this.filterString
      .pipe(
        debounceTime(300),
        switchMap(value => of(this.filter(value)))
      )
      .subscribe(value => {
        this.flightList = value;
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
    return this.airportScheduleService.getScheduledFlightsFrom(this.airport.code)
      .then(result => {
        this.flightList = result.operationalFlights;
        // console.log(this.flightList[0]);
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
    this.filterString.next(event.detail.value);
  }

  filter(value: string): any[] {
    return this.flightList.filter(item => {
      const flightCode = !!item && !!item.airline && !!item.airline.code ? item.airline.code : '';
      const flightNumber = !!item && !!item.flightNumber ? item.flightNumber : '';
      const flightStatus = !!item && !!item.flightStatusPublicLangTransl ? item.flightStatusPublicLangTransl : '';


      return !!flightCode && flightCode.includes(value) ||
             !!flightNumber && flightNumber.toString().includes(value) ||
             !!flightStatus && flightStatus.includes(value) ||
             !!item && !!item.route && item.route.includes(value);
    });
  }

  private async initLocationAndAirportList(): Promise<any> {
    // const coords = await this.geolocationService.getCurrentPosition();
    return this.airportFinderService.getNearbyAirports('', '');
  }
}
