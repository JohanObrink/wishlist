import React from 'react'
import { NativeBaseProvider, Box } from 'native-base'
import { LoginComponent } from './components'
import { WishlistProvider } from './components/api/context'

const App = () => {
  return (
    <NativeBaseProvider>
      <WishlistProvider>
        <Box safeArea>
          <LoginComponent />
        </Box>
      </WishlistProvider>
    </NativeBaseProvider>
  )
}

export default App
