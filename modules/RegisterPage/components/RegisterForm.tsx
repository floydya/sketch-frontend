import React from 'react'
import classNames from 'classnames'
import FormItem from 'antd/lib/form/FormItem'
import { Input, Button, Col, Alert } from 'antd'
import { KeyOutlined, MailOutlined } from '@ant-design/icons'

import classes from './RegisterForm.module.scss'
import Link from 'next/link'

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
    <div className={classNames(classes.container)}>
      <Col sm={{ span: 6, offset: 9 }}>
        <section className={classes.headSection}>
          <h2>Регистрация</h2>
          <p>Заполните поля ниже для регистрации.</p>
        </section>
        <form onSubmit={handleSubmit} className="ant-form ant-form-vertical">
        {errors.detail && (
            <Alert
              style={{ marginBottom: "10px" }}
              message={errors.detail}
              type="error"
              showIcon
            />
          )}
          <FormItem
            label="E-Mail"
            validateStatus={touched.email && errors.email && 'error'}
            help={touched.email && errors.email}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            label="Пароль"
            validateStatus={
              touched.password && errors.password
                ? 'error'
                : values.password === values.password2 && 'success'
            }
            help={touched.password && errors.password}
          >
            <Input.Password
              size="large"
              prefix={<KeyOutlined />}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            label="Повторите пароль"
            validateStatus={
              touched.re_password && errors.re_password
                ? 'error'
                : values.re_password === values.re_password && 'success'
            }
            help={touched.re_password && errors.re_password}
          >
            <Input.Password
              size="large"
              prefix={<KeyOutlined />}
              name="re_password"
              value={values.re_password}
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
          <Link href="/auth/login">
            <a>Авторизация</a>
          </Link>
        </div>
      </Col>
    </div>
  )
}

export default RegisterForm
