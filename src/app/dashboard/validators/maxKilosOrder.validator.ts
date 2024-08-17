import { AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

export function maxKilosOrder(availableKilos: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const kiloValue = control.value;
    if (kiloValue > availableKilos) {
      return { exceededLimit: true };
    }
    return null;
  };
}
