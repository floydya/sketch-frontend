import React from "react";
import Head from "next/head";
import { PasswordResetSuccess } from "~/modules";
import { pageAccess } from "~/core";

const PasswordResetSuccessPage = () => (
  <React.Fragment>
    <Head>
      <title>Восстановление пароля</title>
    </Head>
    <PasswordResetSuccess />
  </React.Fragment>
);

export default pageAccess.guestRoute(PasswordResetSuccessPage);
