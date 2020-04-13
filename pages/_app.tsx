import React, { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { Provider } from 'react-redux'
import { Layout } from 'antd'

import Navbar from '~/components/Navbar'
import store, { thunkDispatch } from '~/store'
import { userActions } from '~/store/actions'

import 'antd/dist/antd.css'
import '~/assets/styles/index.scss'
import classes from '~/assets/styles/_app.module.scss'

const { Content, Footer } = Layout

const cookies = new Cookies()

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const token = cookies.get('token')
    if (token) {
      thunkDispatch(userActions.fetchUser())
    }
  }, [])

  return (
    <Provider store={store}>
      <Layout>
        <Navbar />
        <Content className={classes['ant-layout-content']}>
          <div id="breadcrumbs" className={classes.breadcrumbs} />
          <Layout className={classes['ant-layout']}>
            <Content className={classes['inner-layout']}>
              <Component {...pageProps} />
            </Content>
          </Layout>
        </Content>
        <Footer className={classes['ant-layout-footer']}>Footer</Footer>
      </Layout>
    </Provider>
  )
}

// App.getInitialProps = (ctx: { router: { route: string; }; }) => {
//   return {
//     currentRoute: ctx.router.route,
//   };
// };

export default App
