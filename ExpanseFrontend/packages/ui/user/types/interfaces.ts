export interface SessionInterface {
  id: number;
  expires: string;
  createdAt: string;
}

export interface RoleInterface {
  id: number;
  name: string;
}

export interface UserInterface {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role?: RoleInterface;
  session?: SessionInterface;
  lastLogIn: string; // timestamp
  createdAt: string; // timestamp
  updatedAt: string; // timestamp
}
