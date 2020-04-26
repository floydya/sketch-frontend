import React from "react";
import { Menu } from "antd";
import { pageAccess } from "~/core";
import { ProfileSettings, SettingsContainer } from "~/modules";

const settingsTabs = [
  {
    name: "Персональные данные",
    Component: ProfileSettings,
  },
  { name: "Настройки", Component: () => null },
  { name: "Уведомления", Component: () => null },
  { name: "Настройки безопасности", Component: SettingsContainer },
];

const SettingsPage = () => {
  const [selectedPage, setSelectedPage] = React.useState<string>("0");
  const setPage = React.useCallback(({ key }) => setSelectedPage(key), []);
  const Component = React.useMemo(() => settingsTabs[selectedPage].Component, [
    selectedPage,
  ]);
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Menu
        style={{ width: 256 }}
        onClick={setPage}
        mode="inline"
        selectedKeys={[selectedPage]}
      >
        {settingsTabs.map(({ name }, index) => (
          <Menu.Item key={index.toString()}>{name}</Menu.Item>
        ))}
      </Menu>
      <div style={{ flex: "1 1", padding: "25px" }}>
        <Component />
      </div>
    </div>
  );
};

export default pageAccess.privateRoute(SettingsPage);
