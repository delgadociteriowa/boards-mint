export interface UserStateType {
  identifier: string;
  password: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  editingFirst: boolean;
  editingLast: boolean;
  loading: boolean;
  error: string;
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