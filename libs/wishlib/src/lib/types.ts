export interface DateTagged {
  created: Date
  modified: Date
}

export interface User extends DateTagged {
  email: string
}

interface WishlistBase extends DateTagged {
  _id?: string
  name: string
  due: string
}

export interface Wishlist extends WishlistBase {
  owner: string
  givers: Giver[]
  wishes: Wish[]
}

export interface WishlistLite extends WishlistBase {
  givers: number
  wishes: number
}

export interface WishlistCollection {
  mine: WishlistLite[]
  others: WishlistLite[]
}

export interface Giver {
  id: string
  name: string
}

export interface WishBase {
  name: string
  price?: number
  url?: string
  store?: Store
}

export interface Wish extends WishBase, DateTagged {
  _id?: string
  images: Image[]
}

export interface Store {
  name: string
  url?: string
}

export interface Image extends DateTagged {
  url: string
}
