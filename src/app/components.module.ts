
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { CommonModule } from '@angular/common';

const componentsList = [
    LoadingComponent,
    FlightCardComponent,
]

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
    ],
    exports: [
      componentsList,
    ],
    declarations: [
      componentsList,
    ],
    providers: [],
  })
  export class ComponentsModule { }
  