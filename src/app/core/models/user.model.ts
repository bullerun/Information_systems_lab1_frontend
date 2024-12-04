export interface User {
  id: number;
  token: string;
  username: string;
  role: Role;
}
export enum Role{
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}
