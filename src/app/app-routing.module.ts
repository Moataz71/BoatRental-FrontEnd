import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TripComponent } from './trip/trip.component';
import { PayingComponent } from './paying/paying.component';
import { BoatComponent } from './boat/boat.component';
import { OverviewComponent } from './overview/overview.component';
import { CancelComponent } from './cancel/cancel.component';

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
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'cancel',
    component: CancelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
