import React from "react";
import Link from "next/link";
import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classes from "./UserDropdown.module.scss";
import classNames from "classnames";

interface IUserDropdownProps {
  user: {
    id: number;
    email: string;
    avatar?: string;
  };
  logout: () => void;
}

const UserDropdown: React.FC<IUserDropdownProps> = ({ user, logout }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0">
            <Link href={`/profile/${user.id}`}>
              <a>Профиль</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link href="/settings">
              <a>Настройки</a>
            </Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={logout}>
            Выйти
          </Menu.Item>
        </Menu>
      }
      trigger={["click"]}
    >
      <a
        className={classNames("ant-dropdown-link", classes.userMenuLink)}
        onClick={(e) => e.preventDefault()}
      >
        <Avatar size="large" src={user.avatar}>
          {user.email.charAt(0).toUpperCase()}
        </Avatar>
        <span>{user.email}</span>
        <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
