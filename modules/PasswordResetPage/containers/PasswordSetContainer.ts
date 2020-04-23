import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { PasswordSetForm } from "~/modules/PasswordSetPage/components";
import { axios } from "~/core";
import Router from "next/router";
import { thunkActions } from "@floydya/authentication";
import { destroyCookie } from "nookies";

const validationSchema = Yup.object().shape({
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
  new_password: "",
  re_new_password: "",
};

interface IProps {
  token: string | string[];
  uid: string | string[];
  logout: () => void;
}

const mapDispatchToProps = (dispatch) => ({
  logout: async () => {
    destroyCookie(null, "access", { path: "/" });
    destroyCookie(null, "refresh", { path: "/" });
    await dispatch(thunkActions.logout());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik<IProps, Values>({
    mapPropsToValues: (props) => {
      const { token, uid } = props;
      return { ...initialValues, token, uid };
    },
    handleSubmit: async (values, form) => {
      try {
        await axios.post(`/auth/users/reset_password_confirm/`, values);
        form.props.logout();
        await Router.replace(
          `/auth/password-reset/set-success`,
          `/auth/password-reset`
        );
      } catch (error) {
        form.setErrors(error.response.data);
      }
      form.setSubmitting(false);
    },
    validationSchema,
  })(PasswordSetForm)
);
