import React from 'react'
import { Portal, Snackbar } from 'react-native-paper'

interface AlertProps {
  message: string;
  isVisible: boolean;
  label: string;
  handleClose: VoidFunction;
}

export default function Alert({message, label, isVisible, handleClose}: AlertProps) {
  return (
    <Portal>
      <Snackbar
        visible={isVisible}
        onDismiss={handleClose}
        action={{
          label
        }}
        style={{
          backgroundColor: '#F44336'
        }}
      >{message}</Snackbar>
    </Portal>
  )
}