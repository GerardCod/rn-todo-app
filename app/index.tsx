import { View, SafeAreaView, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLoginState } from '@/hooks/useLoginState';
import { Link, useRouter } from 'expo-router';
import { Alert, TextField } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function LoginScreen() {
  const {state, isStateValid, handleChangeText, submitData} = useLoginState();
  const [isSecure, setIsSecure] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const result = await submitData(state);
    
    if (!result) {
      setIsVisible(true);
      return;
    }

    router.replace('./tasks');
  }

  return (
    <SafeAreaView className='flex h-screen px-4 justify-center align-middle'>
      <View className='mb-9'>
        <Text className='font-poppins-black text-2xl text-center'>ToTrack</Text>
        <Text className='font-poppins-medium text-base text-center'>Una app sencilla para crear tus rutinas diarias</Text>
      </View>
      <View>
        <Text className='font-poppins-light text-base text-center mb-3'>Ingresa tus credenciales</Text>
        <TextField
          label='Correo electrónico'
          value={state.email}
          onChangeText={text => handleChangeText('email', text)}
        />
        <TextField 
          label='Contraseña'
          value={state.password}
          onChangeText={text => handleChangeText('password', text)}
          isSecureText={isSecure}
          right={
            <Ionicons name={isSecure ? 'eye' : 'eye-off'} onPress={() => setIsSecure(!isSecure)} />
          }
        />
        <PrimaryButton
          className='mb-8'
          disabled={!isStateValid}
          onPress={() => handleSubmit()}
        />
        <Text className='text-center mb-2'>¿Aún no tienes cuenta?</Text>
        <Link href={'./signup'}>
          <Pressable className='w-full py-2.5 border border-green-700 rounded'>
            <Text className='color-green-700 w-full text-center'>Crear cuenta</Text>
          </Pressable>
        </Link>  
      </View>
      <Alert
        isVisible={isVisible}
        label='Cerrar'
        message='Error con el servidor. Intente más tarde.'
        handleClose={() => setIsVisible(false)}
      />
    </SafeAreaView>
  )
}