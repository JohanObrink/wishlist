import React from 'react'
import { Button, Spinner, Text, VStack } from 'native-base'
import { PropsWithChildren } from 'react'

interface LoaderProps {
  isLoading: boolean
  isLoaded: boolean
  error?: Error
  reload: () => void
}
export const LoaderComponent = ({ children, isLoaded, isLoading, error, reload }: PropsWithChildren<LoaderProps>) => (
  (isLoaded) ? (
    <VStack>
      { isLoading && <Spinner /> }
      { children }
    </VStack>
  ) : (
    <VStack>
      { isLoading && <Spinner /> }
      { !isLoading && <Button onPress={reload}>Retry</Button> }
      { error && <Text>{ error.message }</Text> }
    </VStack>
  )
)

export default LoaderComponent
