import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Crop } from '../../../interfaces/Crop/Crop.interface';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-crop-card',
  standalone: true,
  imports: [
    CardModule,
    NgOptimizedImage,
    ButtonModule,
  ],
  templateUrl: './crop-card.component.html',
  styleUrl: './crop-card.component.scss'
})
export class CropCardComponent {
  @Input() crop!:Crop;

  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<void>();

  confirmService = inject(ConfirmationService);

  setConfirmation(event: Event) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: '¿Seguro que quieres borrar el cultivo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.onDelete.emit(this.plantation?.id);
      },
    });
  }

  setEditCrop() {
    this.onEdit.emit();
  }
}
