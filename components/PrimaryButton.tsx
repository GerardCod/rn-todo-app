import { Text, Pressable } from 'react-native'
import React from 'react'

interface PrimaryButtonProps {
  disabled?: boolean;
  onPress: VoidFunction;
  className?: string
}

export function PrimaryButton({disabled = false, onPress, className}: PrimaryButtonProps) {
  return (
    <Pressable
      className={`${disabled ? 'bg-green-900' : 'bg-green-700'} w-full py-2.5 rounded ${className}`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className={`${disabled ? 'color-green-100' : 'color-green-50'} w-full text-center`}>Enviar</Text>
    </Pressable>
  )
}