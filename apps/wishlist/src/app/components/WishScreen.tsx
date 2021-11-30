import { Wish } from '@wishlist/wishlib'
import { Heading, HStack, Image, ScrollView, Text, VStack } from 'native-base'
import React from 'react'

interface WishScreenProps {
  wish: Wish
}
export const WishScreen = ({ wish }: WishScreenProps) => (
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

export default WishScreen
