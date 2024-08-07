import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PlantationRequest } from '../../../interfaces/Plantation/PlantationRequest.interface';
import { Plantation } from '../../../interfaces/Plantation/Plantation.interface';



@Component({
  selector: 'app-plantation-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './plantation-form.component.html',
  styleUrl: './plantation-form.component.scss'
})
export class PlantationFormComponent implements OnChanges {

  fb = inject(FormBuilder);

  @Output() sendCreateData = new EventEmitter<PlantationRequest>();
  @Output() sendEditData = new EventEmitter<Plantation>();
  @Input() plantationToEdit?:Plantation;

  formPlantation = this.fb.group({
    plantationName: ['', [Validators.required]],
    location: ['', [Validators.required]],
    description: ['']
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plantationToEdit'] && this.plantationToEdit) {
      this.formPlantation.patchValue({
        plantationName: this.plantationToEdit.name,
        location: this.plantationToEdit.location,
        description: this.plantationToEdit.description
      });
    }
  }

  completePlantation() {
    if(this.formPlantation.valid) {
      if(!this.plantationToEdit){
        const newPlantation:PlantationRequest = {
          name: this.formPlantation.get('plantationName')!.value!,
          location: this.formPlantation.get('location')!.value!,
          description: this.formPlantation.get('description')!.value!
        }

        this.sendCreateData.emit(newPlantation);
      } else {
        this.plantationToEdit.name = this.formPlantation.get('plantationName')!.value!;
        this.plantationToEdit.location = this.formPlantation.get('location')!.value!;
        this.plantationToEdit.description = this.formPlantation.get('description')!.value!;

        this.sendEditData.emit(this.plantationToEdit);
        this.plantationToEdit = undefined;
      }

      this.resetForm();
    }
  }

  resetForm() {
    this.formPlantation.reset();
  }
}
