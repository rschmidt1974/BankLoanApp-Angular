import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly auth = inject(Auth);
  private readonly router = inject(Router);

  logoff(): void {
    this.auth.logoff();
    void this.router.navigate(['/home']);
  }
}
