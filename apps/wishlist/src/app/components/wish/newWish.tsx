import React, { useState } from 'react'
import { Text, Box, VStack, Input, FormControl, KeyboardAvoidingView, Button, ScrollView, HStack, Avatar } from 'native-base'
import { WishBase } from '@wishlist/wishlib'
import { Pressable } from 'react-native'

export const NewWishComponent = ({ route }) => {
  const [wish, setWish] = useState<WishBase>({ name: '' })

  const addImage = () => {
    //
  }
  const save = () => {
    console.log(wish)
  }
  const update = (delta: Partial<WishBase>) => {
    setWish({ ...wish, ...delta })
  }
  return (
    <KeyboardAvoidingView>
      <Box m="5" p="5" bg="white">
        <VStack>
          <FormControl mb="3" isRequired>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              type="text"
              placeholder="name"
              value={wish.name}
              onChangeText={(name) => update({ name })}
            />
          </FormControl>
          <FormControl mb="3">
            <FormControl.Label>Price</FormControl.Label>
            <Input
              type="number"
              placeholder="0"
              value={wish.price?.toString(10)}
              onChangeText={(price) => update({ price: (price) ? parseFloat(price) : undefined })}
            />
          </FormControl>
          <FormControl mb="3">
            <FormControl.Label>Url</FormControl.Label>
            <Input
              type="url"
              placeholder="https://"
              value={wish.url}
              onChangeText={(url) => update({ url })}
            />
          </FormControl>
          <HStack>
            <Pressable onPress={addImage}>
              <Avatar mr="1">+</Avatar>
            </Pressable>
            <ScrollView horizontal>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
              <Avatar mr="1">Img</Avatar>
            </ScrollView>
          </HStack>
          <FormControl mt="3">
            <Button onPress={save}>Save</Button>
          </FormControl>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  )
}
