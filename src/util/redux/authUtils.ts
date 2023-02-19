import { User } from "botapeer-openapi/typescript-axios";
import { ACCESS_TOKEN, API_BASE_URL } from "constants/apiConstants";
import { request } from "./apiBaseUtils";

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

export type SignUpRequest = {
  name: string,
  email: string,
  password: string
}

export type SignUpResponse = User