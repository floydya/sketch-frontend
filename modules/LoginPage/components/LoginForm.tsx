import React from "react";
import classNames from "classnames";
import FormItem from "antd/lib/form/FormItem";
import { Input, Button, Row, Col } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

import classes from "./LoginForm.module.scss";
import Link from "next/link";

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
    <Row className={classNames(classes.container)}>
      <Col span={8} offset={8}>
        <h2>Авторизация</h2>
        <p>Введите свои учетные данные для авторизации.</p>
        <form onSubmit={handleSubmit} className="ant-form ant-form-horizontal">
          <FormItem
            validateStatus={touched.username && errors.username && "error"}
            help={touched.username && errors.username}
          >
            <Input
              placeholder="Имя пользователя"
              prefix={<UserOutlined />}
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            validateStatus={touched.password && errors.password && "error"}
            help={touched.password && errors.password}
          >
            <Input.Password
              placeholder="Пароль..."
              prefix={<KeyOutlined />}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 8, offset: 8 }}
            className={classes.center}
          >
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Автозироваться
            </Button>
          </FormItem>
        </form>
        <div className={classes.center}>
          <Link href="/register">
            <a>Зарегистрироваться</a>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default LoginForm;
