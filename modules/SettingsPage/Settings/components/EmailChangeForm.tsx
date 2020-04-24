import React from "react";
import classNames from "classnames";
import { Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";

import classes from "./EmailChangeForm.module.scss";
import { Form } from "~/components";

const EmailChangeForm = ({ isSubmitting }) => (
  <section className={classNames(classes.container, "ant-row")}>
    <div className={classes.header}>
      <h2>Изменение почтового адреса</h2>
    </div>
    <Form
      type="horizontal"
      formClass={classNames(classes.w100, "ant-col-md-18")}
    >
      <Form.Fields.Input
        type="email"
        size="large"
        placeholder="Новый почтовый адрес"
        prefix={<MailOutlined />}
        name="new_email"
      />
      <Form.Fields.Input
        type="email"
        size="large"
        placeholder="Повторите новый почтовый адрес"
        prefix={<MailOutlined />}
        name="re_new_email"
      />
      <Form.Fields.Password
          size="large"
          placeholder="Текущий пароль"
          prefix={<KeyOutlined />}
          name="current_password"
        />
      <FormItem>
        <Button
          className={classes.w100}
          size="large"
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
        >
          Изменить почту
        </Button>
      </FormItem>
    </Form>
  </section>
);

export default EmailChangeForm;
