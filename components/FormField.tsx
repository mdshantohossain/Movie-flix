import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ErrorText from './ErrorText';
import { icons } from '@/constants';

type Props = {
    label: string;
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    error?: string | false;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'phone-pad' | 'email-address'
}

const FormField = ({label, placeholder, onChangeText, value, error, secureTextEntry, keyboardType}: Props) => {
    const [showPassword, setShowPassword] = useState<boolean | undefined>(secureTextEntry);
    const [isFocused, setIsFocused] = useState<boolean>(false);

     // handle show/hide password
    const handleShowPassword = () => setShowPassword(!showPassword);
    
    return (
   <View className="mb-6">

        <Text className='text-white text-[17px] font-semibold mb-2'>{label}</Text>

           <View className={`bg-black-100 flex-row items-center rounded-2xl ${isFocused ? 'border border-secondary' : 'border border-black-200'}`}>
             <TextInput
                    className="flex-1 text-white text-[17px] px-4 py-4"
                    placeholderTextColor="#7b7b8b"
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={showPassword}
                    onPressOut={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={keyboardType}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                    className='px-3 py-3'
                     onPress={handleShowPassword}
                    >
                      <Image
                            source={showPassword ? icons.eye : icons.eyeHide}
                            className='w-6 h-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
           </View>

        {error && <ErrorText message={error} />}
    </View>
     )
}

export default FormField

const styles = StyleSheet.create({
    icon: {
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        right: 15,
    }
})