export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface EditUserRequest extends Partial<CreateUserRequest> {}

export interface UserItem {
  username: string;
  created: Date;
}

export interface UserResponse extends UserItem {
  id: string;
}

export type UserDeleteResponse = '';