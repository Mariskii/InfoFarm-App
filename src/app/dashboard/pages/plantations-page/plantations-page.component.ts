import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';

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
import { ToastUtils } from '../../utils/ToastUtil';
import { PlantationCardComponent } from '../../components/cards/plantation-card/plantation-card.component';

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

  dialogTitle: string = 'Crear plantación';

  plantationService = inject(PlantationService);
  messageService = inject(MessageService);
  plantations?: Plantation[];
  plantationToEdit?: Plantation

  @ViewChild(CreationDialogComponent) dialog!:CreationDialogComponent;
  @ViewChild(PlantationFormComponent) plantationForm!:PlantationFormComponent;

  loading:boolean = false;

  ngOnInit(): void {
    this.loading = true;

    //TODO: Implementar catchError
    this.plantationService.getAllPlantations().subscribe(res => {
      this.plantations = res.content;
      this.loading = false;
    });
  }

  createPlantation(plantationRequest: PlantationRequest) {
    this.plantationService.createPlantation(plantationRequest).subscribe(plantation => {
      this.plantations?.push(plantation);
    });
    this.dialog.changeVisibility();
  }

  showDialog(plantationPosition?: number) {

    if(plantationPosition !== undefined){
      this.dialogTitle = 'Editar plantación';
      this.plantationToEdit = this.plantations![plantationPosition]
    }
    else {
      this.dialogTitle = 'Crear plantación'
      this.plantationForm.resetForm();
    }

    this.dialog.changeVisibility();
  }

  deletePlantation(idPlantation: number, index: number) {
    this.plantationService.deletePlantation(idPlantation).pipe(
      catchError(err => {
        this.messageService.add({ severity: 'error', summary: 'failed', detail: 'No se ha podido borrar la granja', life: 2000 });
        //TODO: Acabar de implementar el catcherror
        return of();
      })
    ).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Se ha borrado la granja correctamente', life: 2000 });
      this.plantations?.splice(index,1);
    });
  }

  editPlantation(plantation: Plantation) {
    this.plantationService.updatePlantation(plantation).pipe(
      catchError(err => {
        ToastUtils.showToast(this.messageService,'No se ha podido editar la plantación','error');
        return of()
      })
    ).subscribe(res => {
      const index =this.plantations!.findIndex(plantation => plantation.id === res.id)
      this.plantations![index] = res;
      ToastUtils.showToast(this.messageService,'Se ha editado plantación','success');
    });

    this.dialog.changeVisibility();
  }
}
