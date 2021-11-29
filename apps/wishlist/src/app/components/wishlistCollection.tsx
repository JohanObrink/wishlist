import React from 'react'
import { VStack, ScrollView, HStack, Heading } from 'native-base'
import { useEffect } from 'react'
import { useLoader, useWishlistContext } from '.'
import { getWishlistCollection, LoaderComponent } from './api'
import { WishlistComponent } from './wishlist'

export const WishlistCollectionComponent = () => {
  const { jwt } = useWishlistContext()
  const {
    result,
    load,
    ...loaderProps
  } = useLoader((jwt: string) => getWishlistCollection(jwt), { mine: [], others: [] })

  useEffect(() => {
    if (!jwt) return
    load(jwt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])

  return (
    <LoaderComponent {...loaderProps} reload={() => load(jwt)}>
      <ScrollView>
        { result.mine.map((list) => (
          <VStack key={list._id}>
            <HStack>
              <WishlistComponent id={list._id} />
            </HStack>
          </VStack>
        ))}
      </ScrollView>
    </LoaderComponent>
  )
}
