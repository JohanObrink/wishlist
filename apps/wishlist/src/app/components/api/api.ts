import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { User, Wish, Wishlist, WishlistCollection } from '@wishlist/wishlib'
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

const get = async <T>(jwt: string, url: string): Promise<T> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${jwt}`)
  const res = await fetch(url, { headers })
  const data: T = await res.json()
  return data
}

export const getWishlistCollection = async (jwt: string): Promise<WishlistCollection> => (
  get<WishlistCollection>(jwt, `${Config.API_HOST}/api/lists`)
)
export const getWishlist = async (jwt: string, id: string): Promise<Wishlist> => (
  get<Wishlist>(jwt, `${Config.API_HOST}/api/lists/${id}`)
)
export const saveWishlist = async (): Promise<Wishlist> => {
  throw new Error('Not implemented')
}
export const saveWish = async (): Promise<Wish> => {
  throw new Error('Not implemented')
}