import { Component, OnInit } from '@angular/core';
import { TripForm } from './trip.form';
import { TripService } from '../shared/service/trip.service';
import { BoatService } from '../shared/service/boat.service';
import { Trip } from '../shared/model/trip.model';
import { Observable } from 'rxjs';
import { Boat } from '../shared/model/boat.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  public form: TripForm = new TripForm();

  public displayDate = new Date().toISOString().slice(0, 16);

  public errorMessage: string;
  public x1: Map<number, string>;
  public boatsId: string[];
  public boatStart: string[];
  public result: any = [];
  public boat1$: Observable<Boat>;
  public boat1: Boat;
  public boats: Boat[];
  public allBoats$: Observable<Boat[]>;

  public title = ' Make a Reservation';
  public trips: Trip[];
  public allTrips$: Observable<Trip[]>;
  public availableBoatsForTrip$: Observable<Map<number, string>>;
  public boatsForTrip: object;
  private onError = (error: HttpErrorResponse) =>
    (this.errorMessage = 'Something went wrong');

  private getBoatById(id: number) {
    this.boatService.getAllBoats().subscribe(boats => {
      for (const boat of boats) {
        if (boat.id === id) {
          this.boat1 = boat;
          console.log(this.boat1);
          const numberofpersons1: string = this.form.getModel1();
          const dd11: string = '2019-04-22T20:00';
          const nowDate = new Date().toISOString().slice(0, 10);
          const d3Now = new Date().toLocaleTimeString().slice(0, 5);
          const dateTimeNow: string = nowDate + 'T' + d3Now;

          const trip1: Trip = {
            startTime: dateTimeNow,
            numberOfPersons: numberofpersons1,
            boat: this.boat1,
            active: true
          };
          console.log(trip1);
          this.tripService.addTrip(trip1).subscribe(() => {
            alert(`Trip is start
            `);
            window.location.reload();
          }, this.onError);
        }
      }
    });
  }

  public ss() {
    const boatid: string = this.form.getModel2();
    const q: string = boatid.toString();
    const bn: number = parseInt(q);

    if (this.boatsId.includes(q)) {
      console.log(q);
      this.getBoatById(bn);
      // this.allBoats$ = this.boatService.getAllBoats();
      // this.allBoats$.subscribe(boats => {
      //   this.boats = boats;
      // });
      // this.boatService.params.subscribe((params: Params) => {
      //   let id = params['id'];
      //      this.boatService.getBoat(bn).subscribe(
      //          (b: Boat) => this.boat1 = b;
      //      );      });

      // this.boat1$ = this.boatService.getBoat(bn);
      // this.boat1$.subscribe( => {
      //   this.boat1 = b;
      // }, this.onError);
      // console.log(this.boat1);
      // this.boatService.getBoat(bn).subscribe((b: Boat) => {
      //   this.boat1 = b;
      // }, this.onError);
    } else {
      alert(`plesae enter valid id`);
    }
  }

  public rr() {
    const nowDate = new Date().toISOString().slice(8, 10);
    for (let i = 0; i < this.boatStart.length; i++) {
      let date1 = this.boatStart[i].slice(8, 10);
      let time1 = this.boatStart[i].slice(11, 16);
      if (date1 > nowDate) {
        this.boatStart[i] = 'the end of day';
      } else {
        this.boatStart[i] = time1;
      }
    }

    for (var i = 0; i < this.boatsId.length; i += 1) {
      var item = new Object();
      item['id'] = this.boatsId[i];
      item['start'] = this.boatStart[i];
      this.result.push(item);
      console.log(this.result);
    }
  }

  public onFormSubmit() {
    const nowDate = new Date().toISOString().slice(0, 10);
    const d3Now = new Date().toLocaleTimeString().slice(0, 5);
    const numberofpersons1: string = this.form.getModel1();
    const dateTimeNow: string = nowDate + 'T' + d3Now;
    // const dd11: string = '2019-04-22T20:00';
    // console.log(nowDate);
    console.log(dateTimeNow);

    this.availableBoatsForTrip$ = this.tripService.getAvailableBoatsForTrip(
      dateTimeNow,
      numberofpersons1
    );

    this.availableBoatsForTrip$.subscribe(boats => {
      this.boatsForTrip = boats;
      console.log(this.boatsForTrip);
      this.boatsId = Object.keys(this.boatsForTrip);
      this.boatStart = Object.values(this.boatsForTrip);
      console.log(this.boatsId);
      this.rr();
    }, this.onError);
  }
  constructor(
    private readonly tripService: TripService,
    private readonly boatService: BoatService,
    private routeParams: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeParams.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.getBoatById(id);
    });
  }
}
