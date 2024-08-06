import { Component, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-creation-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrl: './creation-dialog.component.scss'
})
export class CreationDialogComponent {
  visible: boolean = false;

  @Input() title?: string;

    changeVisibility() {
        this.visible = !this.visible;
    }
}
