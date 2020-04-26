import { withFormik } from "formik";
import * as Yup from "yup";
import { axios } from "~/core";
import { IStore } from "~/store";
import { connect } from "react-redux";
import { PasswordSetForm } from "../components";
import { message } from "antd";
import { thunkActions } from "@floydya/authentication";
import { Dispatch } from "@floydya/authentication/store/types";
import { destroyCookie } from "nookies";

const validationSchema = Yup.object().shape({
  current_password: Yup.string().required(),
  new_password: Yup.string().required().min(6),
  re_new_password: Yup.string()
    .required()
    .min(6)
    .test("password-match", "Password doesn't matches", function (value) {
      const { new_password } = this.parent;
      return new_password === value;
    }),
});

type Values = Yup.InferType<typeof validationSchema>;

const initialValues: Values = {
  current_password: "",
  new_password: "",
  re_new_password: "",
};

interface IProps {
  token: string;
  logout: () => void;
  onClose?: () => void;
}

export default connect(
  (state: IStore) => ({
    token: state.authentication.access,
  }),
  (dispatch: Dispatch) => ({
    logout: () => {
      destroyCookie(null, "access");
      destroyCookie(null, "refresh");
      dispatch(thunkActions.logout());
    },
  })
)(
  withFormik<IProps, Values>({
    mapPropsToValues: () => initialValues,
    handleSubmit: async (values, form) => {
      try {
        await axios.post(`/auth/users/set_password/`, values, {
          headers: { Authorization: `JWT ${form.props.token}` },
        });
        form.resetForm();
        await message.success("Пароль успешно изменен!");
        form.props.logout();
      } catch (error) {
        form.setErrors(error.response.data);
      }
      form.setSubmitting(false);
      if (form.props.onClose) form.props.onClose()
    },
  })(PasswordSetForm)
);
