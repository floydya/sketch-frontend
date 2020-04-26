import React, { Fragment } from "react";
import { List, Button, Drawer, Avatar } from "antd";
import { PasswordSetContainer } from "~/modules/PasswordSetPage";
import EmailChangeContainer from "./EmailChangeContainer";
import { connect } from "react-redux";
import { IStore } from "~/store";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";

const SettingsContainer = ({ user }) => {
  const [modal, setModal] = React.useState<string>(null);
  return (
    <Fragment>
      <List>
        <List.Item
          actions={[
            <Button type="link" onClick={setModal.bind(null, "email")}>
              Изменить
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar>
                <MailOutlined size={72} />
              </Avatar>
            }
            title="Электронная почта"
            description={`Текущий адрес: ${user?.email}`}
            style={{ alignItems: "center" }}
          />
        </List.Item>
        <List.Item
          actions={[
            <Button type="link" onClick={setModal.bind(null, "password")}>
              Изменить
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar>
                <KeyOutlined size={72} />
              </Avatar>
            }
            title="Пароль"
            description={null}
            style={{ alignItems: "center" }}
          />
        </List.Item>
      </List>
      <Drawer
        width={720}
        onClose={setModal.bind(null, null)}
        visible={modal !== null}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {modal === "email" && (
          <EmailChangeContainer onClose={setModal.bind(null, null)} />
        )}
        {modal === "password" && (
          <PasswordSetContainer onClose={setModal.bind(null, null)} />
        )}
      </Drawer>
    </Fragment>
  );
};

export default connect((state: IStore) => ({
  user: state.authentication.user,
}))(SettingsContainer);
