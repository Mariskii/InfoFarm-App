import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PlantationService } from '../../services/Plantation/plantation.service';
import { ActivatedRoute } from '@angular/router';
import { FullPlantation } from '../../interfaces/Plantation/FullPlantation.interface';
import { catchError, of } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { ToastUtils } from '../../utils/ToastUtil';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { NgOptimizedImage } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CreationDialogComponent } from '../../components/creation-dialog/creation-dialog.component';
import { CropDataFormComponent } from '../../components/dialogForms/crop-data-form/crop-data-form.component';
import { CreateCropDataRequest } from '../../interfaces/CropData/CreateCropData.interface';
import { CropService } from '../../services/Crop/crop.service';
import { CropData } from '../../interfaces/CropData/CropData.interface';
import { UpdateCropData } from '../../interfaces/CropData/UpdateCropData.interface';


@Component({
  selector: 'app-plantation-expanded-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ToastModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    CreationDialogComponent,
    CropDataFormComponent
  ],
  providers:[
    //ConfirmationService,
    MessageService,
  ],
  templateUrl: './plantation-expanded-page.component.html',
  styleUrl: './plantation-expanded-page.component.scss'
})
export class PlantationExpandedPageComponent implements OnInit {

  plantationService = inject(PlantationService);
  cropService = inject(CropService);
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);

  @ViewChild(CropDataFormComponent) cropDataForm!:CropDataFormComponent;

  loading: boolean = false;

  plantation?: FullPlantation;
  cropDataToEdit?: CropData;
  totalCrops: number = 0;
  actualPage: number = 0;
  dialogTitle:string = '';

  ngOnInit(): void {
    this.fetchPlantationFromRouteId()
  }

  fetchPlantationFromRouteId() {
    this.activatedRoute.params.subscribe(({plantationId}) => {

      this.loading = true;

      this.getPlantationData(plantationId);
    });
  }

  getPlantationData(plantationId: number) {
    this.plantationService.getPlantationById(plantationId).pipe(
      catchError(err => {
        ToastUtils.showToast(this.messageService,'Ha ocurrido un error','error');
        return of();
      })
    ).subscribe(resp => {
      this.plantation = resp;
      this.totalCrops = this.plantation.cropData.totalElements
      this.loading = false;
    })
  }

  showDialog(cropDataIndex?: number) {

    this.cropDataToEdit = undefined;

    this.dialogTitle = cropDataIndex !== undefined ? 'Editar datos' : 'Añadir cultivo';

    if(cropDataIndex !== undefined){
      this.cropDataToEdit = this.plantation?.cropData.content![cropDataIndex];
    }
    else {
      this.cropDataForm.resetForm();
    }

    this.cropDataForm.changeVisibility();
  }

  createCropData(cropData: CreateCropDataRequest) {

    this.cropDataForm.changeVisibility();

    cropData = {...cropData, plantationId: this.plantation?.id}

    this.cropService.createCropData(cropData).subscribe(res => {
      if(this.plantation!.cropData.content.length < 10) {
        this.plantation?.cropData.content.push(res);
      }

      ToastUtils.showToast(this.messageService,'Datos del cultivo añadidos','success');

      this.totalCrops++;
    });
  }

  editCropData(cropData: UpdateCropData) {

    this.cropDataForm.changeVisibility();

    this.cropService.updateCropData(cropData).pipe(
      catchError(err => {
        ToastUtils.showToast(this.messageService,'No se han podido actualizar los datos','error');
        return of();
      })
    ).subscribe(res => {
      const index = this.plantation!.cropData.content.findIndex(cropData => res.id === cropData.id);
      this.plantation!.cropData.content[index] = res;

      ToastUtils.showToast(this.messageService,'Datos del cultivo editados correctamente','success');
    });
  }

  onPageChange(event: any) {
    if(this.actualPage != event.page) {
      this.cropService.getAllCropsByPlantationId(this.plantation!.id, event.page).subscribe(res => {
        this.plantation!.cropData = res;
        this.actualPage = event.page;
      });
    }
  }
}
