import { Component, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AirportsFinderService } from '../services/airportfinder/airportsfinder.service';
import { AlertService } from '../services/alertservice/alert.service';
import { AirportsScheduleService } from '../services/airportschedule/airportschedule.service';

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

  chooseAirport() {
    this.alertService.showSelectAirportAlert(this.airportList, (data) => {
      this.airport = data;
      this.storageService.set('selectedAirport', data);
      this.fetchData(this.airport);
    });
  }

  fetchData(airport: any): Promise<any> {
    this.loading = true;
    return this.airportScheduleService.getScheduledFlightsFrom(this.airport.code)
      .then(result => {
        this.flightList = result.operationalFlights;
        this.loading = false;
        this.changeRef.detectChanges();
      })
      .catch(() => {
        this.loading = false;
        this.changeRef.detectChanges();
      });
  }

  getBadgeColor(status: string): string {
    switch (status) {
      case 'Arrived':
        return 'success';

      case 'Cancelled':
        return 'danger';

      case 'Delayed departure':
        return 'warning'

      default:
        return 'primary';
    }
  }

  private async initLocationAndAirportList(): Promise<any> {
    // const coords = await this.geolocationService.getCurrentPosition();
    return this.airportFinderService.getNearbyAirports('', '');
  }
}
