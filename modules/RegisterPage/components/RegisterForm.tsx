import React from "react";
import classNames from "classnames";
import FormItem from "antd/lib/form/FormItem";
import { Button, Col } from "antd";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";

import classes from "./RegisterForm.module.scss";
import Link from "next/link";
import { Form } from "~/components";

const RegisterForm = ({ isSubmitting }) => {
  return (
    <div className={classNames(classes.container)}>
      <Col sm={{ span: 6, offset: 9 }}>
        <section className={classes.headSection}>
          <h2>Регистрация</h2>
          <p>Заполните поля ниже для регистрации.</p>
        </section>
        <Form type="vertical">
          <Form.Fields.Input
            label="E-Mail"
            size="large"
            prefix={<MailOutlined />}
            name="email"
          />
          <Form.Fields.Password
            label="Пароль"
            size="large"
            prefix={<KeyOutlined />}
            name="password"
          />
          <Form.Fields.Password
            label="Повторите пароль"
            size="large"
            prefix={<KeyOutlined />}
            name="re_password"
          />
          <FormItem>
            <Button
              className={classes.w100}
              size="large"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              Зарегистрироваться
            </Button>
          </FormItem>
        </Form>
        <div className={classes.center}>
          <Link href="/auth/login">
            <a>Авторизация</a>
          </Link>
        </div>
      </Col>
    </div>
  );
};

export default RegisterForm;
