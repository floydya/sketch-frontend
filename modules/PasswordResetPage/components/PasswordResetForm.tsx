import React from "react";
import { Alert, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { MailOutlined } from "@ant-design/icons";
import classNames from "classnames";
import classes from "./PasswordResetForm.module.scss";

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
      <form
        onSubmit={handleSubmit}
        className={classNames(
          classes.w100,
          "ant-col-md-6",
          "ant-form",
          "ant-form-horizontal"
        )}
      >
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
      </form>
    </section>
  );
};

export default PasswordResetForm;
