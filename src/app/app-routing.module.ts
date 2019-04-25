import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TripComponent } from './trip/trip.component';
import { PayingComponent } from './paying/paying.component';
import { BoatComponent } from './boat/boat.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'creat-a-reservation',
    component: ReservationComponent
  },
  {
    path: 'start-a-trip',
    component: TripComponent
  },
  {
    path: 'paying',
    component: PayingComponent
  },
  {
    path: 'boat',
    component: BoatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
