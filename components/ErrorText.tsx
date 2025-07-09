import { Text, View } from 'react-native'
import React from 'react'

const ErrorText = ({message}: {message: string}) => {


  return (
    <View className='w-full mt-2'>
        <Text className='text-red-500 text-[15px]'>{message}</Text>
    </View>
  )
}

export default ErrorText
