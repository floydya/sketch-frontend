import React from 'react';
import { useRouter } from 'next/router'
import { axios } from '~/core';

const Profile = () => {
  const {query: {username}} = useRouter()

  return (
    <div>
      {username}
    </div>
  );
}

Profile.getInitialProps = async (ctx) => {
  await axios.get(``)
  return {username: ctx.query.username};
}

export default Profile;
