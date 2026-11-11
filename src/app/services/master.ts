import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Master {

  http = inject(HttpClient);

  onRegisterCustomer(obj:any) {
    return this.http.post('https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer', obj);
  }
}
