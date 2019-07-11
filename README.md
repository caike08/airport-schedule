# Flight Schedule App

This app uses Airfrance KLM Flight Status API to fetch flight from today until tomorrow
Developed with Ionic 4 & Angular 7

<img src="https://raw.githubusercontent.com/caike08/airport-schedule/master/screenshots/pixelXL.png" width="400">

## Features
* Ionic 4
* Angular 7
* Akita Management State (basics, so far)
* Air France KLM Open Data API

### TO DO
* Transfer all services to AKITA & handle state from there;
* Display more data on flight details page;
* Add aircraft model picture based on each flight details
* Fix details page when there are more than two flight connections
* Implement Unity Testing & Functional tests;
* Fix test errors, create mocks to simulate services & providers when they aren't available;
* Fix end date param, which is calculated as [now + 1 day] formula doesn’t satify the until tomorrow;
