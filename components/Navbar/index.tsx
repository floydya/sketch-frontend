import React from "react";
import Link from "next/link";
import { Layout, Menu } from "antd";

import classes from "./Navbar.module.scss";

const { Header } = Layout;

interface INavbar {
  currentRoute: string;
}

const Navbar: React.FC<INavbar> = ({currentRoute}) => {
  return (
    <Header className="header">
      <div className={classes.logo} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[currentRoute]}
        className={classes["ant-menu"]}
      >
        <Menu.Item key="/">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3" className={classes.nextRightItem}>nav 3</Menu.Item>
        <li className={classes.navbarSpace} />
        <Menu.Item key="/login">
          <Link href="/login"><a>Login</a></Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
