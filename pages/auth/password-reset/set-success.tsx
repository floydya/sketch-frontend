import React from "react";
import Head from "next/head";
import { PasswordSetSuccess } from "~/modules";
import { pageAccess } from "~/core";

const SetPasswordSuccessPage = () => (
  <React.Fragment>
    <Head>
      <title>Восстановление пароля</title>
    </Head>
    <PasswordSetSuccess />
  </React.Fragment>
);

export default pageAccess.guestRoute(SetPasswordSuccessPage);
