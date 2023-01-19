import { API_BASE_URL, ACCESS_TOKEN } from 'constants/apiConstants';
import { User } from 'model/user';
import { multiPartRequest, request } from 'util/apiUtils';

export function fetchUserByIdBase(userId: number): Promise<UserResponse> {
  return request({
      url: API_BASE_URL + "/api/users/" + userId,
      method: 'GET',
  });
}

export function fetchUserByNameBase(username: string): Promise<UserResponse[]> {
  return request({
      url: API_BASE_URL + "/api/users/?username=" + username,
      method: 'GET',
  });
}

export type UserResponse = User

export type UserRequest = {
  id: number,
  name?: string,
  email?: string,
  status?: boolean,
  // password?: string,
  coverImage?: string,
  profileImage?: string,
  description?: string,
}