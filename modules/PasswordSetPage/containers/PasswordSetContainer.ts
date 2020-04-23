import { withFormik } from "formik";
import * as Yup from "yup";
import { axios } from "~/core";

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
  token: string;
}

export default withFormik<IProps, Values>({
  mapPropsToValues: () => initialValues,
  handleSubmit: async (values, form) => {
    try {
      await axios.post(`/auth/users/set_password/`, values, {
        headers: { Authorization: `JWT ${form.props.token}` },
      });
    } catch (error) {
      form.setErrors(error.response.data);
    }
    form.setSubmitting(false);
  },
});
