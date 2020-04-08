import React from "react";
import Head from "next/head";
import {RegisterForm} from "~/modules";

export default () => (
  <React.Fragment>
    <Head>
      <title>Регистрация</title>
    </Head>
    <RegisterForm />
  </React.Fragment>
);
