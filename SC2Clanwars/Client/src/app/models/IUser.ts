export interface IUser {
  fullName: string,
  email: string,
  portraitUrl: string,
  bannerUrl: string,
  userName: string,
  id: string,
  MainRace: string
}
export interface ResultSuccessRegister {
  accessToken: string,
  Success: boolean,
  Message: string,
  accessTokenExpires: string,
  userId: string
}
export interface IResultSuccessLogin {
  accessToken: string,
  Success: boolean,
  Message: string,
  email: string,
  userId: string,
  accessTokenExpires: string
}
export interface ILogin {
  Email: string,
  Password: string,
  RememberMe: boolean
}
export interface IRegister {
  UserName: string,
  Email: string,
  Password: string,
  ConfirmPassword: string,
  FullName?: string,
  RememberMe: boolean
}

