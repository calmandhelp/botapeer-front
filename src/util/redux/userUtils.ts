import { API_BASE_URL, ACCESS_TOKEN } from 'constants/apiConstants';
import { User } from 'model/user';
import { request } from 'util/redux/apiBaseUtils';

export function fetchUserByIdBase(userId: number): Promise<UserResponse> {
  return request({
      url: API_BASE_URL + "users/" + userId,
      method: 'GET',
  });
}

export function fetchUserByNameBase(username: string): Promise<UserResponse[]> {
  return request({
      url: API_BASE_URL + "users/?username=" + username,
      method: 'GET',
  });
}

export function fetchUserByPlantRecordIdBase(plantRecordId: number): Promise<UserResponse> {
  return request({
      url: API_BASE_URL + "users/plant_records/" + plantRecordId,
      method: 'GET',
  });
}

export type UserResponse = User

export type UserRequest = {
  id: number,
  name?: string,
  email?: string,
  status?: boolean,
  coverImage?: string,
  profileImage?: string,
  description?: string,
}