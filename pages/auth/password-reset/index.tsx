import React from "react";
import { PasswordResetContainer } from "~/modules";
import Head from "next/head";
import { pageAccess } from "~/core";

const ForgotPasswordPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Восстановление пароля</title>
      </Head>
      <PasswordResetContainer />
    </React.Fragment>
  );
};

export default pageAccess.guestRoute(ForgotPasswordPage);
