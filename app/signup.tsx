import { View, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSignUpState } from '@/hooks/useSignUpState'
import { useRouter } from 'expo-router'

export default function SignUpScreen() {
  const {state, isStateValid, isSecure, handleChangeText, handleSubmit, toggleSecureText} = useSignUpState()
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  const submit = async () => {
    try {
      const response = await handleSubmit();
      
      router.replace('./tasks');
    } catch (error) { 
      setIsVisible(true);
      return;
    }
  }

  return (
    <SafeAreaView>
      
    </SafeAreaView>
  )
}
