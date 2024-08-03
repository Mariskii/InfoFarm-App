export interface RegisterUser {
  username: string,
  email: string,
  password:string,
  roleRequest: Roles[]
}

export enum Roles {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE"
}
