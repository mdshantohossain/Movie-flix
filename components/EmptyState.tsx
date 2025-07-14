import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import Button from './Button'
import { router } from 'expo-router'

const EmptyState = ({title, subTitle}: {title: string, subTitle: string}) => {



  return (
    <View className='justify-center items-center px-4'>
        <Image
            source={images.empty}
            className='w-[270px] h-[215px]'
            resizeMode='contain'
        />
        <Text className='font-pmedium text-sm text-gray-200'>{subTitle}</Text>
        <Text className='text-xl font-psemibold text-white mt-2'>{title}</Text>

        <Button
            label="Create video"
            onPress={() => router.push('/create')}
            containerStyles="w-full py-3 mt-5"
        />
    </View>
  )
}

export default EmptyState