import React from "react";
import classNames from "classnames";
import FormItem from "antd/lib/form/FormItem";
import { Input, Button, Col, Alert } from "antd";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";

import classes from "./LoginForm.module.scss";
import Link from "next/link";
import { Form } from "~/components";

const LoginForm = ({
  errors,
  touched,
  isSubmitting,
  values,
  handleChange,
  handleSubmit,
  handleBlur,
}) => {
  return (
    <div className={classNames(classes.container)}>
      <Col sm={{ span: 6, offset: 9 }}>
        <section className={classes.headSection}>
          <h2>Авторизация</h2>
          <p>Введите свои учетные данные для авторизации.</p>
        </section>
        <Form type="horizontal">
          <Form.Fields.Input
            type="email"
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            name="email"
          />
          <Form.Fields.Password
            size="large"
            placeholder="Пароль"
            prefix={<KeyOutlined />}
            name="password"
          />
          <FormItem>
            <Button
              className={classes.w100}
              size="large"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              Автозироваться
            </Button>
          </FormItem>
        </Form>
        <div className={classes.links}>
          <Link href="/auth/register">
            <a>Зарегистрироваться</a>
          </Link>
          <Link href="/auth/password-reset">
            <a>Забыли пароль?</a>
          </Link>
        </div>
      </Col>
    </div>
  );
};

export default LoginForm;
