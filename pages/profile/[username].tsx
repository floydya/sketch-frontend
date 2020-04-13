import React from "react";
import { axios } from "~/core";
import { NextPage, NextPageContext } from "next";

interface IProps {
  username: string | string[];
}

const Profile: NextPage<IProps> = ({ username }) => {
  return <div>{username}</div>;
};

Profile.getInitialProps = async (ctx: NextPageContext): Promise<IProps> => {
  // await axios.get(``)
  return { username: ctx.query.username };
};

export default Profile;
