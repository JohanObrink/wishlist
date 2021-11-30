import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { User, Wish, WishBase, Wishlist, WishlistCollection } from '@wishlist/wishlib'
import { Config, GoogleUser } from './'

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

const request = async <T>(jwt: string, url: string, init: RequestInit = {}): Promise<T> => {
  if (!init.headers) init.headers = {}
  init.headers['Content-Type'] = 'application/json'
  init.headers['Authorization'] = `Bearer ${jwt}`

  const res = await fetch(url, init)
  const data: T = await res.json()
  return data
}
const get = async <T>(jwt: string, url: string): Promise<T> => {
  return request<T>(jwt, url)
}
const post = async <T>(jwt: string, url: string, init: RequestInit = {}): Promise<T> => {
  init.method = 'POST'
  return request<T>(jwt, url, init)
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
export const saveWish = async (jwt: string, listId: string, wish: WishBase): Promise<Wish> => {
  const formData = new FormData()
  formData.append('name', wish.name)
  formData.append('price', wish.price?.toString(10))
  formData.append('url', wish.url)

  const init: RequestInit = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  }

  return post<Wish>(jwt, `${Config.API_HOST}/api/lists/${listId}/`, init)
}
