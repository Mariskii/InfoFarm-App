import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    NgOptimizedImage,
    RouterModule,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

}
