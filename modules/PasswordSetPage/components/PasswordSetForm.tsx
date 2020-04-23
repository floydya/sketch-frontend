import React from "react";
import classNames from "classnames";
import { Alert, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { KeyOutlined } from "@ant-design/icons";

import classes from "./PasswordSetForm.module.scss";

const PasswordSetForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  isSubmitting,
}) => {
  return (
    <section className={classNames(classes.container, "ant-row")}>
      <div className={classes.header}>
        <h2>Изменение пароля</h2>
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
          validateStatus={
            touched.new_password && errors.new_password && "error"
          }
          help={touched.new_password && errors.new_password}
        >
          <Input.Password
            size="large"
            placeholder="Пароль"
            prefix={<KeyOutlined />}
            name="new_password"
            value={values.new_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormItem>
        <FormItem
          validateStatus={
            touched.re_new_password && errors.re_new_password && "error"
          }
          help={touched.re_new_password && errors.re_new_password}
        >
          <Input.Password
            size="large"
            placeholder="Повторите пароль"
            prefix={<KeyOutlined />}
            name="re_new_password"
            value={values.re_new_password}
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
            Изменить пароль
          </Button>
        </FormItem>
      </form>
    </section>
  );
};

export default PasswordSetForm;
