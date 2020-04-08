import React from "react";
import Head from "next/head";
import { LoginForm } from "~/modules";
import { privateRoute } from "~/core";

const LoginPage = () => (
  <React.Fragment>
    <Head>
      <title>Авторизация</title>
    </Head>
    <LoginForm />
  </React.Fragment>
);

export default privateRoute.withoutAuthentication(LoginPage);
