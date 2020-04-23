import React from "react";
import Head from "next/head";
import { ActivateUserContainer } from "~/modules";
import { pageAccess } from "~/core";

const ActivateUserPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Активация пользователя</title>
      </Head>
      <ActivateUserContainer />
    </React.Fragment>
  );
};

export default pageAccess.guestRoute(ActivateUserPage);
