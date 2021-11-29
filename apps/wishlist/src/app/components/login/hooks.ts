import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { User } from '@wishlist/wishlib'
import { useEffect, useState } from 'react'
import Config from '../../config'

interface GoogleUser extends User {
  name: string
  photo: string
}
interface Auth {
  jwt: string
  user: User
}

export const useGoogleAuth = () => {
  const [user, setUser] = useState<GoogleUser>()
  const [jwt, setJwt] = useState<string>()
  const signin = async () => {
    try {
      const gUser = await GoogleSignin.signIn()
      const {accessToken, idToken} = await GoogleSignin.getTokens()
      const url = `${Config.API_HOST}/api/auth?access_token=${accessToken}&id_token=${idToken}`
      console.log(url)
      const auth = await fetch(url)
      const { jwt, user } = await auth.json() as Auth
      setJwt(jwt)
      setUser({
        ...user,
        name: gUser.user.name,
        photo: gUser.user.photo,
      })
      console.log({
        ...user,
        name: gUser.user.name,
        photo: gUser.user.photo,
      })
    } catch (err) {
      console.log(err)
      switch(err.code) {
        
        case statusCodes.IN_PROGRESS:
          console.log('In progress', err)
          break
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play services not available', err)
          break
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('Sign in cancelled', err)
          break
        case statusCodes.SIGN_IN_REQUIRED:
          console.log('Sign in required', err)
          break
        default:
          console.log('Unknown error', err)
          break
      }
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: Config.GOOGLE_CLIENT_ID_IOS,
      webClientId: Config.GOOGLE_CLIENT_ID_WEB,
      scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    })
  }, [])

  return { signin, user, jwt }
}