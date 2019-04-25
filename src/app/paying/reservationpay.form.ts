import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Reservation } from '../shared/model/reservation.model';

export class Reservationpay extends FormGroup {
  constructor() {
    super({
      reservation: new FormControl('', [Validators.required])
    });
  }

  public getModel(): Reservation {
    return this.controls.reservation.value;
  }
}
