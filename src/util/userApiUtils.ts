import { API_BASE_URL, ACCESS_TOKEN } from 'constants/apiConstants';
import { request } from 'util/apiUtils';

export function fetchUserByIdBase(userId: number): Promise<UserResponse> {
  return request({
      url: API_BASE_URL + "/api/users/" + userId,
      method: 'GET',
  });
}

export function updateUserBase(userRequest: UserRequest): Promise<UserResponse> {
  return request({
      url: API_BASE_URL + "/api/users/" + userRequest.id,
      method: 'POST',
      body: JSON.stringify(userRequest)
  });
}

export type UserResponse = {
  id: number,
  name: string,
  email: string,
  status: boolean,
  password: string,
  coverImage: string,
  profileImage: string,
  description: string,
}

export type UserRequest = {
  id: number,
  name?: string,
  email?: string,
  status?: boolean,
  password?: string,
  coverImage?: string,
  profileImage?: string,
  description?: string,
}