import { View, SafeAreaView, Text, TextInput, Button, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLoginState } from '@/hooks/useLoginState';
import { Link, useRouter } from 'expo-router';
import Alert from '@/components/Alert';

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
        <Text className='mb-2 pl-2 text-sm'>Correo electrónico</Text>
        <TextInput
          className='mb-4 py-2 px-2 border border-green-700 rounded'
          value={state.email}
          style={{marginBottom: 8}}
          onChangeText={text => handleChangeText('email', text)}
        />
        <Text className='mb-2 pl-2 text-sm'>Contraseña</Text>
        <TextInput
          className='mb-4 py-2 px-2 border border-green-700 rounded'
          value={state.password}
          onChangeText={text => handleChangeText('password', text)}
          secureTextEntry={isSecure}
          style={{marginBottom: 20}}
        />
        <Pressable
          className='bg-green-700 w-full py-2.5 rounded mb-6'
          disabled={!isStateValid}
          onPress={() => handleSubmit()}
        >
          <Text className='w-full text-center color-green-50'>Enviar</Text>
        </Pressable>
        <Text className='text-center mb-2'>¿Aún no tienes cuenta?</Text>
        <Link href={'./signup'}>
          <Pressable className='w-full'>
            <Text>Crear cuenta</Text>
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