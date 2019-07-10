import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightQuery } from '../reducers/flights/flight.query';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.page.html',
  styleUrls: ['./flight-details.page.scss'],
})
export class FlightDetailsPage implements OnInit, OnDestroy {
  public flight: any = {};
  public selectedFlightSubscription: any;

  constructor(
    private flightQuery: FlightQuery,
  ) { }

  ngOnInit() {
    const flight$: Observable<any> = this.flightQuery.selectActive();

    this.selectedFlightSubscription = flight$
      .subscribe(flight => {
        this.flight = flight;

        // console.log(this.flight);
      })
  }

  ngOnDestroy(): void {
    this.selectedFlightSubscription.unsubscribe();
  }

  getFlightDuration(duration: string) {
    return !!duration ? moment.duration(duration, 'minutes').format('hh:mm') : ' - ';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Arrived':
        return 'var(--ion-color-success)';

      case 'Cancelled':
        return 'var(--ion-color-danger)';

      case 'Delayed departure':
        return 'var(--ion-color-warning)';

      case 'New departure time':
        return 'var(--ion-color-secondary)';

      default:
        return 'var(--ion-color-primary)';
    }
  }

}
