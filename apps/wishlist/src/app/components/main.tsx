import React from 'react'
import { LoginComponent } from './login'
import { useWishlistContext } from './api'
import { WishlistCollectionComponent } from './wishlistCollection'


export const Main = () => {
  const { isLoggedIn } = useWishlistContext()
  return (isLoggedIn) ? <WishlistCollectionComponent /> : <LoginComponent />
}
