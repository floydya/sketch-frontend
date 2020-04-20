import React from "react";
import { axios } from "~/core";
import { NextPage, NextPageContext } from "next";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

interface IProps {
  user: any;
}

const Profile: NextPage<IProps> = ({ user }) => {
  if (!user) return null;
  return <div>{user.email}</div>;
};

// Profile.getInitialProps = async (ctx: NextPageContext): Promise<IProps> => {
//   const id = parseInt(ctx.query.id.toString());
//   const accessToken = cookies.get("access");
//   try {
//     const user = await axios.get(`/auth/users/${id}/`, {
//       headers: {
//         Authorization: `JWT ${accessToken}`,
//       },
//     });
//     return { user };
//   } catch (err) {
//     console.log(err);
//     return { user: null };
//   }
// };

export default Profile;
