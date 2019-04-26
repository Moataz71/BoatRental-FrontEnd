import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../shared/model/reservation.model';
import { Trip } from '../shared/model/trip.model';
import { ReservationService } from '../shared/service/reservation.service';
import { TripService } from '../shared/service/trip.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public allReservations$: Observable<Reservation[]>;
  public allTrips$: Observable<Trip[]>;
  public allTrips: Trip[];
  public allReservations: Reservation[];

  public getAll() {
    this.allReservations$ = this.reservationService.getAllReservations();
    this.allTrips$ = this.tripService.getAllTrips();

    this.allReservations$.subscribe(allR => {
      const nowDate = new Date().toISOString().slice(0, 10);
      this.allReservations = allR;
    });
    this.allTrips$.subscribe(allT => {
      const nowDate = new Date().toISOString().slice(0, 10);
      this.allTrips = allT;
    });
  }

  constructor(
    private readonly reservationService: ReservationService,
    private readonly tripService: TripService
  ) {}

  ngOnInit() {
    this.getAll();
  }
}
