import React from "react";
import { Row, Col, Select, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import AvatarUpload from "./AvatarUpload";
import { SaveOutlined } from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import { Form } from "~/components";

const ProfileComponent = ({
  user,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  isSubmitting,
}) => {
  return (
    <Form type="vertical">
      <Row style={{ marginTop: "15px" }}>
        <Col md={4}>
          <AvatarUpload user={user} />
        </Col>
        <Col md={20}>
          <Row>
            <Col md={{ span: 7 }}>
              <Form.Fields.Input name="first_name" label="Имя" />
            </Col>
            <Col md={{ span: 7, offset: 1 }}>
              <Form.Fields.Input name="middle_name" label="Отчество" />
            </Col>
            <Col md={{ span: 7, offset: 1 }}>
              <Form.Fields.Input name="last_name" label="Фамирия" />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 7 }}>
              <Form.Fields.MaskedInput
                mask="+38(111) 111-11-11"
                label="Номер телефона"
                name="phone_number"
              />
            </Col>
            <Col md={{ span: 7, offset: 1 }}>
              <Form.Fields.DatePicker
                label="Дата рождения"
                name="birth_date"
                allowClear={false}
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={{ span: 7, offset: 1 }}>
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
          </Row>
        </Col>
      </Row>
      <FormItem style={{ textAlign: "right", marginTop: "25px" }}>
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
