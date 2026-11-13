import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLoginModel } from '../models/User.Model';
import { Observable } from 'rxjs';
import { IApiResponseModel } from '../models/API.Response.Model';

@Injectable({
  providedIn: 'root',
})
export class Master {

  http = inject(HttpClient);
  api_url: string = 'https://api.freeprojectapi.com/api/BankLoan/';

  onRegisterCustomer(obj:any) {
    return this.http.post(this.api_url + 'RegisterCustomer', obj);
  }

  onLogin(loginObj: UserLoginModel): Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(this.api_url + 'Login', loginObj);
  }
}
