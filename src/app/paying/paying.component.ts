import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../shared/model/reservation.model';
import { Trip } from '../shared/model/trip.model';
import { ReservationService } from '../shared/service/reservation.service';
import { TripService } from '../shared/service/trip.service';
import { PriceService } from '../shared/service/price.service';
import { Price } from '../shared/model/price.model';
import { Reservationpay } from './reservationpay.form';
import { Priceform } from './price.form';
import { Trippay } from './trippay.form';

@Component({
  selector: 'app-paying',
  templateUrl: './paying.component.html',
  styleUrls: ['./paying.component.css']
})
export class PayingComponent implements OnInit {
  public form: Reservationpay = new Reservationpay();
  public form1: Priceform = new Priceform();
  public form2: Trippay = new Trippay();

  public allReservations$: Observable<Reservation[]>;
  public allTrips$: Observable<Trip[]>;
  public allPrices$: Observable<Price[]>;
  public allTrips: Trip[];
  public allReservations: Reservation[];
  public allPrices: Price[];
  public lastPrice: Price;
  public pay: number;
  public payTrip: number;

  public onFormSubmit2() {
    const trip1: Trip = this.form2.getModel2();
    const timeNow: string = new Date().toLocaleTimeString().slice(0, 5);

    this.tripService.endTrip(trip1).subscribe(() => {
      const p1: number = this.lastPrice.pricePerHour;
      const h1: number = parseInt(trip1.startTime.slice(11, 13));
      const m1: number = parseInt(trip1.startTime.slice(14, 16));
      const h2: number = parseInt(timeNow.slice(0, 2));
      const m2: number = parseInt(timeNow.slice(3, 5));
      const tot1: number = m1 / 60 + h1;
      const tot2: number = m2 / 60 + h2;
      this.payTrip = Math.round((tot2 - tot1) * p1 * 100) / 100;
      console.log(this.payTrip);
    });
  }

  public onFormSubmit1() {
    const newPrice: number = this.form1.getModel1();
    const price1: Price = {
      pricePerHour: newPrice
    };
    this.priceService.addPrice(price1).subscribe(() => {
      alert(`Price is changed
      `);
      window.location.reload();
    });
  }

  public onFormSubmit() {
    const r1: Reservation = this.form.getModel();
    const p1: number = this.lastPrice.pricePerHour;
    const h1: number = parseInt(r1.startTime.slice(11, 13));
    const m1: number = parseInt(r1.startTime.slice(14, 16));
    const h2: number = parseInt(r1.endTime.slice(11, 13));
    const m2: number = parseInt(r1.endTime.slice(14, 16));
    const tot1: number = m1 / 60 + h1;
    const tot2: number = m2 / 60 + h2;
    this.pay = Math.round((tot2 - tot1) * p1 * 100) / 100;
    console.log(this.pay);
  }

  public getAll() {
    this.allReservations$ = this.reservationService.getAllReservations();
    this.allTrips$ = this.tripService.getAllTrips();
    this.allPrices$ = this.priceService.getAllPrices();
    this.allReservations$.subscribe(allR => {
      const nowDate = new Date().toISOString().slice(0, 10);
      // const d3Now = new Date().toLocaleTimeString().slice(0, 5);
      // const dateTimeNow: string = nowDate + 'T' + d3Now;
      this.allReservations = [];
      console.log(nowDate);
      for (let r1 of allR) {
        const d1start = r1.startTime.slice(0, 10);
        if (d1start >= nowDate) {
          this.allReservations.push(r1);
        }
      }
    });
    this.allTrips$.subscribe(allT => {
      const nowDate = new Date().toISOString().slice(0, 10);
      this.allTrips = [];
      for (let t1 of allT) {
        const d1start = t1.startTime.slice(0, 10);
        if (d1start >= nowDate && t1.active == true) {
          this.allTrips.push(t1);
        }
      }
    });
    this.allPrices$.subscribe(allP => {
      this.allPrices = allP;
      this.lastPrice = this.allPrices[this.allPrices.length - 1];
    });
  }

  constructor(
    private readonly reservationService: ReservationService,
    private readonly tripService: TripService,
    private readonly priceService: PriceService
  ) {}

  ngOnInit() {
    this.getAll();
  }
}
