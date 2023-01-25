import { rootPage } from "constants/pageConstants";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { logout, selectAuth } from "redux/slice/authSlice";
import { Token } from "util/redux/apiBaseUtils";

type Props = {
  children?: ReactNode
}

const Auth = ({ children }: Props) => {

    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
      if (!auth.isLogin && router.pathname != rootPage.path) {
        router.push(rootPage.path);
      }
    }, [router, auth]);

      const token = auth.accessToken;

      if(token) {
        const decodedJwt: Token = jwtDecode(token);
        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch(logout());
          router.push(rootPage.path + "?expired=true")
        }
      }

    return (
    <>{auth.isLogin ? children : <></>}</>
    );
}

export default Auth;