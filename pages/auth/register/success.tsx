import React from "react";
import { Result } from "antd";
import { useRouter } from "next/router";

const RegisterSuccessPage = () => {
  const { query } = useRouter();
  const email = Object.keys(query)[0] || null;
  const url = email.split("@")[1] || null;
  return (
    <Result
      status="success"
      title="Регистрация завершена!"
      subTitle={
        <React.Fragment>
          <p>Осталось совсем немного - активировать почтовый ящик.</p>
          <p>
            Письмо отправлено на{" "}
            <a href={`http://${url}`} target="_blank">
              <strong>{email}</strong>
            </a>
          </p>
        </React.Fragment>
      }
    />
  );
};

export default RegisterSuccessPage;
