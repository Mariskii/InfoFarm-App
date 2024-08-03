import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    NgOptimizedImage
  ],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

}
