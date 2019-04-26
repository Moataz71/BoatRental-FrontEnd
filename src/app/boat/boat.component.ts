import { Component, OnInit } from '@angular/core';
import { Boat } from '../shared/model/boat.model';
import { Observable } from 'rxjs';
import { BoatService } from '../shared/service/boat.service';
import { AddBoat } from './boat.form';
import { ReservationService } from '../shared/service/reservation.service';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css']
})
export class BoatComponent implements OnInit {
  public form: AddBoat = new AddBoat();
  public title = 'Boats';
  public boats: Boat[];
  public boat1: Boat;

  public boat1$: Observable<Boat>;
  public allBoats$: Observable<Boat[]>;
  public errorMessage: string;

  public sunSet: any;

  public onFormSubmit() {
    const newBoat: Boat = this.form.getModel();
    if (newBoat.numberOfSeat == 0) {
      alert(
        'The number of seats can Not be zero, please change the number of seats'
      );
      return;
    }
    for (let b of this.boats) {
      if (b.boatNumber == newBoat.boatNumber) {
        alert(
          'The boat number is already exist, please change the boat number'
        );

        return;
      }
    }

    // console.log('M');
    this.boatService.addBoat(newBoat).subscribe(() => {
      alert(`Boat is added
      `);
      window.location.reload();
    });
  }

  constructor(
    private readonly boatService: BoatService,
    private readonly reservationSerivce: ReservationService
  ) {}

  ngOnInit() {
    this.getBoats();
  }
  public getBoats() {
    this.allBoats$ = this.boatService.getAllBoats();
    this.allBoats$.subscribe(boats => {
      this.boats = boats;
    });
  }
}
