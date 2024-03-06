import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-sidebar',
  templateUrl: './new-sidebar.component.html',
  styleUrls: ['./new-sidebar.component.css']
})

export class NewSidebarComponent {


  isCollapsed = true;
  selectedIcon: string = 'dashboard';

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  highlightIcon(icon: string) {
    this.selectedIcon = icon;
    this.cdr.detectChanges();
  }

  isIconSelected(icon: string): boolean {
    return this.router.url.toLowerCase().includes(icon.toLowerCase());
  }

}
