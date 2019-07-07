import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable()
export class GeolocationService {

  constructor(
    private geolocation: Geolocation
  ) {};

  async getCurrentPosition(): Promise<any> {
    return this.geolocation.getCurrentPosition()
      .then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
        return resp.coords;
     }).catch((error) => {

     });
  }

}