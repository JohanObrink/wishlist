import { Wish } from '@wishlist/wishlib'
import { Heading, HStack, Image, ScrollView, Text, VStack } from 'native-base'
import React from 'react'

interface WishComponentProps {
  wish: Wish
}
export const WishComponent = ({ wish }: WishComponentProps) => (
  <VStack>
    <Heading>{ wish.name }</Heading>
    <Text>{ wish.price }</Text>
    <Text>{ wish.store }</Text>
    <ScrollView horizontal>
      <HStack>
        { wish.images.map((img) => (
          <Image source={{ uri: img.url }} />
        )) }
      </HStack>
    </ScrollView>
  </VStack>
)

export default WishComponent
