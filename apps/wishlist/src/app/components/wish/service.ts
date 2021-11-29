import { Wish } from '@wishlist/wishlib'

export const addWish = async (wish: Partial<Wish>) => {
  const data = new FormData()
  data.append('name', wish.name)
  data.append('price', wish.price?.toString())
  data.append('url', wish.url)
  if (wish.store) {
    data.append('store.name', wish.store.name)
    data.append('store.url', wish.store.url)
  }
}
