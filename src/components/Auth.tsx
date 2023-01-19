import { rootPage } from "constants/pageConstants";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { logout, selectAuth, Token } from "redux/slice/authSlice";

type Props = {
  children?: ReactNode
}

const Auth = ({ children }: Props) => {

    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
      if (!auth.isLogin && router.pathname != rootPage.path) {
        console.log(router.pathname);
        router.push(rootPage.path);
      }
    }, [router, auth]);

      const token = localStorage.getItem("ACCESS_TOKEN");

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