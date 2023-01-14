import { useRouter } from "next/router";
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/hook';
import { selectAuth } from "redux/slice/authSlice";

type Props = {
  children?: ReactNode
}

const Auth = ({ children }: Props) => {

    const auth = useAppSelector(selectAuth);;
    const router = useRouter();

    useEffect(() => {
      if (!auth.isLogin) {
        router.replace("/");
      }
    }, [router, auth]);

    return (
    <>{auth.isLogin ? children : <></>}</>
    );
}

export default Auth;