





import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-new-sidebar',
  templateUrl: './new-sidebar.component.html',
  styleUrls: ['./new-sidebar.component.css']
})

export class NewSidebarComponent {
  
  isCollapsed = true;
  selectedIcon: string = '';

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private cdr: ChangeDetectorRef) { }

  highlightIcon(icon: string) {
    this.selectedIcon = icon;
    this.cdr.detectChanges();
  }

  isIconSelected(icon: string): boolean {
    return this.selectedIcon === icon;
  }

}
