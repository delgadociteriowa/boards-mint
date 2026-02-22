export interface UserStateType {
  identifier: string;
  password: string;
  loading: boolean;
  error: string;
}

export interface LoginState {
  identifier: string;
  password: string;
}