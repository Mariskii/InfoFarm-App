import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PlantationCardComponent } from "../../components/plantation-card/plantation-card.component";
import { PlantationService } from '../../services/Plantation/plantation.service';
import { NgOptimizedImage } from '@angular/common';
import { SkelletonSquaresComponent } from '../../components/skelleton-squares/skelleton-squares.component';
import { CreationDialogComponent } from '../../components/creation-dialog/creation-dialog.component';
import { PlantationFormComponent } from '../../components/dialogForms/plantation-form/plantation-form.component';
import { PlantationResponse } from '../../interfaces/Plantation/PlantationsResponse.interface';
import { PlantationRequest } from '../../interfaces/Plantation/PlantationRequest.interface';
import { Plantation } from '../../interfaces/Plantation/Plantation.interface';

@Component({
  selector: 'app-plantations-page',
  standalone: true,
  imports: [
    ButtonModule,
    PlantationCardComponent,
    NgOptimizedImage,
    SkelletonSquaresComponent,
    CreationDialogComponent,
    PlantationFormComponent
],
  templateUrl: './plantations-page.component.html',
  styleUrl: './plantations-page.component.scss'
})
export class PlantationsPageComponent implements OnInit {

  plantationService = inject(PlantationService);
  plantations?: Plantation[];

  @ViewChild(CreationDialogComponent) child!:CreationDialogComponent;

  loading:boolean = false;

  ngOnInit(): void {
    this.loading = true;

    this.plantationService.getAllPlantations().subscribe(res => {
      this.plantations = res.content;
      this.loading = false;
    });
  }

  createPlantation(plantationRequest: PlantationRequest) {
    this.plantationService.createPlantation(plantationRequest).subscribe(plantation => {
      this.plantations?.push(plantation);
    });
    this.changeDialogVisibility();
  }

  changeDialogVisibility() {
    this.child.changeVisibility();
  }

}
