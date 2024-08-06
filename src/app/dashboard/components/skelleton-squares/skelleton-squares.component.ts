import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skelleton-squares',
  standalone: true,
  imports: [
    SkeletonModule
  ],
  templateUrl: './skelleton-squares.component.html',
  styleUrl: './skelleton-squares.component.scss'
})
export class SkelletonSquaresComponent {

}
