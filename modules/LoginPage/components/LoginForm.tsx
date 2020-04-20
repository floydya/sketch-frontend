import React from "react";
import classNames from "classnames";
import FormItem from "antd/lib/form/FormItem";
import { Input, Button, Col, Alert } from "antd";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";

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
    <div className={classNames(classes.container)}>
      <Col sm={{ span: 6, offset: 9 }}>
        <section className={classes.headSection}>
          <h2>Авторизация</h2>
          <p>Введите свои учетные данные для авторизации.</p>
        </section>
        <form onSubmit={handleSubmit} className="ant-form ant-form-horizontal">
          {errors.detail && (
            <Alert
              style={{ marginBottom: "10px" }}
              message={errors.detail}
              type="error"
              showIcon
            />
          )}
          <FormItem
            validateStatus={touched.email && errors.email && "error"}
            help={touched.email && errors.email}
          >
            <Input
              type="email"
              size="large"
              placeholder="Email"
              prefix={<MailOutlined />}
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            validateStatus={touched.password && errors.password && "error"}
            help={touched.password && errors.password}
          >
            <Input.Password
              size="large"
              placeholder="Пароль..."
              prefix={<KeyOutlined />}
              name="password"
              value={values.password}
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
              Автозироваться
            </Button>
          </FormItem>
        </form>
        <div className={classes.links}>
          <Link href="/register">
            <a>Зарегистрироваться</a>
          </Link>
          <Link href="/forgot-password">
            <a>Забыли пароль?</a>
          </Link>
        </div>
      </Col>
    </div>
  );
};

export default LoginForm;
