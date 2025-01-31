import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Ripple from './Ripple';

interface PrimaryButtonProps {
  disabled?: boolean;
  onPress: VoidFunction;
  className?: string
}

export function PrimaryButton({disabled = false, onPress, className}: PrimaryButtonProps) {
  return (
    <Pressable
      className={`${disabled ? 'bg-green-900' : 'bg-green-700'} w-full rounded-lg ${className}`}
      disabled={disabled}
      onPress={onPress}> 
      <Ripple
        className='w-full h-full justify-center items-center py-2.5'
        style={styles.ripple}
        backgroundColor='#bbf7d0'
        disabled={disabled}>
        <Text
          className={`${disabled ? 'color-green-100' : 'color-green-50'} w-full text-center`}>
          Enviar
        </Text>
      </Ripple>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  ripple: {
    overflow: 'hidden',
  }
});