import { default as LoginForm } from "../components/LoginForm";
import { withFormik } from "formik";
import * as Yup from "yup";
import { authenticationActions } from "~/store";
import { connect } from "react-redux";
import { setCookie } from "nookies";

const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(authenticationActions.login(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik<{ login: (d: any) => Promise<any> }, LoginFormValues>({
    mapPropsToValues: () => initialValues,
    handleSubmit: async (values, form) => {
      const formData = { email: values.email, password: values.password };
      try {
        const data = await form.props.login(formData);
        const {
          payload: { access, refresh },
        } = data;
        setCookie(null, "access", access, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "refresh", refresh, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      } catch (errors) {
        form.setErrors(errors.response.data);
      }
      form.setSubmitting(false);
    },
    validationSchema: loginSchema,
  })(LoginForm)
);
