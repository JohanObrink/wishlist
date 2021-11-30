import React from 'react'
import { Box } from 'native-base'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { useWishlistContext } from './'

export const LoginComponent = () => {
  const { login, logout, user } = useWishlistContext()
  return (
    <Box safeArea>
      <GoogleSigninButton onPress={login} />
    </Box>
  )
}
