import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionService {
  public timeout: number;
  public airportFinderURL: string;
  public airportScheduleURL: string;
  public kiwiImagesURL: string;
  private airFranceKLMToken: string;

  constructor() {
    this.timeout = 30000;
    this.airportScheduleURL = 'https://api.airfranceklm.com/opendata/flightstatus/';
    this.kiwiImagesURL = 'https://images.kiwi.com/airlines';

    this.setAirFranceKLMToken('xefe9p752d7bvexg3zgyhafv');
  }

  setAirFranceKLMToken(token: string) {
    this.airFranceKLMToken = token;
  }

  getAirFranceKLMToken(): string {
    return this.airFranceKLMToken;
  }
}