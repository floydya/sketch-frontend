import React from "react";
import { Layout } from "antd";
import withRedux from "next-redux-wrapper";
import Navbar from "~/components/Navbar";
import makeStore, { authenticationActions, IStore } from "~/store";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import "antd/dist/antd.css";
import "~/assets/styles/index.scss";
import classes from "~/assets/styles/_app.module.scss";
import { Provider } from "react-redux";
import { basicActions, thunkActions } from "@floydya/authentication";
import { Dispatch } from "@floydya/authentication/src/store/types";
import jwt_decode from "jwt-decode";
import { NextPageContext } from "next";
import { ThunkDispatch } from "redux-thunk";

const { Content, Footer } = Layout;

const App = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Navbar />
        <Content className={classes["ant-layout-content"]}>
          <div id="breadcrumbs" className={classes.breadcrumbs} />
          <Layout className={classes["ant-layout"]}>
            <Content className={classes["inner-layout"]}>
              <Component {...pageProps} />
            </Content>
          </Layout>
        </Content>
        <Footer className={classes["ant-layout-footer"]}>Footer</Footer>
      </Layout>
    </Provider>
  );
};

const logoutCookie = (ctx: NextPageContext) => {
  destroyCookie(ctx, "access");
  destroyCookie(ctx, "refresh");
};

App.getInitialProps = async ({ Component, ctx }) => {
  const cookies = parseCookies(ctx);
  try {
    const accessToken: { user_id: number; exp: number } = jwt_decode(
      cookies.access
    );
    const refreshToken: { user_id: number; exp: number } = jwt_decode(
      cookies.refresh
    );
    if (new Date() < new Date(refreshToken.exp * 1000)) {
      await ctx.store.dispatch((dispatch: Dispatch) =>
        dispatch(
          basicActions.setToken({
            access: cookies.access,
            refresh: cookies.refresh,
          })
        )
      );
      if (new Date() < new Date(accessToken.exp * 1000)) {
        await ctx.store.dispatch((dispatch: Dispatch) =>
          dispatch(authenticationActions.fetchUser(cookies.access)).then(
            () => true,
            () => {
              logoutCookie(ctx);
              dispatch(thunkActions.logout());
            }
          )
        );
      } else {
        console.log("2 refresh");
        await ctx.store.dispatch((dispatch: Dispatch) =>
          dispatch(authenticationActions.refresh()).then(
            () => dispatch(authenticationActions.fetchUser()),
            () => {
              logoutCookie(ctx);
              dispatch(thunkActions.logout());
            }
          )
        );
      }
    } else {
      console.log("00000");
      logoutCookie(ctx);
      await ctx.store.dispatch((dispatch: Dispatch) =>
        dispatch(thunkActions.logout())
      );
    }
  } catch (error) {
    logoutCookie(ctx);
    await ctx.store.dispatch((dispatch: Dispatch) =>
      dispatch(thunkActions.logout())
    );
  }
  if (Component.getInitialProps) return await Component.getInitialProps(ctx);
  return { store: ctx.store };
};

export default withRedux(makeStore)(App);
