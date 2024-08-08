import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SkelletonSquaresComponent } from '../../components/skelleton-squares/skelleton-squares.component';
import { CreationDialogComponent } from '../../components/creation-dialog/creation-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Crop } from '../../interfaces/Crop/Crop.interface';
import { ButtonModule } from 'primeng/button';
import { NgOptimizedImage } from '@angular/common';
import { CropService } from '../../services/Crop/crop.service';
import { catchError, of } from 'rxjs';
import { PlantationFormComponent } from '../../components/dialogForms/plantation-form/plantation-form.component';
import { CropFormComponent } from "../../components/dialogForms/crop-form/crop-form.component";
import { CreateCrop } from '../../interfaces/Crop/CreateCrop.interface';
import { ToastUtils } from '../../utils/ToastUtil';
import { CropCardComponent } from '../../components/cards/crop-card/crop-card.component';

@Component({
  selector: 'app-crops-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonModule,
    SkelletonSquaresComponent,
    CreationDialogComponent,
    ConfirmPopupModule,
    ToastModule,
    PlantationFormComponent,
    CropFormComponent,
    CropCardComponent,
],
  providers:[
    ConfirmationService,
    MessageService,
  ],
  templateUrl: './crops-page.component.html',
  styleUrl: './crops-page.component.scss'
})
export class CropsPageComponent implements OnInit {

  cropService = inject(CropService);
  messageService = inject(MessageService);

  loading: boolean = false;
  crops: Crop[] = [];
  cropToEdit?: Crop;
  dialogTitle: string='Crear cultivo';

  @ViewChild(CreationDialogComponent) dialog!:CreationDialogComponent;
  @ViewChild(CropFormComponent) cropForm!:CropFormComponent;

  //TODO: Implementar toast para cuando hay un error
  ngOnInit(): void {
    this.cropService.getAllCrops().pipe(
      catchError(err => {
          console.log('El error '+err);
          return of()
      })
    ).subscribe(res => this.crops = res.content);
  }

  showDialog(cropPosition?: number) {

    if(cropPosition !== undefined){
      this.dialogTitle = 'Editar plantación';
      this.cropToEdit = this.crops![cropPosition]
    }
    else {
      this.dialogTitle = 'Crear cultivo'
      this.cropForm.resetForm();
    }

    this.dialog.changeVisibility();
  }

  createPlantation(crop: CreateCrop) {
    this.cropService.createCrop(crop).pipe(
      catchError(err => {
        ToastUtils.showToast(this.messageService,'No se ha podido crear el cultivo','error');
        return of()
      })
    ).subscribe(response => {
      ToastUtils.showToast(this.messageService,'No se ha podido crear el cultivo','success');
      this.crops.push(response);
    });
    this.dialog.changeVisibility();
  }
}
