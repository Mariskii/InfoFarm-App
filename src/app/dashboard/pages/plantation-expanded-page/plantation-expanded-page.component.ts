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
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);

  @ViewChild(CreationDialogComponent) dialog!:CreationDialogComponent;
  @ViewChild(PlantationFormComponent) plantationForm!:PlantationFormComponent;

  loading: boolean = false;

  plantation?: FullPlantation;

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
      this.loading = false;
    })
  }

  //TODO: Implementar paginación
  onPageChange(event: any) {

  }
}
