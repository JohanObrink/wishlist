import React from 'react'
import { LoginComponent, MainNavigator, useWishlistContext } from '.'


export const Main = () => {
  const { isLoggedIn } = useWishlistContext()
  return (isLoggedIn) ? <MainNavigator /> : <LoginComponent />
}
