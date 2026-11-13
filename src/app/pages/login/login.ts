import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../models/User.Model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { IApiResponseModel } from '../../models/API.Response.Model';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginObj: UserLoginModel = new UserLoginModel();
  masterService = inject(Master);
  router = inject(Router);


  onLoginUser() {
    this.masterService.onLogin(this.loginObj).subscribe({
      next: (res: IApiResponseModel) => {
        if(res.result) {
          localStorage.setItem('bankloanuser', JSON.stringify(res.data));
          this.masterService.loginSubject$.next();
          void this.router.navigate(['/home']);
        } else {
          alert(res.message);
        }
      }
    });
  }
}
