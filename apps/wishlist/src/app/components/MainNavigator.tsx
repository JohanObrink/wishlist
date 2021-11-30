import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NewWishScreen,
  WishScreen,
  WishlistCollectionScreen,
  WishlistScreen,
  NewWishlistScreen,
} from '.'

const Stack = createNativeStackNavigator()

export const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Collection" component={WishlistCollectionScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="NewWishlist" component={NewWishlistScreen} />
      <Stack.Screen name="Wish" component={WishScreen} />
      <Stack.Screen name="NewWish" component={NewWishScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)
