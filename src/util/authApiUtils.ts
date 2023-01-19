import { ACCESS_TOKEN, API_BASE_URL } from "constants/apiConstants";
import jwtDecode from "jwt-decode";
import { Token } from "redux/slice/authSlice";
import { multiPartRequest, request } from "./apiUtils";
import { UserResponse } from "./userApiUtils";

export function updateAuthUserBase(formData: FormData): Promise<UserResponse> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN) ?? "";
  const token: Token = jwtDecode(accessToken)
  const id = token.sub;

  return multiPartRequest({
    url: API_BASE_URL + "/api/users/" + id,
    method: 'POST',
    body: formData
  });
}

export function updateAuthUserPasswordBase(data: updateAuthUserPasswordRequest): Promise<UserResponse> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN) ?? "";
  const token: Token = jwtDecode(accessToken)
  const id = token.sub;

  return request({
    url: API_BASE_URL + "/api/users/" + id + "/password",
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export type updateAuthUserPasswordRequest = {
  currentPassword: string,
  newPassword: string
}

export type updateAuthUserPasswordResponse = UserResponse;