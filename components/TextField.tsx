import { View, Text, TextInput } from 'react-native'
import React, { ReactElement } from 'react'

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isSecureText?: boolean;
  right?: ReactElement;
}

export function TextField({label, value, isSecureText = false, onChangeText, right}: TextFieldProps) {
  return (
    <View className='mb-3'>
      <Text className='mb-2 pl-2 text-xs font-poppins-medium'>{label}</Text>
      <View className='border border-green-700 rounded'>
        <TextInput
          className='py-2 px-2'
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecureText}
        />
        {
          right &&
          <View className='absolute right-3 h-full justify-center items-center'>
            {right}
          </View>
        }
      </View>
      {}
    </View>
  )
}