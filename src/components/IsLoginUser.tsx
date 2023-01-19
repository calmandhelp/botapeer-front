import {ReactNode} from "react";


type Props = {
  children: ReactNode
  isLoginUser: boolean
}

const IsLoginUser = ({children, isLoginUser}: Props) => {
  return(
      isLoginUser ? <>{children}</> : <></>
  )
}

export default IsLoginUser;