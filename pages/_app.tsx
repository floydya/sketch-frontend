import React, { useEffect } from "react";
import { Layout } from "antd";
import Navbar from "~/components/Navbar";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import classes from "~/assets/styles/_app.module.scss";
import store, { thunkDispatch } from "~/store";
import { userActions } from "~/store/actions";

const { Content, Footer } = Layout;

const App = ({ Component, pageProps, currentRoute }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(userActions.setToken(token));
      thunkDispatch(userActions.fetchUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Navbar currentRoute={currentRoute} />
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

App.getInitialProps = (ctx: { router: { route: string; }; }) => {
  return {
    currentRoute: ctx.router.route,
  };
};

export default App;
