import { default as LoginForm } from "../components/LoginForm";
import { withFormik } from "formik";
import * as Yup from 'yup';
import { thunkDispatch } from "~/store";
import { userActions } from "~/store/actions";

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

type Values = Yup.InferType<typeof loginSchema>;

const initialValues: Values = {
  username: "",
  password: "",
}

export default withFormik({
  mapPropsToValues: () => initialValues,
  handleSubmit: async (values, form) => {
    const errors = await thunkDispatch(userActions.loginUser(values));
    console.log(errors);
    form.setSubmitting(false);
  },
  validationSchema: loginSchema
})(LoginForm);