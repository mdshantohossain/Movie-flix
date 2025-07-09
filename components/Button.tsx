import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
    label: string,
    onPress?: () => void,
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean
}

const Button = ({label, onPress, containerStyles, textStyles, isLoading}: Props) => {


  return (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`bg-secondary-200 rounded-xl items-center justify-center ${isLoading && 'opacity-50'} ${containerStyles}`}
        disabled={isLoading}
  >
        { isLoading ? (
            <ActivityIndicator color="#000" size="small" />
        ) : (
            <Text className={`text-primary text-lg font-psemibold ${textStyles}`}>{label}</Text>
        )} 
    </TouchableOpacity>
  )
}
  
export default Button 