import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertService {

  constructor(
    private alertCtrl: AlertController
  ) {}

  async showSelectAirportAlert(airportList: any[], event?: any) {
    const confirm = await this.alertCtrl.create({
      header: 'Select an Airport',
      inputs: airportList,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          async handler(data: any): Promise<void> {
            await event(data);
         }
        },
      ],
    });

    await confirm.present();
  }
}