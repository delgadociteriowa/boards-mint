export interface UserStateType {
  identifier: string;
  password: string;
  userName: string;
  email: string;
  firstname: string;
  lastname: string;
  editingField: 'firstname' | 'lastname' | null;
  loading: boolean;
  error: string;
}

export interface SignUpState {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface LoginState {
  identifier: string;
  password: string;
}

export interface SyncUser {
  userName: string;
  firstname: string;
  lastname: string;
  email: string;
}

export type UpdateUser = Partial<{
  firstname: string;
  lastname: string;
}>;
