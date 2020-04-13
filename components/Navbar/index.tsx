import React from 'react'
import Link from 'next/link'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import classes from './Navbar.module.scss'
import { IStore } from '~/store'
import { userActions } from '~/store/actions'
import { IUserState } from '~/store/types/user'
import UserDropdown from './UserDropdown'
import classNames from 'classnames'

const { Header } = Layout

interface INavbar {
  user: IUserState
  logoutUser: () => void
}

const Navbar: React.FC<INavbar> = ({ user, logoutUser }) => {
  return (
    <Header className={classNames(classes.header, 'ant-menu', 'ant-menu-dark')}>
      <Link href="/">
        <a>
          <div className={classes.logo} />
        </a>
      </Link>
      <div className={classes.navbarSpace} />
      {user.user ? (
        <UserDropdown user={user.user} logout={logoutUser} />
      ) : (
        <React.Fragment>
          <Link href="/login">
            <a className="ant-menu-item">Вход</a>
          </Link>
          <Link href="/register">
            <a className={classNames('ant-menu-item', classes.registerButton)}>
              Регистрация
            </a>
          </Link>
        </React.Fragment>
      )}
    </Header>
  )
}

export default connect(
  (state: IStore) => ({
    user: state.user,
  }),
  (dispatch) => ({ logoutUser: () => dispatch(userActions.removeToken()) })
)(Navbar)
