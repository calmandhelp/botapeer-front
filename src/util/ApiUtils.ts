import { API_BASE_URL, ACCESS_TOKEN } from 'constants/apiConstants';

export const request = (options: any) => {

  const httpHeaders = {
    'Content-Type': 'application/json',
  }
  const headers = new Headers(httpHeaders)
  
  const token = localStorage.getItem(ACCESS_TOKEN);
  headers.append('Authorization', 'Bearer ' + token)
  
  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
  .then(response => 
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );
};

export function login(loginRequest: LoginRequest): Promise<LoginResponse> {
  return request({
      url: API_BASE_URL + "/api/auth/signin",
      method: 'POST',
      body: JSON.stringify(loginRequest)
  });
}

export type LoginRequest = {
  usernameOrEmail: string,
  password: string
}

export type LoginResponse = {
  accessToken: string,
  tokenType: string
}