import React from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { IUserState } from "~/store/types/user";
import { IStore } from "~/store";

interface IProps {
  user: IUserState;
}

const mapStateToProps = (state: IStore) => ({
  user: state.user,
});

export const withAuthentication = (Child: React.ComponentType) => {
  const innerFC: React.FC<IProps> = ({ user, ...props }) => {
    React.useEffect(() => {
      if (!user.token) {
        Router.push(`/login`);
      }
    }, [user.token]);
    return <Child {...props} />;
  };
  return connect(mapStateToProps)(innerFC);
};

export const withoutAuthentication = (Child: React.ComponentType) => {
  const innerFC: React.FC<IProps> = ({ user, ...props }) => {
    React.useEffect(() => {
      if (user.token) {
        Router.push(`/`);
      }
    }, [user.token]);
    return <Child {...props} />;
  };
  return connect(mapStateToProps)(innerFC);
};

export default { withAuthentication, withoutAuthentication };
