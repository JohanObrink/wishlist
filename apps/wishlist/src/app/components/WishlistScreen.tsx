import React, { useEffect } from 'react'
import { Heading, Text, VStack, Button } from 'native-base'
import { LoaderComponent, useWishlistContext, useLoader, getWishlist } from '.'

export const WishlistScreen = ({ route, navigation }) => {
  const { id } = route.params
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
  }, [jwt, route, id])
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
        <Button onPress={() => navigation.navigate('NewWish')}>New wish</Button>
      </VStack>
    </LoaderComponent>
  )
}
