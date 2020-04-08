import React from "react";
import Head from "next/head";
import { RegisterForm } from "~/modules";
import { privateRoute } from "~/core";

const RegisterPage = () => (
  <React.Fragment>
    <Head>
      <title>Регистрация</title>
    </Head>
    <RegisterForm />
  </React.Fragment>
);

export default privateRoute.withoutAuthentication(RegisterPage);
