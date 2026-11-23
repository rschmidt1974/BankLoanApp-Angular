import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { IApiResponseModel } from '../../models/API.Response.Model';
import { Router } from '@angular/router';
import { UserModel } from '../../models/User.Model';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-application-form',
  styleUrl: './application-form.css',
  templateUrl: './application-form.html',
})
export class ApplicationForm {

  applicationForm!: FormGroup;
  masterSrv = inject(Master);
  router = inject(Router);
  loggedUserData!: UserModel;

  constructor() {
    this.initializeForm();
    const local = localStorage.getItem('bankloanuser');
    if(local) {
      this.loggedUserData = JSON.parse(local);
      this.applicationForm.patchValue({
        fullName: this.loggedUserData.fullName,
        email: this.loggedUserData.emailId,
        customerId: this.loggedUserData.userId
      });
    }
  }

  initializeForm() {
    this.applicationForm = new FormGroup({
      applicantID: new FormControl(0),
      fullName: new FormControl(''),
      applicationStatus: new FormControl(''),
      panCard: new FormControl(''),
      dateOfBirth: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
      annualIncome: new FormControl(0),
      employmentStatus: new FormControl(''),
      creditScore: new FormControl(0),
      assets: new FormControl(''),
      dateApplied: new FormControl(''),
      customerId: new FormControl(this.loggedUserData.userId),
      Loans: new FormArray([])
    });
    this.addNewLoanForm();

  }

  addNewLoanForm() {
    this.loanDetails.push(this.addNewLoan());
  }

  get loanDetails() {
    return this.applicationForm.get('Loans') as FormArray;
  }

  addNewLoan() {
    return new FormGroup({
      loanID: new FormControl(0),
      applicantID: new FormControl(0),
      bankName: new FormControl(""),
      loanAmount: new FormControl(""),
      emi: new FormControl("")
    });
  }

  onSaveApplication() {
    const formValue = this.applicationForm.value;
    this.masterSrv.saveLoanApplication(formValue).subscribe({
      next: (res: IApiResponseModel) => {
        if(res.result) {
          alert('Application saved successfully!');
          this.router.navigateByUrl('/application-list');
        } else {
          alert(res.message);
        }
      }
    });
  }
}
