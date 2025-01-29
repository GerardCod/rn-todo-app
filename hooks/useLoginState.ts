import { Axios } from './../node_modules/axios/index.d';
import { useMemo, useState } from 'react';
import { todoApiBaseUrl, loginEndpoint, HTTP_OK, axiosClient } from '../constants/networking';
import { emailRegex, passwordRegex } from '@/constants/validation';

interface LoginState {
  email: string;
  password: string;
}

export declare type FormLabel = 'email' | 'password' | 'username';

export const useLoginState = () => {
  const [state, setState] = useState<LoginState>({email: '', password: ''});
  
  const isStateValid = useMemo(() => emailRegex.test(state.email) && passwordRegex.test(state.password), [state.email, state.password]);
  
  const handleChangeText = (label: FormLabel, text: string) => {
    setState(prevState => ({...prevState, [label]: text}));
  }

  const submitData = async ({email, password}: LoginState) => {
    const response = await axiosClient.post(loginEndpoint, {username: email, password});
    return response.status === HTTP_OK;
  }

  return {state, isStateValid, handleChangeText, submitData};
}