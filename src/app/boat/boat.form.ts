import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Boat } from '../shared/model/boat.model';

export class AddBoat extends FormGroup {
  constructor() {
    super({
      boatNumber: new FormControl('', [Validators.required]),
      numberOfSeat: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    });
  }

  public getModel(): Boat {
    return {
      boatNumber: this.controls.boatNumber.value,
      type: this.controls.type.value,
      numberOfSeat: this.controls.numberOfSeat.value,
      onTrip: false,
      maintance: false,
      id: 0
    };
  }
}
