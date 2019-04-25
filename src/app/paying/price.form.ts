import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

export class Priceform extends FormGroup {
  constructor() {
    super({
      price: new FormControl('', [Validators.required])
    });
  }

  public getModel1(): number {
    return this.controls.price.value;
  }
}
