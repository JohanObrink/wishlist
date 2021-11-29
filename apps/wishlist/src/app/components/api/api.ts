import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { User, Wish, Wishlist } from '@wishlist/wishlib'
import Config from '../../config'

export interface GoogleUser extends User {
  name: string
  photo: string
}
interface AuthResult {
  jwt: string
  user: GoogleUser
}

export const login = async (): Promise<AuthResult> => {
  const gUser = await GoogleSignin.signIn()
  const { accessToken, idToken } = await GoogleSignin.getTokens()
  const url = `${Config.API_HOST}/api/auth?access_token=${accessToken}&id_token=${idToken}`
  const auth = await fetch(url)
  const { jwt, user } = await auth.json() as { jwt: string, user: User }

  return {
    jwt,
    user: {
      ...user,
      name: gUser.user.name,
      photo: gUser.user.photo,
    },
  }
}
export const logout = async (): Promise<void> => {
  await GoogleSignin.signOut()
}
export const getWishlists = async (jwt: string): Promise<Wishlist[]> => {
  throw new Error('Not implemented')
}
export const getWishlist = async (): Promise<Wishlist> => {
  throw new Error('Not implemented')
}
export const saveWishlist = async (): Promise<Wishlist> => {
  throw new Error('Not implemented')
}
export const saveWish = async (): Promise<Wish> => {
  throw new Error('Not implemented')
}