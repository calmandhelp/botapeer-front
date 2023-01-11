import { API_BASE_URL, ACCESS_TOKEN } from 'constants/ApiConstants';

const request = (options: any) => {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  
  if(localStorage.getItem(ACCESS_TOKEN)) {
      headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

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

export function login(loginRequest: LoginRequest) {
  return request({
      url: API_BASE_URL + "/api/auth/signin",
      method: 'POST',
      body: JSON.stringify(loginRequest)
  });
}

export const getCurrentUser = () => {
  if(!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
  }

  return request({
      url: API_BASE_URL + "/user/me",
      method: 'GET'
  });
}

type LoginRequest = {
  usernameOrEmail: string,
  password: string
}
