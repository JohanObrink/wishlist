import React, { createContext, PropsWithChildren, useContext } from 'react'

const WishlistContext = createContext({})

export const WishlistProvider = ({ children }: PropsWithChildren<never>) => {
  return (
    <WishlistContext.Provider value={{}}>
      { children }
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
