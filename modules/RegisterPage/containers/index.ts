import { default as RegisterForm } from '../components/RegisterForm'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { axios } from '~/core'
import Router from 'next/router'

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  re_password: Yup.string()
    .required()
    .min(6)
    .test('password-match', "Password doesn't matches", function (value) {
      const { password } = this.parent
      return password === value
    }),
})

type Values = Yup.InferType<typeof registerSchema>

const initialValues: Values = {
  email: '',
  password: '',
  re_password: '',
}

export default withFormik({
  mapPropsToValues: () => initialValues,
  handleSubmit: async (values, form) => {
    try {
      await axios.post(`/auth/users/`, values)
      await Router.replace(`/auth/register/success`, `/auth/register`)
    } catch (error) {
      form.setErrors(error.response.data)
    }
    form.setSubmitting(false)
  },
  validationSchema: registerSchema,
})(RegisterForm)
