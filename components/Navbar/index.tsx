import React from "react";
import Link from "next/link";
import { Layout } from "antd";
import { connect } from "react-redux";
import classes from "./Navbar.module.scss";
import { IStore } from "~/store";
import {
  IState as AuthenticationState,
  Dispatch,
} from "@floydya/authentication/store/types";
import UserDropdown from "./UserDropdown";
import classNames from "classnames";
import { thunkActions } from "@floydya/authentication";
import { destroyCookie } from "nookies";

const { Header } = Layout;

interface INavbar {
  authentication: AuthenticationState;
  logoutUser: () => void;
}

const Navbar: React.FC<INavbar> = ({ authentication, logoutUser }) => {
  return (
    <Header className={classNames(classes.header, "ant-menu", "ant-menu-dark")}>
      <Link href="/">
        <a>
          <div className={classes.logo} />
        </a>
      </Link>
      <div className={classes.navbarSpace} />
      {authentication.user ? (
        <UserDropdown user={authentication.user} logout={logoutUser} />
      ) : (
        <React.Fragment>
          <Link href="/login">
            <a className="ant-menu-item">Вход</a>
          </Link>
          <Link href="/register">
            <a className={classNames("ant-menu-item", classes.registerButton)}>
              Регистрация
            </a>
          </Link>
        </React.Fragment>
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
      destroyCookie(null, "access");
      destroyCookie(null, "refresh");
      dispatch(thunkActions.logout());
    },
  })
)(Navbar);
