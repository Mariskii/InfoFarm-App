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
import { PlantationFormComponent } from '../../components/dialogForms/plantation-form/plantation-form.component';
import { CreateCropDataRequest } from '../../interfaces/CropData/CreateCropData.interface';
import { CropService } from '../../services/Crop/crop.service';


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

  @ViewChild(CreationDialogComponent) dialog!:CreationDialogComponent;
  @ViewChild(CropDataFormComponent) cropDataForm!:CropDataFormComponent;

  loading: boolean = false;

  plantation?: FullPlantation;
  totalCrops: number = 0;

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

  createCropData(cropData: CreateCropDataRequest) {

    this.dialog.changeVisibility();

    cropData = {...cropData, plantationId: this.plantation?.id}

    this.cropService.createCropData(cropData).subscribe(res => {
      if(this.plantation!.cropData.content.length < 10) {
        this.plantation?.cropData.content.push(res);
      }

      ToastUtils.showToast(this.messageService,'Datos del cultivo añadidos','success');

      this.totalCrops+1;
    });
  }

  //TODO: Implementar paginación
  onPageChange(event: any) {

  }
}
