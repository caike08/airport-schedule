// fa2b142942msh96228da3f528cf3p135b18jsn7445a5be6

import { Injectable } from '@angular/core';

import { ConnectionService } from '../../services/connection/connection.service';
import { BaseProvider } from '../base/base.provider';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class AirportScheduleProvider {

  constructor(
    private baseProvider: BaseProvider,
    private connectionService: ConnectionService,
  ) {

  }

  getScheduledFlightsFrom(airportCode: string): Promise<any> {
    const url = this.connectionService.airportScheduleURL;

    const today = moment().utc().format();
    const tomorrow = moment().add(1, 'd').utc().format();

    return this.baseProvider.getHTTP(`${url}?origin=${airportCode}&startRange=${today}&endRange=${tomorrow}&timeOriginType=S`);
  }

}
