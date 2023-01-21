import { ACCESS_TOKEN, API_BASE_URL } from "constants/apiConstants";
import { User } from "model/user";
import { useAppSelector } from "redux/hook";
import { selectAuth } from "redux/slice/authSlice";
import { store } from "redux/store/store";
import { getIdByAccessToken, multiPartRequest, request } from "./apiBaseUtils";
import { UserResponse } from "./userUtils";

export function fetchAuthUserByIdBase(userId: number): Promise<UserResponse> {
  return request({
      url: API_BASE_URL + "/api/users/" + userId,
      method: 'GET',
  });
}

export function updateAuthUserBase(formData: FormData): Promise<UserResponse> {
  const auth = store.getState().auth;
  const id = getIdByAccessToken(auth.accessToken);

  return multiPartRequest({
    url: API_BASE_URL + "/api/users/" + id,
    method: 'POST',
    body: formData
  });
}

export function updateAuthUserPasswordBase(data: updateAuthUserPasswordRequest): Promise<UserResponse> {
  const auth = store.getState().auth;
  const id = getIdByAccessToken(auth.accessToken);

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

export type updateAuthUserPasswordResponse = AuthUserResponse;

type AuthUserResponse = User