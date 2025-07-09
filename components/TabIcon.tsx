import { Image, ImageSourcePropType, Text, View } from 'react-native';
import React from 'react';

type Props = {
    label: string;
    icon: ImageSourcePropType;
    color: string;
    focused: boolean;
}
const TabIcon = ({label, icon, color, focused}: Props) => {
  return (
    <View className='items-center justify-center gap-1'>
        <Image
            source={icon}
            resizeMode='contain'
            className='w-6 h-6'
            tintColor={color}
        />
      <Text className={`${focused}? 'font-psemibold' : 'font-pregular'`}
      style={{ color: color}}>{label}</Text>
    </View>
  )
}

export default TabIcon
