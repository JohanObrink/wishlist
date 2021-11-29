import React from 'react'
import { Avatar, HStack, Heading } from 'native-base'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { useGoogleAuth } from './hooks'

export const LoginComponent = () => {
  const { signin, user } = useGoogleAuth()
  return (
    <>
      { !user && <GoogleSigninButton onPress={signin} /> }
      { user && (
        <HStack alignItems="center" justifyContent="center">
          <Avatar source={{ uri: user.photo }} />
          <Heading>{ user.name }</Heading>
        </HStack>
      )}
    </>
  )
}
