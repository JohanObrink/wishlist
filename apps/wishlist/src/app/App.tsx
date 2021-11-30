import React from 'react'
import { NativeBaseProvider, Box } from 'native-base'
import { Main, WishlistProvider } from './components'

const App = () => {
  return (
    <NativeBaseProvider>
      <WishlistProvider>
        <Main />
      </WishlistProvider>
    </NativeBaseProvider>
  )
}

export default App
