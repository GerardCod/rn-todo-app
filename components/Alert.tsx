import React from 'react'
import { View } from 'react-native';

interface AlertProps {
  message: string;
  isVisible: boolean;
  label: string;
  handleClose: VoidFunction;
}

export function Alert({message, label, isVisible, handleClose}: AlertProps) {
  return (
    <View></View>
  )
}