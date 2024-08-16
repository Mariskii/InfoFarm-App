import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { CropData } from '../../../interfaces/CropData/CropData.interface';
import { NgOptimizedImage } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-order-from-plantation',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputNumberModule,
    DialogModule,
    NgOptimizedImage,
  ],
  templateUrl: './create-order-from-plantation.component.html',
  styleUrl: './create-order-from-plantation.component.scss'
})
export class CreateOrderFromPlantationComponent implements OnChanges {

  formBuilder = inject(FormBuilder);

  @Input() cropDataSelected:CropData[] = [];

  visible:boolean = false;

  selectedCropsForm?: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['cropDataSelected'] && this.cropDataSelected) {



    }

  }

  changeVisibility() {
    this.visible = !this.visible;
  }

  completeOrder() {
    this.cropDataSelected = [];
  }
}
