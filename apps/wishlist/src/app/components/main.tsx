import React from 'react'
import { LoginComponent } from './login'
import { useWishlistContext } from './api'
import { MainNavigator } from './navigator'


export const Main = () => {
  const { isLoggedIn } = useWishlistContext()
  return (isLoggedIn) ? <MainNavigator /> : <LoginComponent />
}
