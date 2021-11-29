import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import Config from '../../config'
import * as api from './api'


interface IWishlistContext {
  isLoggedIn: boolean
  login: () => Promise<api.GoogleUser>
  logout: () => Promise<void>
  jwt?: string
  user?: api.GoogleUser
}
const WishlistContext = createContext<IWishlistContext>(null)

// eslint-disable-next-line @typescript-eslint/ban-types
export const WishlistProvider = ({ children }: PropsWithChildren<{}>) => {
  const login = async () => {
    const { jwt, user } = await api.login()
    setContext({
      ...context,
      isLoggedIn: true,
      jwt,
      user,
    })
    return user
  }

  const logout = async () => {
    console.log('log out')
    await api.logout()
    setContext({
      ...context,
      isLoggedIn: false,
      jwt: undefined,
      user: undefined,
    })
    console.log('logged out')
  }

  const [context, setContext] = useState<IWishlistContext>({
    isLoggedIn: false,
    login,
    logout,
  })

  // Initialize Google Signin
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: Config.GOOGLE_CLIENT_ID_IOS,
      webClientId: Config.GOOGLE_CLIENT_ID_WEB,
      scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    })
  }, [])
  return (
    <WishlistContext.Provider value={context}>
      { children }
    </WishlistContext.Provider>
  )
}

export const useWishlistContext = () => useContext(WishlistContext)
