import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PlantationRequest } from '../../../interfaces/Plantation/PlantationRequest.interface';



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
export class PlantationFormComponent {

  fb = inject(FormBuilder);

  @Output() sendFormData = new EventEmitter<PlantationRequest>();

  formPlantation = this.fb.group({
    plantationName: ['',[Validators.required]],
    location: ['',[Validators.required]],
    description: ['']
  });

  createPlantation() {
    if(this.formPlantation.valid) {
      const newPlantation:PlantationRequest = {
        name: this.formPlantation.get('plantationName')!.value!,
        location: this.formPlantation.get('location')!.value!,
        description: this.formPlantation.get('description')!.value!
      }

      this.formPlantation.reset();

      this.sendFormData.emit(newPlantation);
    }
  }
}
