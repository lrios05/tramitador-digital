import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TokenService } from '../../../services/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter(); 

  userAuthenticated: any = 'Iniciar sesión';

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.userAuthenticated = this.tokenService.getUserFullName();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  handleLogout() {
    this.tokenService.logOut();
    this.userAuthenticated = 'Iniciar sesión';
  }

}
