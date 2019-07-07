import { Injectable } from '@angular/core';
import { AirportScheduleProvider } from 'src/app/providers/airportschedule/airportschedule.provider';

@Injectable()
export class AirportsScheduleService {

  constructor(
    private airportScheduleProvider: AirportScheduleProvider
  ) {};

  async getScheduledFlightsFrom(airportCode: string): Promise<any> {
    return this.airportScheduleProvider.getScheduledFlightsFrom(airportCode);
  }

}