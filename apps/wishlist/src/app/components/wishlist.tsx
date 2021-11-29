import React from 'react'
import { Heading, Text, VStack } from 'native-base'
import { useEffect } from 'react'
import { LoaderComponent, useWishlistContext, useLoader, getWishlist } from './api'

interface WishlistProps {
  id: string
}
export const WishlistComponent = ({ id }: WishlistProps) => {
  const { jwt } = useWishlistContext()
  const {
    result,
    load,
    ...loaderProps
  } = useLoader((jwt: string, id: string) => getWishlist(jwt, id), { mine: [], others: [] })

  useEffect(() => {
    if (!jwt || !id) return
    load(jwt, id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, id])
  return (
    <LoaderComponent {...loaderProps} reload={() => load(jwt, id)}>
      <VStack>
        <Heading>{ result.name }</Heading>
        <VStack>
          {result.givers?.map((g) => (
            <Text key={g.id}>{ g.name }</Text>
          ))}
        </VStack>
        <VStack>
          {result.wishes?.map((w) => (
            <Text key={w._id}>{ w.name }</Text>
          ))}
        </VStack>
      </VStack>
    </LoaderComponent>
  )
}
