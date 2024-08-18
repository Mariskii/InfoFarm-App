import { AfterViewChecked, AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
import { ReducedCrop } from '../../../interfaces/CropData/ReducedCrop.interface';
import { DialogModule } from 'primeng/dialog';
import { UpdateCropData } from '../../../interfaces/CropData/UpdateCropData.interface';
import { ToggleButtonModule } from 'primeng/togglebutton';


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
    InputNumberModule,
    DialogModule,
    ToggleButtonModule,
  ],
  templateUrl: './crop-data-form.component.html',
  styleUrl: './crop-data-form.component.scss'
})
export class CropDataFormComponent implements OnChanges {

  cropService = inject(CropService);
  fb = inject(FormBuilder);

  @Input() cropDataToEdit?: CropData;
  @Input() title?: string;

  @Output() sendCreation = new EventEmitter<CreateCropDataRequest>();
  @Output() sendUpdate = new EventEmitter<UpdateCropData>();

  cropSelected?: ReducedCrop;
  suggestions: Crop[] = [];

  visible:boolean = false;

  formCropData = this.fb.group({
    crop: ['',Validators.required],
    kiloPrice: ['', [Validators.required]],
    kilos: ['', [Validators.required]],
    cost: ['', [Validators.required]],
    plantationDate: [new Date(), Validators.required],
    collectionDate: [new Date()],
    surface: ['', Validators.required],
    unitType: [false] //false = m², true = ha
  });

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['cropDataToEdit'] && this.cropDataToEdit) {
      this.formCropData.patchValue({
        crop: this.cropDataToEdit.crop.cropName,
        kiloPrice: this.cropDataToEdit.kilo_price.toString(),
        kilos: this.cropDataToEdit.kilos.toString(),
        cost: this.cropDataToEdit.cost.toString(),
        plantationDate: this.cropDataToEdit.planting_date ? new Date(this.cropDataToEdit.planting_date) : null,
        collectionDate: this.cropDataToEdit.planting_date ? new Date(this.cropDataToEdit.collection_date) : null,
        surface: this.cropDataToEdit.surface.toString(),
        unitType: this.cropDataToEdit.type_surface === 'HECTARE'
      });

      this.cropSelected = this.cropDataToEdit.crop;
    }

  }

    convertDateToDisplayFormat(dateString: string): string {
      if (!dateString) return '';
        const [year, month, day] = dateString.split('-').map(Number);
      return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    }

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

      const { cost, kiloPrice, kilos, plantationDate, collectionDate, surface, unitType } = this.formCropData.value;

      const cropDataForm = {
        cost: Number(cost),
        kilo_price: Number(kiloPrice),
        kilos: Number(kilos),
        planting_date: plantationDate ? new Date(plantationDate).toISOString() : undefined,
        collection_date: collectionDate ? new Date(collectionDate).toISOString() : undefined,
        surface: Number(surface),
        type_surface: unitType ? 'HECTARE' : 'SQUARE_METER'
      }


      if(this.cropDataToEdit) {

        const updateCropData: UpdateCropData = {
          cropDataId: this.cropDataToEdit.id,
          cropId: this.cropSelected.id,
          cropData: cropDataForm,
        }

        this.sendUpdate.emit(updateCropData);
      } else {

        const createCropData:CreateCropDataRequest = {
          cropId: this.cropSelected.id,
          cropData: cropDataForm
        }

        this.sendCreation.emit(createCropData);
      }

      this.resetForm();
    }
  }

  resetForm() {
    this.formCropData.reset();
    this.cropSelected = undefined;
  }

  changeVisibility() {
    this.visible = !this.visible;
  }
}
