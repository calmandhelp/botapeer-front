import { ACCESS_TOKEN, API_BASE_URL } from "constants/apiConstants";
import { User } from "model/user";
import { request } from "./apiBaseUtils";

export function signInBase(loginRequest: LoginRequest): Promise<LoginResponse> {
  return request({
      url: API_BASE_URL + "auth/signin",
      method: 'POST',
      body: JSON.stringify(loginRequest)
  });
}

export function signUpBase(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
  return request({
      url: API_BASE_URL + "auth/signup",
      method: 'POST',
      body: JSON.stringify(signUpRequest)
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

export type SignUpRequest = {
  name: string,
  email: string,
  password: string
}

export type SignUpResponse = User 