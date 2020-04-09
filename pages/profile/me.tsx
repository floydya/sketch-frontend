import React from "react";
import Router from "next/router";
import Error from "next/error";
import { IStore } from "~/store";
import { connect } from "react-redux";


const Profile = ({user}) => {
  if (user?.user?.username) {
    Router.replace(`/profile/${user.user.username}`);
    return null;
  } else {
    return <Error statusCode={404} />
  }
}

export default connect((state: IStore) => ({user: state.user}))(Profile);
