import React from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { IState as AuthenticationState } from "@floydya/authentication/src/store/types";
import { IStore } from "~/store";

interface IProps {
  authentication: AuthenticationState;
}

const mapStateToProps = (state: IStore) => ({
  authentication: state.authentication,
});

export const withAuthentication = (Child: React.ComponentType) => {
  const innerFC: React.FC<IProps> = ({ authentication, ...props }) => {
    React.useEffect(() => {
      if (!authentication.access) {
        Router.push(`/login`);
      }
    }, [authentication.access]);
    return <Child {...props} />;
  };
  return connect(mapStateToProps)(innerFC);
};

export const withoutAuthentication = (Child: React.ComponentType) => {
  const innerFC: React.FC<IProps> = ({ authentication, ...props }) => {
    React.useEffect(() => {
      if (authentication.access) {
        Router.push(`/`);
      }
    }, [authentication.access]);
    return <Child {...props} />;
  };
  return connect(mapStateToProps)(innerFC);
};

export default { withAuthentication, withoutAuthentication };
