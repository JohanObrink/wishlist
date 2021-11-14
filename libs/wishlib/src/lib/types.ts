export interface DateTagged {
  created: Date
  modified: Date
}

export interface Wishlist extends DateTagged {
  id: string
  name: string
  due: Date
  owner: string
  givers: Giver[]
  wishes: Wish[]
}

export interface Giver {
  id: string
  name: string
}

export interface Wish extends DateTagged {
  id: string
  name: string
  price?: number
  url?: string
  store?: Store
  images: Image[]
}

export interface Store {
  name: string
  url?: string
}

export interface Image extends DateTagged {
  id: string
  url: string
}
