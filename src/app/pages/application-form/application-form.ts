import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-application-form',
  styleUrl: './application-form.css',
  templateUrl: './application-form.html',
})
export class ApplicationForm {

  applicationForm!: FormGroup;

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
      customerId: new FormControl(0),
      Loans: new FormArray([])
    });
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
}
