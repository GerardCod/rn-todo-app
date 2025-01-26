import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Text, TextInput, Button, Portal, Snackbar } from 'react-native-paper';
import React, { useState } from 'react'
import { useLoginState } from '@/hooks/useLoginState';
import { Link, useRouter } from 'expo-router';

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
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text variant='headlineMedium' style={{...styles.centeredText, ...styles.title}}>Bienvenido a ToTrack</Text>
        <Text variant='bodyLarge' style={styles.centeredText}>Una app sencilla para crear tus rutinas diarias</Text>
      </View>
      <View>
        <Text variant='bodyMedium' style={{...styles.instruction, ...styles.centeredText}}>Ingresa tus datos para ingresar</Text>
        <TextInput 
          label={'Correo electrónico'}
          value={state.email}
          mode='outlined'
          style={{marginBottom: 8}}
          onChangeText={text => handleChangeText('email', text)}
        />
        <TextInput
          label={'Contraseña'}
          value={state.password}
          onChangeText={text => handleChangeText('password', text)}
          mode='outlined'
          secureTextEntry={isSecure}
          style={{marginBottom: 20}}
          right={<TextInput.Icon icon={isSecure ? 'eye' : 'eye-off'} onPress={() => setIsSecure(!isSecure)} />}
        />
        <Button 
          mode='contained' 
          disabled={!isStateValid}
          onPress={() => handleSubmit()} 
          style={{marginBottom: 36}}>
            Ingresar
        </Button>
        <Text variant='bodyMedium' style={{...styles.centeredText, marginBottom: 8}}>¿Aún no tienes cuenta?</Text>
        <Link href={'./signup'}>
          <Button mode='outlined' style={{width: '100%'}}>Crear cuenta</Button>
        </Link>  
      </View>
      <Portal>
        <Snackbar
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          action={{
            label: 'Cerrar'
          }}
          style={{
            backgroundColor: '#F44336',
          }}
        >
          Error con el servidor. Intente más tarde
        </Snackbar>
      </Portal>
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
  }
});