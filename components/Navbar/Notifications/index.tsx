import React from "react";
import { Badge, Dropdown, Tabs, List, Avatar, Button, Empty } from "antd";
import { BellFilled, NotificationOutlined } from "@ant-design/icons";

import classes from "./Notifications.module.less";

const menu = (
  <div style={{ backgroundColor: "#1f1f1f", width: "520px", padding: "0 15px" }}>
    <Tabs defaultActiveKey={"system"} tabBarStyle={{ textAlign: "center" }}>
      <Tabs.TabPane key="system" tab={<span>Системные</span>}>
        <List>
          <List.Item actions={[<Button type="link">Перейти</Button>]}>
            <List.Item.Meta
              avatar={
                <Avatar>
                  <NotificationOutlined />
                </Avatar>
              }
              title={"На ваш баланс начислено 1500 гривен."}
              description={"Оплата за выполненную работу"}
            />
          </List.Item>
          <List.Item actions={[<Button type="link">Перейти</Button>]}>
            <List.Item.Meta
              avatar={
                <Avatar>
                  <NotificationOutlined />
                </Avatar>
              }
              title={"На ваш баланс начислено 1500 гривен."}
              description={"Оплата за выполненную работу"}
            />
          </List.Item>
          <List.Item actions={[<Button type="link">Перейти</Button>]}>
            <List.Item.Meta
              avatar={
                <Avatar>
                  <NotificationOutlined />
                </Avatar>
              }
              title={"На ваш баланс начислено 1500 гривен."}
              description={"Оплата за выполненную работу"}
            />
          </List.Item>
          <List.Item actions={[<Button type="link">Перейти</Button>]}>
            <List.Item.Meta
              avatar={
                <Avatar>
                  <NotificationOutlined />
                </Avatar>
              }
              title={"На ваш баланс начислено 1500 гривен."}
              description={"Оплата за выполненную работу"}
            />
          </List.Item>
        </List>
      </Tabs.TabPane>
      <Tabs.TabPane key="test" tab={<span>Test</span>}>
        <Empty />
      </Tabs.TabPane>
    </Tabs>
  </div>
);

const Notifications = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <div className={classes.buttonContainer}>
        <Badge count={11}>
          <BellFilled size={144} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default Notifications;
