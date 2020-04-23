import React from "react";
import { Avatar, Badge, Input, Row, Col } from "antd";
import { IStore } from "~/store";
import { connect } from "react-redux";
import { HighlightTwoTone } from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";

interface IProps {
  user: any;
}

const ProfileComponent: React.FC<IProps> = ({ user }) => {
  return (
    <div>
      <div>
        <Avatar size={144} src={user.avatar}>
          {user.email.charAt(0)}
        </Avatar>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="ant-form ant-form-vertical"
      >
        <Row>
          <Col md={{ span: 6, offset: 2 }}>
            <FormItem label="Имя">
              <Input name="first_name" value={user.first_name} />
            </FormItem>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <FormItem label="Отчество">
              <Input name="middle_name" value={user.middle_name} />
            </FormItem>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <FormItem label="Фамилия">
              <Input name="last_name" value={user.last_name} />
            </FormItem>
          </Col>
        </Row>
        <Row>
            
        </Row>
      </form>
    </div>
  );
};

export default connect((state: IStore) => ({
  user: state.authentication.user,
}))(ProfileComponent);
