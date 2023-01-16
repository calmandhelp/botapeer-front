import { API_BASE_URL, ACCESS_TOKEN } from 'constants/apiConstants';
import jwtDecode from 'jwt-decode';
import { Token } from 'redux/slice/authSlice';
import { multiPartRequest, request } from 'util/apiUtils';

export function fetchUserByIdBase(userId: number): Promise<UserResponse> {
  return request({
      url: API_BASE_URL + "/api/users/" + userId,
      method: 'GET',
  });
}

export function updateUserBase(formData: FormData): Promise<UserResponse> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN) ?? "";
  const token: Token = jwtDecode(accessToken)
  const id = token.sub;

  return multiPartRequest({
    url: API_BASE_URL + "/api/users/" + id,
    method: 'POST',
    body: formData
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