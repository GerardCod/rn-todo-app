import { emailRegex, passwordRegex } from '@/constants/validation';
import { useMemo, useState } from 'react';
import { FormLabel } from './useLoginState';
import { axiosClient, HTTP_OK, signUpEndpoint } from '@/constants/networking';

interface SignUpState {
  username: string;
  email: string;
  password: string;
}

interface UserResponseDto {
  id: string;
  name: string;
  username: string;
}

interface SignUpResponse {
  user: UserResponseDto;
  token: string;
}

export const useSignUpState = () => {
  const [state, setState] = useState<SignUpState>({username: '', email: '', password: ''});
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const validateUserName = (username: string) => username.trim().length >= 5;

  const isStateValid = useMemo(() => validateUserName(state.username) && emailRegex.test(state.email) && passwordRegex.test(state.password), 
    [state.username, state.email, state.password]);

  const handleChangeText = (label: FormLabel, text: string) => {
    setState(prevState => ({...prevState, [label]: text}));
  }

  const handleSubmit = async () => {
    const {username, email, password} = state;

    const response = await axiosClient.post<SignUpResponse>(signUpEndpoint, {name: username, username: email, password});
    if (response.status != HTTP_OK) {
      throw Error('Error creando el usuario');
    }

    return response.data;
  }

  const toggleSecureText = () => {
    setIsSecure(!isSecure);
  }
  
  return {state, isStateValid, isSecure, handleChangeText, handleSubmit, toggleSecureText};
}