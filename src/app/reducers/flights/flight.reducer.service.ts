import { Injectable } from '@angular/core';
import { FlightQuery } from './flight.query';
import { FlightStore } from './flight.store';

@Injectable()
export class FlightReducerService {
  constructor(
    private flightQuery: FlightQuery,
    private flightStore: FlightStore,
  ) {

  }

  setFlightList(flightList: any) {
    this.flightStore.set(flightList);
  }

  setActive(flight: any) {
    this.flightStore.setActive(flight.id);
  }
}
