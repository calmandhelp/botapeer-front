import { css } from "@emotion/react";
import { Modal as MaterialModal } from "@mui/material";
import { useState } from "react";
import Input from "components/Input";
import CloseIcon from "@mui/icons-material/Close";
import Button from "components/Button";
import { GoogleLogin } from "react-google-login";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectAuth, signIn } from '../redux/slice/authSlice';
import { useRouter } from 'next/router';

const ModelContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModelCss = {
  width: "320px",
  position: "relative",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const ModalContentCss = css`
  width: 100%;
  padding-bottom: 16px;
  box-sizing: border-box;
`;

const CloseButtonCss = css`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const InputCss = css`
  padding-bottom: 10px;
`;

const LoginButtonCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TextCss = css`
  color: #575757;
  font-size: 13px;
`;

const GoogleCss = css`
  cursor: pointer;
  opacity: 0.8;
`;

const GoogleLinkCss = css`
  text-decoration: none;
`;

type Props = {
  onClose: () => void;
  isOpen: boolean;
  handleLogin: (usernameOrEmail: string, password: string) => void;
};

const LoginModal = (props: Props) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(selectAuth);

  const responseGoogle = () => {};

  const handleKeyDown = (e: any) => {
    if(e.key == "Enter") {
      props.handleLogin(usernameOrEmail, password)
    }
  }

  return (
    <div>
      <MaterialModal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        css={ModelContainer}
      >
        <Box sx={ModelCss}>
          <CloseIcon
            data-testid="CloseIcon"
            onClick={props.onClose}
            css={CloseButtonCss}
          />
          <h2 id="server-modal-title">ログイン</h2>
          <p css={TextCss}>
            Googleもしくはアカウント情報の入力でログインできます。
          </p>
          <a
            href="http://localhost:8081/oauth2/authorization/google?redirect_uri=http://localhost:3000"
            css={GoogleLinkCss}
          >
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              css={GoogleCss}
            />
          </a>
          <p id="server-modal-description" css={ModalContentCss}>
            ユーザーIDまたはEmail
            <br />
            <Input
              type="text"
              style={InputCss}
              name="usernameOrEmail"
              handleInput={(e) => setUsernameOrEmail(e.target.value)}
              text={usernameOrEmail}
              onKeyDown={(e) =>handleKeyDown(e)}
            />
            <br />
            パスワード
            <br />
            <Input
              type="password"
              name="password"
              handleInput={(e) => setPassword(e.target.value)}
              text={password}
              onKeyDown={(e) =>handleKeyDown(e)}
            />
          </p>
          <div css={LoginButtonCss}>
            <Button handleClick={() => props.handleLogin(usernameOrEmail, password)}>ログイン</Button>
          </div>
        </Box>
      </MaterialModal>
    </div>
  );
};

export default LoginModal;
