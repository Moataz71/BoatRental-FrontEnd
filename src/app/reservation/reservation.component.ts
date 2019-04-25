import { Component, OnInit } from '@angular/core';
import { ReservationForm } from './reservation.form';
import { Reservation } from '../shared/model/reservation.model';
import { ReservationService } from '../shared/service/reservation.service';
import { Observable } from 'rxjs';
import { Boat } from '../shared/model/boat.model';
import { BoatService } from '../shared/service/boat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Guest } from '../shared/model/guest.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  // date  picker validation
  public form: ReservationForm = new ReservationForm();
  public displayDate = new Date().toISOString().slice(0, 16);
  // public displayDate2 = new Date();
  // public d = this.displayDate2.getHours() + 1;
  // public c1 = ('0' + this.d).slice(-2);
  // end date picker validation
  public errorMessage: string;

  public title = ' Make a Reservation';
  public reservations: Reservation[];
  public allReservations$: Observable<Reservation[]>;
  public availableBoats$: Observable<Boat[]>;
  public boats: Boat[];
  private onError = (error: HttpErrorResponse) =>
    (this.errorMessage = 'Something went wrong');

  public rr() {
    const guest: Guest = this.form.getModel4();
    const timesendpara: string = this.form.getModel1();
    const timeendpara: string = this.form.getModel2();
    const numberofpersons: string = this.form.getModel3();
    const boat: Boat = this.boats[
      Math.floor(Math.random() * this.boats.length)
    ];
    const reservation1: Reservation = {
      startTime: timesendpara,
      endTime: timeendpara,
      numberOfPersons: numberofpersons,
      guest: guest,
      boat: boat
    };
    console.log(reservation1);
    this.reservationService.addReservation(reservation1).subscribe(() => {
      alert(`Reservation is done
      `);
      window.location.reload();
    }, this.onError);
  }

  public onFormSubmit() {
    // time picker validation
    // console.log(this.displayDate);
    const endsent: string = this.form
      .getModel2()
      .slice(11, 16)
      .replace(':', '');
    let endtimesent = Number(endsent);
    const timesent: string = this.form
      .getModel1()
      .slice(11, 16)
      .replace(':', '');
    const dateSsent: string = this.form.getModel1().slice(0, 10);
    const dateEsent: string = this.form.getModel2().slice(0, 10);
    const nowDate = new Date().toISOString().slice(0, 10);
    const d1start = new Date(dateSsent).getDate();
    const d2End = new Date(dateEsent).getDate();
    const d3Now = new Date(nowDate).getDate();
    const numberofpersons1: string = this.form.getModel3();

    let starttimesent = Number(timesent);
    let timeNow = new Date()
      .toLocaleTimeString()
      .slice(0, 5)
      .replace(':', '');
    let starttimenow: Number = Number(timeNow);

    if (d1start === d3Now && starttimesent < starttimenow) {
      alert(`plesae enter valid start time or end time'
          `);
    } else if (d1start === d2End && endtimesent < starttimesent) {
      alert(`
      Hi ${'plesae enter valid start time or end time'}
          `);
    } else if (numberofpersons1 == '' || dateSsent == '' || dateEsent == '') {
      alert(`plesae full in the fields correctly
          `);
    } else if (d2End < d1start) {
      alert(`plesae enter valid start time or end time`);
    } else if (d2End != d1start) {
      alert(`Sorry you can NOT reserve a boat for days`);
    }
    // end time picker validation
    else {
      const timesendpara: string = this.form.getModel1();

      const timeendpara: string = this.form.getModel2();

      const numberofpersons: string = this.form.getModel3();

      this.availableBoats$ = this.reservationService.getAvailable(
        timesendpara,
        timeendpara,
        numberofpersons
      );

      this.availableBoats$.subscribe(boats => {
        this.boats = boats;
        console.log(this.boats);
      }, this.onError);

      console.log(timesendpara);
      console.log(timeendpara);
    }
  }

  constructor(
    private readonly reservationService: ReservationService,
    private readonly boatService: BoatService
  ) {}

  ngOnInit() {
    // }
    // public getReservations() {
    //   this.allReservations$ = this.reservationService.getAllReservations();
  }
}
