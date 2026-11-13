export class UserLoginModel {
  userName: string;
  password: string;

  constructor() {
    this.userName = '';
    this.password = '';
  }
}

export interface UserModel{
  userId: number
  userName: string
  emailId: string
  fullName: string
  role: string
  createdDate: string
  password: string
  projectName: string
  refreshToken: string
  refreshTokenExpiryTime: any
}

export interface Root {
  applicantID: number
  fullName: string
  applicationStatus: string
  panCard: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  annualIncome: number
  employmentStatus: string
  creditScore: number
  assets: string
  dateApplied: string
  Loans: {
    loanID: number
    applicantID: number
    bankName: string
    loanAmount: number
    emi: number
  }
  customerId: number
}
