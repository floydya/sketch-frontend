import React from "react";
import { axios } from "~/core";
import { NextPage, NextPageContext } from "next";
import Error from "next/error";
import { Row, Col, Card, Avatar, List, Tag, Button, Divider, Rate } from "antd";
import {
  MailFilled,
  PhoneFilled,
  DownloadOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  HeartOutlined
} from "@ant-design/icons";
import classes from "./Profile.module.less";

interface IProps {
  user: any;
}

const Profile: NextPage<IProps> = ({ user }) => {
  const [activeTab, setActiveTab] = React.useState<string>("0");
  const [loading, setLoading] = React.useState<boolean>(false);
  if (!user) return <Error statusCode={404} />;
  return (
    <Row>
      <Col md={24} lg={7} style={{ padding: "0 12px" }}>
        <Card>
          <div className={classes.avatar}>
            <Avatar src={user.avatar} size={144}>
              {user.get_full_name}
            </Avatar>
            <h3 className={classes.full_name}>{user.get_full_name}</h3>
            <Rate character={<HeartOutlined />} allowHalf disabled value={3.5} />
          </div>
          <div className={classes.details}>
            <p>
              <MailFilled /> {user.email}
            </p>
            {user.phone_number && (
              <p>
                <PhoneFilled /> {user.phone_number}
              </p>
            )}
          </div>
          <Divider />
          <div className={classes.tags}>
            <Tag closable={false}>Жанр 1</Tag>
            <Tag closable={false}>Жанр 2</Tag>
            <Tag closable={false}>Жанр 3</Tag>
            <Tag closable={false}>Жанр 4</Tag>
          </div>
          <Divider />
          <div className={classes.social}>
            <p>
              <FacebookFilled /> <a href="#">@username</a>
            </p>
            <p>
              <InstagramFilled /> <a href="#">@username</a>
            </p>
            <p>
              <TwitterCircleFilled /> <a href="#">@username</a>
            </p>
          </div>
        </Card>
      </Col>
      <Col md={24} lg={17} style={{ padding: "0 12px" }}>
        <Card
          style={{ width: "100%" }}
          activeTabKey={activeTab}
          onTabChange={setActiveTab}
          tabList={[{ key: "0", tab: "Заказы/Выполненные работы" }]}
        >
          {/* {tabs[activeTab]} */}
          <List itemLayout="vertical">
            {Array.from(new Array(5)).map(() => (
              <List.Item
                actions={[
                  <Tag color="success">Выполнено</Tag>,
                  <Tag color="default">21.04.2020</Tag>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <h3>
                      <a href="#">Тестовый заказ</a>
                    </h3>
                  }
                  description={
                    <>
                      <Tag closable={false}>Жанр 1</Tag>
                      <Tag closable={false}>Жанр 2</Tag>
                      <Tag closable={false}>Жанр 3</Tag>
                    </>
                  }
                  style={{ marginBottom: "14px" }}
                />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                exercitationem deleniti nulla ratione eius est quos, maxime
                possimus eum tempore sequi et perferendis laborum quam alias
                harum voluptatem delectus dignissimos?
              </List.Item>
            ))}
          </List>
          <div style={{ textAlign: "center" }}>
            <Button
              icon={<DownloadOutlined />}
              type="primary"
              loading={loading}
              onClick={setLoading.bind(null, true)}
            >
              Загрузить еще
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

Profile.getInitialProps = async (ctx: NextPageContext) => {
  const id = parseInt(ctx.query.id.toString());
  try {
    const response = await axios.get(`/auth/users/${id}/`);
    return { user: response.data };
  } catch (err) {
    return { user: null };
  }
};

export default Profile;
