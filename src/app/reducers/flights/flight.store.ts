import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface FlightState extends EntityState<any> { }

@Injectable()
@StoreConfig({ name: 'flights' })
export class FlightStore extends EntityStore<FlightState> {
  constructor() {
    super();
  }
}
