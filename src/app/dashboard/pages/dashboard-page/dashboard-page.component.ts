import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    SideBarComponent,
    RouterModule,
    NavBarComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

  @ViewChild(SideBarComponent) sidebar!: SideBarComponent

  toggleSideBar() {
    this.sidebar.toggleSidebar()
  }
}
