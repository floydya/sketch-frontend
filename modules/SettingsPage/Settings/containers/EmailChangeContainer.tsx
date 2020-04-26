import { withFormik } from "formik";
import * as Yup from "yup";
import { axios } from "~/core";
import { IStore } from "~/store";
import { connect } from "react-redux";
import { EmailChangeForm } from "../components";
import { message } from "antd";
import { thunkActions } from "@floydya/authentication";
import { Dispatch } from "@floydya/authentication/store/types";
import { destroyCookie } from "nookies";

const validationSchema = Yup.object().shape({
  current_password: Yup.string().required(),
  new_email: Yup.string().email().required(),
  re_new_email: Yup.string()
    .email()
    .required()
    .test("email-match", "Emails doesn't matches", function (value) {
      const { new_email } = this.parent;
      return new_email === value;
    }),
});

type Values = Yup.InferType<typeof validationSchema>;

const initialValues: Values = {
  current_password: "",
  new_email: "",
  re_new_email: "",
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
        await axios.post(`/auth/users/set_email/`, values, {
          headers: { Authorization: `JWT ${form.props.token}` },
        });
        form.resetForm();
        await message.success("Почтовый адрес успешно изменен!");
        form.props.logout();
      } catch (error) {
        form.setErrors(error.response.data);
      }
      form.setSubmitting(false);
      if (form.props.onClose) form.props.onClose();
    },
  })(EmailChangeForm)
);
