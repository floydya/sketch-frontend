import React from "react";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import classes from "./Navbar.module.less";
import { IStore } from "~/store";
import {
  IState as AuthenticationState,
  Dispatch,
} from "@floydya/authentication/store/types";
import UserDropdown from "./UserDropdown";
import classNames from "classnames";
import { thunkActions } from "@floydya/authentication";
import { destroyCookie } from "nookies";
import Notifications from "./Notifications";

const { Header } = Layout;

interface INavbar {
  authentication: AuthenticationState;
  logoutUser: () => void;
}

const Navbar: React.FC<INavbar> = ({ authentication, logoutUser }) => {
  return (
    <Header className={classNames("ant-menu", "ant-menu-dark", classes.header)}>
      <Link href="/">
        <a>
          <div className={classes.logo} />
        </a>
      </Link>
      <div className={classes.navbarSpace} />
      {authentication.user ? (
        <Menu
          mode="horizontal"
          className={classes.userDropdown}
          selectable={false}
        >
          <Menu.Item className={classes.userDropdown}>
            <Notifications />
          </Menu.Item>
          <Menu.Item className={classes.userDropdown}>
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <UserDropdown user={authentication.user} logout={logoutUser} />
            </div>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu
          mode="horizontal"
          selectable={false}
          selectedKeys={["register"]}
          className={classes.userDropdown}
        >
          <Menu.Item className={classes.userDropdown}>
            <Link href="/auth/login">
              <a className={classes.authButton}>Вход</a>
            </Link>
          </Menu.Item>
          <Menu.Item className={classes.userDropdown} key="register">
            <Link href="/auth/register">
              <a className={classes.authButton}>Регистрация</a>
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </Header>
  );
};

export default connect(
  (state: IStore) => ({
    authentication: state.authentication,
  }),
  (dispatch: Dispatch) => ({
    logoutUser: () => {
      destroyCookie(null, "access", { path: "/" });
      destroyCookie(null, "refresh", { path: "/" });
      dispatch(thunkActions.logout());
    },
  })
)(Navbar);
