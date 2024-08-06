import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  isExpanded = false;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
