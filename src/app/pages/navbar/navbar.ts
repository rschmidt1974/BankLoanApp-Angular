import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../models/User.Model';
import { Master } from '../../services/master';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  loggedUserData!: UserModel | undefined;
  router = inject(Router);
  masterService = inject(Master);


  constructor() {
    this.readLoggedUserData()
    this.masterService.loginSubject$.subscribe(() => {
      this.readLoggedUserData();
    });
  }

  readLoggedUserData() {
    const storedUser = localStorage.getItem('bankloanuser');
    if (storedUser != null) {
      this.loggedUserData = JSON.parse(storedUser) as UserModel
    }
  }

  logoff() {
    localStorage.removeItem('bankloanuser');
    this.loggedUserData = undefined;
    this.router.navigate(['/home']);
  }
}
