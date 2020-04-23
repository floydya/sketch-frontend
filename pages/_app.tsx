import React from "react";
import { Layout } from "antd";
import withRedux from "next-redux-wrapper";
import Navbar from "~/components/Navbar";
import makeStore, { authenticationActions } from "~/store";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import "antd/dist/antd.css";
import "~/assets/styles/index.scss";
import classes from "~/assets/styles/_app.module.scss";
import { Provider } from "react-redux";
import { basicActions } from "@floydya/authentication";
import { Dispatch } from "@floydya/authentication/src/store/types";

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

App.getInitialProps = async ({ Component, ctx }) => {
  const cookies = parseCookies(ctx);
  if (cookies.access) {
    await ctx.store.dispatch(async (dispatch: Dispatch) => {
      dispatch(
        basicActions.setToken({
          access: cookies.access,
          refresh: cookies.refresh,
        })
      );
      return await dispatch(authenticationActions.verify(cookies.access))
        .then(
          () => cookies.access,
          async () =>
            await dispatch(authenticationActions.refresh(cookies.refresh))
        )
        .then(
          async () =>
            await dispatch(authenticationActions.fetchUser()).then(() => {
              setCookie(
                ctx,
                "access",
                ctx.store.getState().authentication.access,
                {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                }
              );
            }),
          () => {
            destroyCookie(ctx, "access");
            destroyCookie(ctx, "refresh");
          }
        );
    });
  }
  if (Component.getInitialProps) return await Component.getInitialProps(ctx);
  return { store: ctx.store };
};

export default withRedux(makeStore)(App);
