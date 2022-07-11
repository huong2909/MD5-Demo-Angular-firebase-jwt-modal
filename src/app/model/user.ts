import {Role} from './role';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  roles: [Role];
  enabled: string;

  constructor(id: number, name: string, username: string, email: string, password: string, avatar: string, roles: [Role], enabled: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.roles = roles;
    this.enabled = enabled;
  }

}
