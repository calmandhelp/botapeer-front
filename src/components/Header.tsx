import { css } from "@emotion/react";
import React, {useEffect} from "react";
import LoginModal from "components/LoginModal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from "redux/hook";
import { logout, selectAuth } from "redux/slice/authSlice";
import Link from "next/link";

const HeaderCss = css`
  background: #fff;
`;

const ToolBarCss =  {
    "@media screen and (min-width:960px)": {
      width: "960px", 
      margin: "0 auto",
    },
}

const Header = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRegister = () => {};

  const handleModalClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <header css={HeaderCss}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="relative"
          style={{ backgroundColor: "#fff", color: "#333333" }}
        >
          <LoginModal isOpen={isOpen} onClose={handleModalClose} />
          <Toolbar css={ToolBarCss}>
            <Link href="/">ログマーク</Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="start"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {auth.isLogin ? 
              <Box>
              <MenuItem onClick={() => router.replace("/account")}>アカウント</MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>ログアウト</MenuItem>
              </Box>
              : 
              <Box>
              <MenuItem onClick={() => setIsOpen(true)}>ログイン</MenuItem>
              <MenuItem onClick={handleRegister}>会員登録</MenuItem>
              </Box>
              }
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
