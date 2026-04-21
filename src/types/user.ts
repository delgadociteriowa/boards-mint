export interface UserStateType {
  identifier: string;
  password: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  editingField: 'firstname' | 'lastname' | null;
  loading: boolean;
  error: string;
}

export interface SignUpState {
  email: string;
  username: string;
}

export interface LoginState {
  identifier: string;
  password: string;
}

export interface SyncUser {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type UpdateUser = Partial<{
  firstname: string;
  lastname: string;
}>;
