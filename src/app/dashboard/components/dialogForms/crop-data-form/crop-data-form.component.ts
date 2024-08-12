import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Crop } from '../../../interfaces/Crop/Crop.interface';
import { CropService } from '../../../services/Crop/crop.service';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CropData } from '../../../interfaces/CropData/CropData.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCropDataRequest } from '../../../interfaces/CropData/CreateCropData.interface';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-crop-data-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    InputNumberModule
  ],
  templateUrl: './crop-data-form.component.html',
  styleUrl: './crop-data-form.component.scss'
})
export class CropDataFormComponent {

  cropService = inject(CropService);
  fb = inject(FormBuilder);

  @Output() sendCreation = new EventEmitter<CreateCropDataRequest>();

  cropSelected?: Crop;
  cropDataToEdit?: CropData;
  suggestions: Crop[] = [];

  formCropData = this.fb.group({
    kiloPrice: ['', [Validators.required]],
    kilos: ['', [Validators.required]],
    cost: ['', [Validators.required]],
    plantationDate: [''],
    collectionDate: ['']
  });

  search(event: AutoCompleteCompleteEvent) {
    this.cropService.getCropsByName(event.query).subscribe(res => {
      this.suggestions = res.content;
    });
  }

  selectCrop(event: any) {
    this.cropSelected = event.value;
  }

  completeCropData() {

    if(this.formCropData.valid && this.cropSelected) {
      if(this.cropDataToEdit) {
        //TODO: Implementar creación
      } else {

        const { cost, kiloPrice, kilos, plantationDate, collectionDate } = this.formCropData.value;

        const createCropData:CreateCropDataRequest = {
          cropId: this.cropSelected.id,
          cropData: {
            cost: Number(cost),
            kiloPrice: Number(kiloPrice),
            kilos: Number(kilos),
            planting_date: plantationDate ? new Date(plantationDate) : undefined,
            collection_date: collectionDate ? new Date(collectionDate) : undefined
          }
        }

        this.sendCreation.emit(createCropData);
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.formCropData.reset();
    this.cropDataToEdit = undefined;
  }
}
