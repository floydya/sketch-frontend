import React from "react";
import { useRouter } from "next/router";
import { PasswordSetContainer } from "~/modules";
import Head from "next/head";
import { pageAccess } from "~/core";

const ResetPasswordSetPage = () => {
  const {
    query: { token, uid },
  } = useRouter();
  return (
    <React.Fragment>
      <Head>
        <title>Изменение пароля</title>
      </Head>
      <PasswordSetContainer token={token} uid={uid} />
    </React.Fragment>
  );
};

export default pageAccess.guestRoute(ResetPasswordSetPage);
