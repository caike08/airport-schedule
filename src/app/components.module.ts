
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';

const componentsList = [
    LoadingComponent,
]

@NgModule({
    imports: [
      IonicModule,
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
  