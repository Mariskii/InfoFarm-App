import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SidebarModule } from 'primeng/sidebar';
import { MENU_ITEMS } from '../../config/MenuItems';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  menuItems = MENU_ITEMS;

  isExpanded = false;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
