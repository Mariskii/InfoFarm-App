import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PlantationCardComponent } from "../../components/plantation-card/plantation-card.component";
import { PlantationService } from '../../services/Plantation/plantation.service';
import { NgOptimizedImage } from '@angular/common';
import { SkelletonSquaresComponent } from '../../components/skelleton-squares/skelleton-squares.component';
import { CreationDialogComponent } from '../../components/creation-dialog/creation-dialog.component';
import { PlantationFormComponent } from '../../components/dialogForms/plantation-form/plantation-form.component';
import { PlantationRequest } from '../../interfaces/Plantation/PlantationRequest.interface';
import { Plantation } from '../../interfaces/Plantation/Plantation.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-plantations-page',
  standalone: true,
  imports: [
    ButtonModule,
    PlantationCardComponent,
    NgOptimizedImage,
    SkelletonSquaresComponent,
    CreationDialogComponent,
    PlantationFormComponent,
    ConfirmPopupModule,
    ToastModule
  ],
  providers:[
    ConfirmationService,
    MessageService,
  ],
  templateUrl: './plantations-page.component.html',
  styleUrl: './plantations-page.component.scss'
})
export class PlantationsPageComponent implements OnInit {

  plantationService = inject(PlantationService);
  messageService = inject(MessageService);
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

  deletePlantation(idPlantation: number, index: number) {
    this.plantationService.deletePlantation(idPlantation).pipe(
      catchError(err => {
        this.messageService.add({ severity: 'error', summary: 'failed', detail: 'No se ha podido borrado la granja', life: 2000 });
        //TODO: Acabar de implementar el catcherror
        return of();
      })
    ).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Se ha borrado la granja correctamente', life: 2000 });
      this.plantations?.splice(index,1);
    });
  }
}
