import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { WishlistCollectionComponent } from './wishlistCollection'
import { WishlistComponent } from './wishlist'
import { NewWishComponent, WishComponent } from '.'

// const Stack = createStackNavigator()
const Stack = createNativeStackNavigator()

export const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Collection" component={WishlistCollectionComponent} />
      <Stack.Screen name="Wishlist" component={WishlistComponent} />
      <Stack.Screen name="Wish" component={WishComponent} />
      <Stack.Screen name="NewWish" component={NewWishComponent} />
    </Stack.Navigator>
  </NavigationContainer>
)
