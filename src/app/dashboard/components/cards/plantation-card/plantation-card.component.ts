import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Plantation } from '../../../interfaces/Plantation/Plantation.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plantation-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    RouterModule,
  ],
  providers:[
    ConfirmationService,
  ],
  templateUrl: './plantation-card.component.html',
  styleUrl: './plantation-card.component.scss'
})
export class PlantationCardComponent {

  confirmService = inject(ConfirmationService);

  @Input() plantation?:Plantation;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<void>();

  setConfirmation(event: Event) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: '¿Seguro que quieres borrar la plantación?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDelete.emit(this.plantation?.id);
      },
    });
  }

  setEditPlantation() {
    this.onEdit.emit();
  }
}
