import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionService } from './services/connection/connection.service';
import { BaseProvider } from './providers/base/base.provider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './providers/base/token.interceptor';
import { AlertService } from './services/alertservice/alert.service';
import { GeolocationService } from './services/geolocationservice/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AirportFinderProvider } from './providers/airportfinder/airportfinder.provider';
import { AirportsFinderService } from './services/airportfinder/airportsfinder.service';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './services/storage/storage.service';
import { AirportsScheduleService } from './services/airportschedule/airportschedule.service';
import { AirportScheduleProvider } from './providers/airportschedule/airportschedule.provider';
import { FlightStore } from './reducers/flights/flight.store';
import { FlightQuery } from './reducers/flights/flight.query';
import { FlightReducerService } from './reducers/flights/flight.reducer.service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AkitaNgDevtools.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConnectionService,
    BaseProvider,
    AlertService,
    GeolocationService,
    Geolocation,
    AirportFinderProvider,
    AirportsFinderService,
    StorageService,
    Storage,
    AirportsScheduleService,
    AirportScheduleProvider,
    TokenInterceptor,
    FlightStore,
    FlightQuery,
    FlightReducerService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
