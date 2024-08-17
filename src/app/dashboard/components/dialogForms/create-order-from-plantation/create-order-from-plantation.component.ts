import { Component, Inject, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { CropData } from '../../../interfaces/CropData/CropData.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { maxKilosOrder } from '../../../validators/maxKilosOrder.validator';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-order-from-plantation',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabelModule,
    InputNumberModule,
    DialogModule,
    NgOptimizedImage,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
  ],
  templateUrl: './create-order-from-plantation.component.html',
  styleUrl: './create-order-from-plantation.component.scss'
})
export class CreateOrderFromPlantationComponent implements OnInit  {

  fb = inject(FormBuilder);
  ref = inject(DynamicDialogRef);

  cropDataSelected:CropData[] = [];

  formKilos = this.fb.group({
    costumer: ['', Validators.required],
    orderDate: [''],
    deliveryDate: [''],
    paid:[false],
    kilos: this.fb.array([])
  });

  constructor(@Inject(DynamicDialogConfig) private config: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.cropDataSelected = this.config.data.selectedCrops;
    this.initializeFormArray();
  }

  initializeFormArray() {
    this.cropDataSelected.forEach(cropData => {
      this.kilos.push(this.fb.group({
        kilo: [null, [Validators.required, Validators.min(0), maxKilosOrder(cropData.kilos)]]
      }));
    });
  }

  get kilos() {
    return this.formKilos.controls['kilos'] as FormArray;
  }

  completeOrder() {

    if(this.formKilos.valid) {
      const result = this.formKilos.value.kilos!.map((control: any, index: number) => ({
        cropDataId: this.cropDataSelected[index].id,
        kilos: control.kilo
      }));

      this.ref.close(result);
    } else {
      this.formKilos.markAllAsTouched();
    }
  }

}
