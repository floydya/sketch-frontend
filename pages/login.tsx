import React from "react";
import Head from "next/head";
import {LoginForm} from "~/modules";

export default () => (
  <React.Fragment>
    <Head>
      <title>Авторизация</title>
    </Head>
    <LoginForm />
  </React.Fragment>
);
