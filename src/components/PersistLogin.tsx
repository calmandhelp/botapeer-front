import { ACCESS_TOKEN } from "constants/apiConstants";
import { rootPage } from "constants/pageConstants";
import { access } from "fs/promises";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { logout, persitLogin, selectAuth } from "redux/slice/authSlice";
import { fetchAuthUserById } from "redux/slice/authUserSlice";
import { Token } from "util/redux/apiBaseUtils";

type Props = {
  children?: ReactNode
}

const PersistLogin = ({ children }: Props) => {

  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN) ?? "";
    if(accessToken) {
      const decodedJwt: Token = jwtDecode(accessToken);
      const userId = decodedJwt.sub;
  
      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logout());
      }  else if(decodedJwt.exp * 1000 > Date.now()) {
        dispatch(persitLogin({accessToken, userId: userId, isLogin: true}))
        dispatch(fetchAuthUserById(userId));
      }
    } else {
      dispatch(logout());
    }
  }, [router, auth, dispatch]);

    return (
    <>{children}</>
    );
}

export default PersistLogin;