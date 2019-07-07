import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionService {
  public timeout: number;
  public airportFinderURL: string;
  public airportScheduleURL: string;
  private airFranceKLMToken: string;

  constructor() {
    this.timeout = 30000;
    this.airportScheduleURL = 'https://api.airfranceklm.com/opendata/flightstatus/';

    this.setAirFranceKLMToken('xefe9p752d7bvexg3zgyhafv');
  }

  setAirFranceKLMToken(token: string) {
    this.airFranceKLMToken = token;
  }

  getAirFranceKLMToken(): string {
    return this.airFranceKLMToken;
  }
}