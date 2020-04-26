import React from "react";
import { NextPageContext } from "next";
import Router from "next/router";
import Error from "next/error";

const ProfileIndex = ({ userId }) =>
  !userId ? <Error statusCode={404} /> : null;

ProfileIndex.getInitialProps = async (ctx: NextPageContext) => {
  const userId = ctx.store.getState().authentication.user?.id;
  const redirectURL = `/profile/${userId}`;
  if (userId) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: redirectURL });
      ctx.res.end();
    } else {
      Router.push(redirectURL);
    }
  }
  return { userId };
};

export default ProfileIndex;
