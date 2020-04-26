import React from "react";
import classNames from "classnames";
import { Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { KeyOutlined } from "@ant-design/icons";

import classes from "./PasswordSetForm.module.less";
import { Form } from "~/components";

const PasswordSetForm: React.FC<any> = ({ values, isSubmitting, onClose }) => (
  <section className={classNames(classes.container, "ant-row")}>
    <div className={classes.header}>
      <h2>Изменение пароля</h2>
    </div>
    <Form
      type="horizontal"
      formClass={classNames(classes.w100, "ant-col-md-18")}
    >
      {values.hasOwnProperty("current_password") && (
        <Form.Fields.Password
          size="large"
          placeholder="Текущий пароль"
          prefix={<KeyOutlined />}
          name="current_password"
        />
      )}
      <Form.Fields.Password
        size="large"
        placeholder="Новый пароль"
        prefix={<KeyOutlined />}
        name="new_password"
      />
      <Form.Fields.Password
        size="large"
        placeholder="Повторите новый пароль"
        prefix={<KeyOutlined />}
        name="re_new_password"
      />
      <FormItem>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            Изменить пароль
          </Button>
          {onClose && (
            <Button
              size="large"
              type="default"
              htmlType="button"
              disabled={isSubmitting}
              onClick={onClose}
            >
              Отменить
            </Button>
          )}
        </div>
      </FormItem>
    </Form>
  </section>
);

export default PasswordSetForm;
