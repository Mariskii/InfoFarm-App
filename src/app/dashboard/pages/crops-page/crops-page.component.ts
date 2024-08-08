import { Component, inject, OnInit } from '@angular/core';
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

  loading: boolean = false;
  crops: Crop[] = [];

  //TODO: Implementar toast para cuando hay un error
  ngOnInit(): void {
    this.cropService.getAllCrops().pipe(
      catchError(err => {
          console.log('El error '+err);
          return of()
      })
    ).subscribe(res => this.crops = res.content);
  }
}
