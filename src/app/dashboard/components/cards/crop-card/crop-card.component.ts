import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Crop } from '../../../interfaces/Crop/Crop.interface';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';

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
}
