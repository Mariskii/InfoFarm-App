import { Component, EventEmitter, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    OverlayPanelModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Output() toggleSideBarClicked = new EventEmitter<void>();

  toggleSideBar() {
    this.toggleSideBarClicked.emit();
  }
}
