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
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { CustomerReduced } from '../../../interfaces/Customer/Customer.interface';
import { CustomersService } from '../../../services/Customers/customers.service';
import { CreateOrder, CropDataOrder } from '../../../interfaces/Orders/CreateOrder.interface';

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
    AutoCompleteModule,
  ],
  templateUrl: './create-order-from-plantation.component.html',
  styleUrl: './create-order-from-plantation.component.scss'
})
export class CreateOrderFromPlantationComponent implements OnInit  {

  fb = inject(FormBuilder);
  ref = inject(DynamicDialogRef);
  customerService = inject(CustomersService);

  cropDataSelected:CropData[] = [];
  customerSelected?: CustomerReduced;
  suggestions:CustomerReduced[] = [];

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
      const crops: CropDataOrder[] = this.formKilos.value.kilos!.map((control: any, index: number) => ({
        cropDataId: this.cropDataSelected[index].id,
        kilos: control.kilo
      }));

      const order: CreateOrder = {
        customerId: this.customerSelected!.id,
        delivered: false,
        orderDate: new Date(this.formKilos.get('orderDate')!.value ?? '').toISOString(),
        deliveryDate: new Date(this.formKilos.get('deliveryDate')!.value ?? '').toISOString(),
        paid: this.formKilos.get('paid')!.value!,
        products: crops
      };

      this.ref.close(order);
    } else {
      this.formKilos.markAllAsTouched();
    }
  }

  selectCustomer(event: AutoCompleteSelectEvent) {
    this.customerSelected = event.value;
  }

  searchCustomer(event: AutoCompleteCompleteEvent) {
    this.customerService.getCustomerReducedByName(event.query).pipe(
      //TODO: Implementar catcherror
    ).subscribe(resp => {
      this.suggestions = resp.content;
    });
  }
}
