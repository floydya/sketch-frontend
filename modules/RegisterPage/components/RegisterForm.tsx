import React from "react";
import classNames from "classnames";
import FormItem from "antd/lib/form/FormItem";
import { Input, Button, Row, Col } from "antd";
import { UserOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";

import classes from "./RegisterForm.module.scss";
import Link from "next/link";

const RegisterForm = ({
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
      <Col span={6} offset={9}>
        <section className={classes.headSection}>
          <h2>Регистрация</h2>
          <p>Заполните поля ниже для регистрации.</p>
        </section>
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
            validateStatus={touched.email && errors.email && "error"}
            help={touched.email && errors.email}
          >
            <Input
              placeholder="E-mail"
              prefix={<MailOutlined />}
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            validateStatus={
              touched.password && errors.password
                ? "error"
                : values.password === values.password2 && "success"
            }
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
            validateStatus={
              touched.password2 && errors.password2
                ? "error"
                : values.password === values.password2 && "success"
            }
            help={touched.password2 && errors.password2}
          >
            <Input.Password
              placeholder="Повторите пароль..."
              prefix={<KeyOutlined />}
              name="password2"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
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
        </form>
        <div className={classes.center}>
          <Link href="/login">
            <a>Авторизация</a>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterForm;
