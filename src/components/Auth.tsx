import { ACCESS_TOKEN } from "constants/apiConstants";
import { rootPage } from "constants/pageConstants";
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

const Auth = ({ children }: Props) => {

    const auth = useAppSelector(selectAuth);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN) ?? "";
      if(accessToken) {
        const decodedJwt: Token = jwtDecode(accessToken);
        const userId = decodedJwt.sub;
    
        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch(logout());
          router.replace(rootPage.path + "?expired=true")
        }  else if(decodedJwt.exp * 1000 > Date.now()) {
          dispatch(persitLogin({accessToken, userId: userId, isLogin: true}))
          dispatch(fetchAuthUserById(userId))
        }
      } else {
        dispatch(logout());
        CheckRedirect();
      }
    }, [router, auth]);

    const CheckRedirect = () => {
      if (!auth?.isLogin) {
        router.replace(rootPage.path);
      }
    }

    return (
    <>{auth?.isLogin ? children : <></>}</>
    );
}

export default Auth;