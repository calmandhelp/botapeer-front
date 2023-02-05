import { ACCESS_TOKEN, API_BASE_URL } from "constants/apiConstants";
import { request } from "./apiBaseUtils";

export function login(loginRequest: LoginRequest): Promise<LoginResponse> {
  return request({
      url: API_BASE_URL + "auth/signin",
      method: 'POST',
      body: JSON.stringify(loginRequest)
  });
}

export type AuthInfo = {
  isLogin: boolean,
  userId: number,
  accessToken: string,
};


export type LoginRequest = {
  usernameOrEmail: string,
  password: string
}

export type LoginResponse = {
  accessToken: string,
  tokenType: string
}
