export interface IUser {
  Name?: string,
  Email?: string,
  Password?: string
}
export interface ResultSuccessRegister {
  accessToken: string,
  Success: boolean,
  Message: string
}
export interface IResultSuccessLogin {
  accessToken: string,
  Success: boolean,
  Message: string,
  email: string,
  userId: string
}
export interface ILogin {
  Email: string,
  Password: string
}
export interface IRegister {
  UserName: string,
  Email: string,
  Password: string,
  ConfirmPassword: string,
  FullName?: string
}

