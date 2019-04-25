import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../shared/model/reservation.model';
import { Guest } from '../shared/model/guest.model';

export class ReservationForm extends FormGroup {
  constructor() {
    super({
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      numberOfPersons: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      idtype: new FormControl('', [Validators.required]),
      idnumber: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required])
    });
  }

  /** Gets the model of this form */
  public getModel1(): string {
    return this.controls.startTime.value;
  }
  public getModel2(): string {
    return this.controls.endTime.value;
  }
  public getModel3(): string {
    return this.controls.numberOfPersons.value;
  }

  public getModel4(): Guest {
    return {
      name: this.controls.name.value,
      idType: this.controls.idtype.value,
      idNumber: this.controls.idnumber.value,
      phoneNumber: this.controls.phonenumber.value
    };
  }
}
