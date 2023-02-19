import jwtDecode from 'jwt-decode';
import { store } from 'redux/store/store';
import { UserApi, ConfigurationParameters, Configuration} from 'botapeer-openapi/typescript-axios';
import { AxiosRequestConfig } from 'axios'

export interface Token {
  iat: number,
  exp: number,
  sub: number
}

export const request = (options: any) => {

  const headers = new Headers({'Content-Type': 'application/json'})
  
  const auth = store.getState().auth;
  headers.append('Authorization', 'Bearer ' + auth.accessToken)
  
  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
  .then(response => 
      response.json().then((json) => {
          if(!response.ok) {
              return Promise.reject(JSON.stringify(json));
          }
          return json;
      })
  );
};

export const multiPartRequest = (options: any) => {
  const httpHeaders = {}

  const headers = new Headers(httpHeaders)
  
  const auth = store.getState().auth;
  headers.append('Authorization', 'Bearer ' + auth.accessToken)
  
  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);
  
  return fetch(options.url, options)
  .then(response => 
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(JSON.stringify(json));
          }
          return json;
      })
  );
};

export const getIdByAccessToken = (accessToken :string): number => {
  const token: Token = jwtDecode(accessToken)
  const id = token.sub;
  return id;
}

export type Error = {
  code: string,
  message: string
}

export const setupAxiosConfig = () => {
    const auth = store.getState().auth;

    const token = 'Bearer ' + auth.accessToken;

    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': token
      }
    };

    return config
}