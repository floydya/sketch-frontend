import React from "react";
import Link from "next/link";
import { Layout, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import classes from "./Navbar.module.scss";
import { IStore } from "~/store";
import { userActions } from "~/store/actions";
import { IUserState } from "~/store/types/user";

const { Header } = Layout;

interface INavbar {
  currentRoute: string;
  user: IUserState;
}

const Navbar: React.FC<INavbar> = ({ currentRoute, user }) => {
  console.log(user);
  return (
    <Header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo} />
        </a>
      </Link>
      <div className={classes.navbarSpace} />
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="0">
              <a href="http://www.alipay.com/">1st menu item</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="http://www.taobao.com/">2nd menu item</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">3rd menu item</Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Click me <DownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
};

export default connect(
  (state: IStore) => ({
    user: state.user,
  }),
  (dispatch) => ({ logoutUser: () => dispatch(userActions.removeToken()) })
)(Navbar);
