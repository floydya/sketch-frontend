import React from "react";
import { Tabs } from "antd";
import { UserOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";
import { pageAccess } from "~/core";
import { ProfileSettings, SettingsContainer } from "~/modules";
import { NextPageContext } from "next";

const settingsTabs = [
  {
    Icon: UserOutlined,
    name: "Персональные данные",
    Component: ProfileSettings,
  },
  { Icon: SettingOutlined, name: "Настройки", Component: SettingsContainer },
  { Icon: BellOutlined, name: "Уведомления", Component: () => null },
];

const SettingsPage = (props) => {
  return (
    <div>
      <Tabs defaultActiveKey="0" tabPosition="left">
        {settingsTabs.map(({ Icon, name, Component }, index) => (
          <Tabs.TabPane
            key={index.toString()}
            tab={
              <span>
                <Icon /> {name}
              </span>
            }
          >
            <Component />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

SettingsPage.getInitialProps = async (ctx: NextPageContext) => {
  const user = ctx.store.getState().authentication.user;
  return { user };
};

export default pageAccess.privateRoute(SettingsPage);
