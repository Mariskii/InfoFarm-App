import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Plantation } from '../../interfaces/Plantation/Plantation.interface';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-plantation-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
  ],
  templateUrl: './plantation-card.component.html',
  styleUrl: './plantation-card.component.scss'
})
export class PlantationCardComponent {
  @Input() plantation?:Plantation;
}
