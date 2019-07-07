// fa2b142942msh96228da3f528cf3p135b18jsn7445a5be6

import { Injectable } from '@angular/core';
// import { ConnectionService } from '../../services/connection/connection.service';
// import { BaseProvider } from '../base/base.provider';
// import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AirportFinderProvider {

  constructor(
    // private baseProvider: BaseProvider,
    // private connectionService: ConnectionService,
    // private httpClient: HttpClient,
  ) {

  }

  getNearestAirports(lat: string, long: string): Promise<any> {
    // TODO: get nearby airports based on lat and long;

    return Promise.resolve({
      data: {
        airports: [
          {
            code: 'UTC',
            name: 'Utrecht',
            city: 'Utrecht',
            countryCode: 'NL'
          },
          {
            code: 'AMS',
            name: 'Amsterdam',
            city: 'Amsterdam',
            countryCode: 'NL'
          },
          {
            code: 'RTM',
            name: 'Rotterdam',
            city: 'Rotterdam',
            countryCode: 'NL'
          },
          {
            code: 'GRU',
            name: 'Sao Paulo Intl',
            city: 'Sao Paulo',
            countryCode: 'BR'
          },
          {
            code: 'CGH',
            name: 'Congonhas Apt, Sao Paulo',
            city: 'Sao Paulo',
            countryCode: 'BR'
          },
        ]
      }
    });
  }
}
