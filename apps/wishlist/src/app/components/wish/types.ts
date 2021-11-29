import { WishBase } from '@wishlist/wishlib'

export interface UploadImage {
  name: string
}

export interface UploadWish extends WishBase {
  images: UploadImage[]
}
