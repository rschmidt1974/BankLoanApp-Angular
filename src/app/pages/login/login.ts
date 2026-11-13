import { Component, inject } from '@angular/core';
import { UserLoginModel } from '../../models/User.Model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { IApiResponseModel } from '../../models/API.Response.Model';
import { Auth } from '../../services/auth';

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
  auth = inject(Auth);

  onLoginUser() {
    this.masterService.onLogin(this.loginObj).subscribe({
      next: (res: IApiResponseModel) => {
        if(res.result) {
          alert("User Found, Logging in");
          this.auth.setLoggedInUser(res.data, this.loginObj.userName);
        } else {
          alert(res.message);
        }
      }
    });
  }
}
