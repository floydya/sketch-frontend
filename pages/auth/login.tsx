import React from 'react'
import Head from 'next/head'
import { LoginForm } from '~/modules'
import { pageAccess } from '~/core'

const LoginPage = () => (
  <React.Fragment>
    <Head>
      <title>Авторизация</title>
    </Head>
    <LoginForm />
  </React.Fragment>
)

export default pageAccess.guestRoute(LoginPage)
