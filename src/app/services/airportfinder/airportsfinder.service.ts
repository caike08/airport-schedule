import { Injectable } from '@angular/core';
import { AirportFinderProvider } from 'src/app/providers/airportfinder/airportfinder.provider';

@Injectable()
export class AirportsFinderService {

  constructor(
    private airportFinderProvider: AirportFinderProvider,
  ) {};

  async getNearbyAirports(lat: string, long: string): Promise<any> {
    return this.airportFinderProvider.getNearestAirports(lat, long);
  }

}