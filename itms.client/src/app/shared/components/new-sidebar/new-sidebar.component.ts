import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-new-sidebar',
  templateUrl: './new-sidebar.component.html',
  styleUrls: ['./new-sidebar.component.css']
})

export class NewSidebarComponent {

  role: string = "";

  ngOnInit() {
    this.userStore.getRoleFromStore().subscribe(val => {
      let loggedInUserRole = this.loginService.getRoleFromToken();
      this.role = val || loggedInUserRole;
    })

  }

  isCollapsed = true;
  selectedIcon: string = 'dashboard';

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private cdr: ChangeDetectorRef, private router: Router, private loginService: LoginService, private userStore: UserStoreService) { }

  highlightIcon(icon: string) {
    this.selectedIcon = icon;
    this.cdr.detectChanges();
  }

  isIconSelected(icon: string): boolean {
    return this.router.url.toLowerCase().includes(icon.toLowerCase());
  }

}
