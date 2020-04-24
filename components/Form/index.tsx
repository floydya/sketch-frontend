import React from "react";
import { Form, useFormikContext, FormikErrors } from "formik";
import classNames from "classnames";
import { Alert } from "antd";
import WrappedFields, { IWrappedFields } from "./wrapper";

interface FormInterface<P> extends React.FC<P> {
  Fields: IWrappedFields;
}

interface FormProps {
  type: "horizontal" | "vertical";
  formClass?: string;
  formStyle?: { [n: string]: any };
}

const FormComponent: FormInterface<FormProps> = ({
  type,
  children,
  formClass,
  formStyle,
}) => {
  const {
    errors,
  }: {
    errors: FormikErrors<{
      detail?: string;
      non_field_errors?: string;
    }>;
  } = useFormikContext();
  return (
    <Form
      style={formStyle}
      className={classNames("ant-form", `ant-form-${type}`, formClass)}
    >
      {errors.detail && (
        <Alert
          style={{ marginBottom: "10px" }}
          message={errors.detail}
          type="error"
          showIcon
        />
      )}
      {errors.non_field_errors && (
        <Alert
          style={{ marginBottom: "10px" }}
          message={errors.non_field_errors}
          type="error"
          showIcon
        />
      )}
      {children}
    </Form>
  );
};

FormComponent.Fields = WrappedFields;

export default FormComponent;
