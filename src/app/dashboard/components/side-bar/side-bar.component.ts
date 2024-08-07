import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { SidebarModule } from 'primeng/sidebar';
import { MENU_ITEMS } from '../../config/MenuItems';
import { RouterModule } from '@angular/router';
import { ClickOutsideSidebarDirective } from '../../directives/click-outside-sidebar.directive';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    ClickOutsideSidebarDirective,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  menuItems = MENU_ITEMS;

  isExpanded = true;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  closeSidebar() {
    if(this.isExpanded) {
      this.isExpanded = false;
    }
  }
}
