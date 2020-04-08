import { default as RegisterForm } from "../components/RegisterForm";
import { withFormik } from "formik";
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  password2: Yup.string().required().min(6).test('password-match', "Password doesn't matches", function (value) {
    const { password } = this.parent;
    return password === value;
  }),
});

type Values = Yup.InferType<typeof registerSchema>;

const initialValues: Values = {
  username: "",
  email: "",
  password: "",
  password2: "",
}

export default withFormik({
  mapPropsToValues: () => initialValues,
  handleSubmit: async (values, form) => {
    console.log(values);
    form.setSubmitting(false);
  },
  validationSchema: registerSchema
})(RegisterForm);