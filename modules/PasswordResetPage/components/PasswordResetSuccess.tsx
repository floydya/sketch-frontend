import React from "react";
import { Result } from "antd";
import { useRouter } from "next/router";

const PasswordResetSuccess = () => {
  const { query } = useRouter();
  const email = Object.keys(query)[0] || null;
  const url = email.split("@")[1] || null;
  return (
    <Result
      status="success"
      title="Заявка на восстановление пароля отправлена!"
      subTitle={
        <React.Fragment>
          <p>
            Письмо будет отправлено на{" "}
            <a href={`http://${url}`} target="_blank">
              <strong>{email}</strong>
            </a>
            , если почтовый ящик зарегистрирован у нас на сайте.
          </p>
        </React.Fragment>
      }
    />
  );
};

export default PasswordResetSuccess;
