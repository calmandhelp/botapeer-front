import { rootPage } from "constants/pageConstants";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useAppSelector } from 'redux/hook';
import { logout, selectAuth, Token } from "redux/slice/authSlice";

type Props = {
  children?: ReactNode
}

const Auth = ({ children }: Props) => {

    const auth = useAppSelector(selectAuth);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
      if (!auth.isLogin) {
        router.replace(rootPage.path);
      }
    }, [router, auth]);

      const token = localStorage.getItem("ACCESS_TOKEN");

      if(token) {
        const decodedJwt: Token = jwtDecode(token);
        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch(logout());
          router.replace(rootPage.path + "?expired=true");
        }
      }

    return (
    <>{auth.isLogin ? children : <></>}</>
    );
}

export default Auth;