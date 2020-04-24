import React from "react";
import { Alert, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { MailOutlined } from "@ant-design/icons";
import classNames from "classnames";
import classes from "./PasswordResetForm.module.scss";
import { Form } from "~/components";

const PasswordResetForm = ({
  errors,
  handleSubmit,
  values,
  touched,
  handleChange,
  handleBlur,
  isSubmitting,
}) => {
  return (
    <section className={classNames("ant-row", classes.container)}>
      <div className={classes.header}>
        <h2>Забыли пароль?</h2>
        <p>Введите почтовый адрес, на который вы регистрировались.</p>
        <p>Туда будет отправлено письмо с ссылкой на изменение пароля.</p>
      </div>
      <Form type="horizontal">
        <Form.Fields.Input
          type="email"
          size="large"
          placeholder="Email"
          prefix={<MailOutlined />}
          name="email"
        />
        <FormItem>
          <Button
            className={classes.w100}
            size="large"
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            Отправить письмо
          </Button>
        </FormItem>
      </Form>
    </section>
  );
};

export default PasswordResetForm;
