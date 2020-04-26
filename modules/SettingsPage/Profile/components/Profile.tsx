import React from "react";
import { Row, Col, Select, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import AvatarUpload from "./AvatarUpload";
import { SaveOutlined } from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import { Form } from "~/components";

const ProfileComponent = ({ user, isSubmitting }) => {
  return (
    <Form type="vertical">
      <h3 style={{ marginBottom: "24px" }}>Персональные данные</h3>
      <Row>
        <Col md={8}>
          <Form.Fields.Input name="first_name" label="Имя" />
          <Form.Fields.Input name="middle_name" label="Отчество" />
          <Form.Fields.Input name="last_name" label="Фамилия" />
          <Form.Fields.MaskedInput
            mask="+38(111) 111-11-11"
            label="Номер телефона"
            name="phone_number"
          />
          <Form.Fields.DatePicker
            label="Дата рождения"
            name="birth_date"
            allowClear={false}
            style={{ width: "100%" }}
          />
          <Form.Fields.Select label="Пол" name="gender">
            <Form.Fields.SelectOption value={null}>
              Не выбран
            </Form.Fields.SelectOption>
            <Form.Fields.SelectOption value="male">
              Мужской
            </Form.Fields.SelectOption>
            <Form.Fields.SelectOption value="female">
              Женский
            </Form.Fields.SelectOption>
          </Form.Fields.Select>
        </Col>
        <Col md={16}>
          <AvatarUpload user={user} />
        </Col>
      </Row>
      <FormItem style={{ marginTop: "25px" }}>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={isSubmitting}
        >
          Сохранить
        </Button>
      </FormItem>
    </Form>
  );
};

export default ProfileComponent;
