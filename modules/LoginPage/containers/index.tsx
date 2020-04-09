import { default as LoginForm } from "../components/LoginForm";
import { withFormik } from "formik";
import * as Yup from 'yup';
import { thunkDispatch } from "~/store";
import { userActions } from "~/store/actions";

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;

const initialValues: LoginFormValues = {
  username: "",
  password: "",
}

export default withFormik({
  mapPropsToValues: () => initialValues,
  handleSubmit: async (values, form) => {
    const formData = {username: values.username, password: values.password};
    const errors = await thunkDispatch(userActions.loginUser(formData));
    console.log(errors);
    form.setSubmitting(false);
  },
  validationSchema: loginSchema
})(LoginForm);