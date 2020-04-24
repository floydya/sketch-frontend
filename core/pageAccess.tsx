import { NextPageContext } from "next";
import React, { Component, useEffect } from "react";
import Router from "next/router";
import { connect, useSelector } from "react-redux";
import { IStore } from "~/store";

export type AuthProps = {
  token: string;
};

const redirect = {
  private: "/auth/login",
  guest: "/profile",
};

const mapStateToProps = (state: IStore) => ({
  token: state.authentication.access,
});

export function privateRoute(WrappedComponent: any) {
  const _wrappedComponent = (props: AuthProps) => {
    const token = useSelector((state: IStore) => state.authentication.access);
    useEffect(() => {
      if (!token) {
        Router.push(redirect.private);
      }
    }, [token]);
    return <WrappedComponent {...props} />;
  };

  _wrappedComponent.getInitialProps = async (ctx: NextPageContext) => {
    const token = ctx.store.getState().authentication.access;
    if (!token) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: redirect.private });
        ctx.res.end();
      } else {
        Router.push(redirect.private);
      }
    }
    if (WrappedComponent.getInitialProps) {
      return await WrappedComponent.getInitialProps(ctx);
    }
    return {};
  };
  return _wrappedComponent;
}

export function guestRoute(WrappedComponent: any) {
  return connect(mapStateToProps)(
    class extends Component<AuthProps> {
      static async getInitialProps(ctx: NextPageContext) {
        const token = ctx.store.getState().authentication.access;

        if (token) {
          if (ctx.res) {
            ctx.res.writeHead(302, { Location: redirect.guest });
            ctx.res.end();
          } else {
            Router.push(redirect.guest);
          }
        }
        if (WrappedComponent.getInitialProps) {
          return await WrappedComponent.getInitialProps(ctx);
        }
        return {};
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  );
}

export default {
  privateRoute,
  guestRoute,
};
