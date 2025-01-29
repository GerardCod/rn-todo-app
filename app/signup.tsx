import { View, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSignUpState } from '@/hooks/useSignUpState'
import { Button, Text, TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'
import Alert from '@/components/Alert'

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
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <Text variant='bodyMedium' style={{...styles.instruction, ...styles.centeredText}}>Ingresa tus datos para comenzar con tus rutinas.</Text>
        <TextInput 
          label={'Nombre de usuario'}
          value={state.username}
          mode='outlined'
          style={styles.inputTextGap}
          onChangeText={text => handleChangeText('username', text)}
        />
        <TextInput 
          label={'Correo electrónico'}
          value={state.email}
          mode='outlined'
          style={styles.inputTextGap}
          onChangeText={text => handleChangeText('email', text)}
        />
        <TextInput 
          label={'Contraseña'}
          value={state.password}
          mode='outlined'
          secureTextEntry={isSecure}
          style={styles.inputTextGap}
          onChangeText={text => handleChangeText('password', text)}
          right={<TextInput.Icon icon={isSecure ? 'eye' : 'eye-off'} onPress={toggleSecureText} />}
        />
        <Button mode='contained' disabled={!isStateValid} onPress={submit}>Crear cuenta</Button>
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontWeight: 'bold',
  },
  centeredText: {
    textAlign: 'center'
  },
  headerContainer: {
    marginBottom: 36,
  },
  instruction: {
    marginBottom: 8,
    fontWeight: 'bold'
  },
  inputTextGap: {
    marginBottom: 8,
  }
});