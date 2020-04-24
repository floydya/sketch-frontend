import { withFormik } from "formik";
import { ProfileComponent } from "../components";
import { IStore } from "~/store";
import { connect } from "react-redux";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import toPairs from "lodash/toPairs";
import fromPairs from "lodash/fromPairs";
import { axios } from "~/core";
import moment from "moment";
import { message } from "antd";

type UserType = {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone_number?: string;
  gender?: string;
  birth_date?: string | moment.Moment;
};

interface IProps {
  user: UserType;
  token: string;
}

export default connect((state: IStore) => ({
  user: state.authentication.user,
  token: state.authentication.access,
}))(
  withFormik<IProps, UserType>({
    mapPropsToValues: (props) => ({...props.user, birth_date: moment(props.user?.birth_date) || null}),
    handleSubmit: async (values, form) => {
      const formData: UserType = fromPairs(
        differenceWith(toPairs(values), toPairs(form.props.user), isEqual)
      );
      if (Object.keys(formData).length) {
        if (formData.birth_date)
          Object.assign(formData, {
            birth_date: (formData.birth_date as moment.Moment).format("YYYY-MM-DD"),
          });
        try {
          await axios.patch(`/auth/users/me/`, formData, {
            headers: { Authorization: `JWT ${form.props.token}` },
          });
          await message.success("Профиль успешно обновлен!")
        } catch (err) {
          form.setErrors(err.response.data);
        }
      }
    },
  })(ProfileComponent)
);
