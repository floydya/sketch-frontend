import React from "react";
import { Result, Button } from "antd";
import Router from "next/router";

const handleAuthRedirect = () => Router.push(`/auth/login`);

const Success = () => {
  return (
    <Result
      status="success"
      title="Почтовый ящик успешно активирован!"
      subTitle="Теперь вы можете полноценно воспользоваться нашим сайтом."
      extra={[
        <Button type="primary" key="console" onClick={handleAuthRedirect}>
          Авторизоваться
        </Button>,
      ]}
    />
  );
};

export default Success;
