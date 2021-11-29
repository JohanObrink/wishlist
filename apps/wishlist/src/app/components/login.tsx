import React from 'react'
import { Avatar, HStack, Heading } from 'native-base'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { useWishlistContext } from './api'

export const LoginComponent = () => {
  const { login, logout, user } = useWishlistContext()
  return (
    <>
      { !user && <GoogleSigninButton onPress={login} /> }
      { user && (
        <HStack alignItems="center" justifyContent="center" onTouchEnd={logout}>
          <Avatar source={{ uri: user.photo }} />
          <Heading>{ user.name }</Heading>
        </HStack>
      )}
    </>
  )
}
