import { css } from "@emotion/react";
import * as React from "react";
import LoginModal from "./LoginModal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Box from "@mui/material/Box";

const HeaderCss = css`
  background: #fff;
`;

// const accountIconWrapCss = css`
//   position: absolute;
//   top: 50%;
//   right: 10px;
//   transform: translate(0, -50%);
//   font-size: 30px;
//   cursor: pointer;
// `;

// const accountIconCss = css``;

const AppBarCss = css``;

const Header = ({}) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

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
        <AppBar position="static">
          <LoginModal isOpen={isOpen} onClose={handleModalClose} />
          <Toolbar>
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
              <MenuItem onClick={() => setIsOpen(true)}>ログイン</MenuItem>
              <MenuItem onClick={handleRegister}>会員登録</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
