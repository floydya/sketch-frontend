import React from "react";
import { Upload, message, Avatar, Button } from "antd";
import { connect } from "react-redux";
import { authenticationActions, IStore } from "~/store";
import { ThunkDispatch } from "redux-thunk";
import { ActionType } from "@floydya/authentication/store/types";
import { UploadOutlined } from "@ant-design/icons";
import { axios, base64encode } from "~/core";

import classes from "./AvatarUpload.module.less";
import FormItem from "antd/lib/form/FormItem";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const AvatarUpload = ({ user, fetchUser, token }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleChange = React.useCallback(
    async (info) => {
      if (info.file.status === "uploading") {
        setIsLoading(true);
      }
      if (info.file.status === "done") {
        setIsLoading(false);
        fetchUser();
      }
    },
    [fetchUser]
  );
  const handleUpload = React.useCallback(async (file) => {
    const avatar = await base64encode(file);
    await axios.patch(
      `/auth/users/me/`,
      { avatar },
      { headers: { Authorization: `JWT ${token}` } }
    );
    return avatar;
  }, []);
  return (
    <FormItem label="Аватар" style={{ marginLeft: "48px" }}>
      <div className={classes.avatarContainer}>
        <Avatar size={144} src={user?.avatar} className={classes.avatar}>
          {user?.email?.charAt(0)}
        </Avatar>
        <Upload
          name="avatar"
          showUploadList={false}
          action={handleUpload}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <Button loading={isLoading} icon={<UploadOutlined />}>
            Загрузить
          </Button>
        </Upload>
      </div>
    </FormItem>
  );
};

export default connect(
  (state: IStore) => ({ token: state.authentication.access }),
  (dispatch: ThunkDispatch<IStore, undefined, ActionType>) => ({
    fetchUser: () => dispatch(authenticationActions.fetchUser()),
  })
)(AvatarUpload);
