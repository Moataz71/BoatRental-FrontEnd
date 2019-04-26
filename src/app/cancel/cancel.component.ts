import { Component, OnInit } from '@angular/core';
import { ReservationCancel } from './cancel.form';
import { Observable } from 'rxjs';
import { Reservation } from '../shared/model/reservation.model';
import { ReservationService } from '../shared/service/reservation.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  public form: ReservationCancel = new ReservationCancel();
  public allReservations$: Observable<Reservation[]>;
  public allReservations: Reservation[];

  public getAll() {
    this.allReservations$ = this.reservationService.getAllReservations();

    this.allReservations$.subscribe(allR => {
      const nowDate = new Date().toISOString().slice(0, 10);
      this.allReservations = [];
      console.log(nowDate);
      for (let r1 of allR) {
        const d1start = r1.startTime.slice(0, 10);
        if (d1start >= nowDate) {
          this.allReservations.push(r1);
        }
      }
    });
  }
  public onFormSubmit() {
    const r1: Reservation = this.form.getModel();
    // this.reservationService.deleteReservation(r1).subscribe(() => {
    //   alert('Reservation is canceled');
    // });
  }

  constructor(private readonly reservationService: ReservationService) {}

  ngOnInit() {
    this.getAll();
  }
}
