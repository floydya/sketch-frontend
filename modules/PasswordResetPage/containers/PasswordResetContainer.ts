import { withFormik } from "formik";
import { PasswordResetForm } from "../components";
import * as Yup from "yup";
import { axios } from "~/core";
import Router from "next/router";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const initialValues = {
  email: "",
};

export default withFormik({
  mapPropsToValues: () => initialValues,
  handleSubmit: async (values, form) => {
    try {
      await axios.post(`/auth/users/reset_password/`, values);
      await Router.replace(
        `/auth/password-reset/success?${values.email}`,
        `/auth/password-reset`
      );
    } catch (error) {
      form.setErrors(error.response.data);
    }
    form.setSubmitting(false);
  },
  validationSchema,
})(PasswordResetForm);
