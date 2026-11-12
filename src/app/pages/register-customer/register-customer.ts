import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-register-customer',
  styleUrl: './register-customer.css',
  templateUrl: './register-customer.html',
})
export class RegisterCustomer {

  newUserObj: any = {
    userId: 0,
    userName: '',
    email: '',
    fullName: '',
    password: '',
  };

  masterService = inject(Master);
  router = inject(Router);

  onSaveCustomer() {
    debugger;
    this.masterService.onRegisterCustomer(this.newUserObj).subscribe({
      next: (res: any) => {
        debugger;
        if(res.result) {
          alert("Customer Registration Success, Use Login Page to Login Now")
          this.router.navigate(['/login'])
        }else {
          alert(res.message)
        }
      },
      error: (err: any) => {
        debugger;
        alert("API Error")
      }
    });
  }
}
