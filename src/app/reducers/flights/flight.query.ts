import { QueryEntity } from '@datorama/akita';
import { FlightState, FlightStore } from './flight.store';
import { Injectable } from '@angular/core';

@Injectable()
export class FlightQuery extends QueryEntity<FlightState> {
  constructor(protected store: FlightStore) {
    super(store);
  }
}
