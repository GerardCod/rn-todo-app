import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Ripple from './Ripple';

interface OutlinedButtonProps {
  message: string;
  onPress?: VoidFunction
  className?: string;
}

export function OutlinedButton({message, onPress, className}: OutlinedButtonProps) {
  return (
    <Pressable
      className={`w-full border border-green-700 rounded-lg ${className}`}
      onPress={onPress}
    >
      <Ripple 
        className='w-full h-full justify-center items-center py-2.5'
        style={styles.ripple}
        backgroundColor='#15803d'>
        <Text className='color-green-700 w-full text-center'>{message}</Text>
      </Ripple>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  ripple: {
    overflow: 'hidden',
  }
});