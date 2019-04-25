import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Trip } from '../shared/model/trip.model';

export class Trippay extends FormGroup {
  constructor() {
    super({
      trip: new FormControl('', [Validators.required])
    });
  }

  public getModel2(): Trip {
    return this.controls.trip.value;
  }
}
