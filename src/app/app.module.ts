import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatComponent } from './boat/boat.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TripComponent } from './trip/trip.component';
import { MainComponent } from './main/main.component';
import { PayingComponent } from './paying/paying.component';

@NgModule({
  declarations: [AppComponent, BoatComponent, ReservationComponent, TripComponent, MainComponent, PayingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
