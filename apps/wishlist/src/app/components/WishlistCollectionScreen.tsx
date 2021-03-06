import React, { useEffect } from 'react'
import {
  Heading,
  Text,
  FlatList,
  HStack,
  Divider,
  Box,
  ChevronRightIcon,
  VStack,
  Avatar,
  Button,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Wishlist } from '@wishlist/wishlib'
import {
  getWishlistCollection,
  useLoader,
  useWishlistContext,
  LoaderComponent,
} from '.'

interface WishlistItemProps {
  item: Wishlist
}
const WishlistItem = ({ item }: WishlistItemProps) => {
  const { navigate } = useNavigation()
  return (
    <Box
      onTouchStart={() => navigate('Wishlist', { id: item._id })}
      borderBottomWidth="1"
      p="4"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <HStack>
          <Avatar>24/12</Avatar>
          <VStack mx="5">
            <Heading>{ item.name }</Heading>
            <HStack>
              <HStack>
                <Text>{ item.wishes }</Text>
              </HStack>
              <HStack>
                <Text>{ item.givers }</Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
        <ChevronRightIcon />
      </HStack>
    </Box>
  )
}

export const WishlistCollectionScreen = () => {
  const { navigate } = useNavigation()
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
      <FlatList
        data={result.mine}
        keyExtractor={(item) => item._id}
        renderItem={(props) => <WishlistItem {...props} />}
        ItemSeparatorComponent={Divider}
      />
      <Button onPress={() => navigate('NewWishlist')}>New Wishlist</Button>
    </LoaderComponent>
  )
}

export default WishlistCollectionScreen
