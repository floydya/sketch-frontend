import { ReactNode } from "react";
import FormItem from "antd/lib/form/FormItem";
import { Field, getIn as get } from "formik";
import {
  Input,
  DatePicker,
  Select,
  InputNumber,
  Rate,
  Radio,
  Switch,
  TimePicker,
  Checkbox,
} from "antd";
import { InputProps, PasswordProps } from "antd/lib/input";
import { InputNumberProps } from "antd/lib/input-number";
import { RateProps } from "antd/lib/rate";
import { RadioProps } from "antd/lib/radio";
import { SwitchProps } from "antd/lib/switch";
import { DatePickerProps } from "antd/lib/date-picker";
import { TimePickerProps } from "antd/lib/time-picker";
import { SelectProps } from "antd/lib/select";
import { CheckboxProps } from "antd/lib/checkbox";
import { MaskedInput } from "antd-mask-input";
import { MaskedInputProps } from "antd-mask-input/build/main/lib/MaskedInput";

interface FieldProps {
  className?: string;
  label?: string;
  tip?: string | ReactNode;
  error?: string;
  name: string;
  [x: string]: any;
}

const fieldWrapper = (FormComponent) => ({
  className,
  label,
  tip,
  error,
  name,
  ...otherProps
}) => {
  return (
    <Field name={name}>
      {({
        field,
        form: { touched, errors, setFieldValue, setFieldTouched, values },
      }) => (
        <FormItem
          className={className}
          label={label}
          help={get(touched, name) && get(errors, name)}
          validateStatus={get(touched, name) && get(errors, name) && "error"}
        >
          <FormComponent
            {...field}
            {...otherProps}
            value={get(values, name)}
            name={name}
            onChange={(value) => {
              if (value.target) {
                setFieldValue(name, value.target.value);
              } else {
                setFieldValue(name, value);
              }
            }}
            onBlur={() => setFieldTouched(name, true)}
          />
        </FormItem>
      )}
    </Field>
  );
};

export interface IWrappedFields {
  MaskedInput: React.FunctionComponent<FieldProps & InputProps & {
    mask?: string;
    formatCharacters?: object;
    placeholderChar?: string;
  }>;
  Input: React.FunctionComponent<FieldProps & InputProps>;
  InputNumber: React.FunctionComponent<FieldProps & InputNumberProps>;
  Rate: React.FunctionComponent<FieldProps & RateProps>;
  Radio: React.FunctionComponent<FieldProps & RadioProps>;
  Switch: React.FunctionComponent<FieldProps & SwitchProps>;
  Password: React.FunctionComponent<FieldProps & PasswordProps>;
  DatePicker: React.FunctionComponent<FieldProps & DatePickerProps>;
  TimePicker: React.FunctionComponent<FieldProps & TimePickerProps>;
  Select: React.FunctionComponent<FieldProps & SelectProps<any>>;
  SelectOption: typeof Select.Option;
  Checkbox: React.FunctionComponent<FieldProps & CheckboxProps>;
}

const Fields: IWrappedFields = {
  MaskedInput: fieldWrapper(MaskedInput),
  Input: fieldWrapper(Input),
  InputNumber: fieldWrapper(InputNumber),
  Rate: fieldWrapper(Rate),
  Radio: fieldWrapper(Radio.Group),
  Switch: fieldWrapper(Switch),
  Password: fieldWrapper(Input.Password),
  DatePicker: fieldWrapper(DatePicker),
  TimePicker: fieldWrapper(TimePicker),
  Select: fieldWrapper(Select),
  SelectOption: Select.Option,
  Checkbox: fieldWrapper(Checkbox),
};

export default Fields;
