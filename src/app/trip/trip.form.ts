import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TripForm extends FormGroup {
  constructor() {
    super({
      numberOfPersons: new FormControl('', [Validators.required]),
      idboat: new FormControl('', [Validators.required])
    });
  }

  public getModel1(): string {
    return this.controls.numberOfPersons.value;
  }
  public getModel2(): string {
    return this.controls.idboat.value;
  }
}
