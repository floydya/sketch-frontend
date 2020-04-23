import React from "react";
import { Result, Button } from "antd";
import Router from "next/router";

const handleLoginRedirect = () => Router.push(`/auth/login`);

const PasswordSetSuccess = () => {
  return (
    <Result
      status="success"
      title="Пароль успешно изменен!"
      subTitle="Теперь Вы можете авторизоваться с новым паролем."
      extra={[
        <Button type="primary" onClick={handleLoginRedirect}>
          Авторизоваться
        </Button>,
      ]}
    />
  );
};

export default PasswordSetSuccess;
