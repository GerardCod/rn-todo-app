import { Axios } from './../node_modules/axios/index.d';
import { useMemo, useState } from 'react';
import { todoApiBaseUrl, loginEndpoint, HTTP_OK } from '../constants/networking';

interface LoginState {
  email: string;
  password: string;
}

declare type LoginLabel = 'email' | 'password'

export const useLoginState = () => {
  const [state, setState] = useState<LoginState>({email: '', password: ''});
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{10,}$/;
  
  const isStateValid = useMemo(() => emailRegex.test(state.email) && passwordRegex.test(state.password), [state.email, state.password]);
  
  const axiosClient = new Axios({
    baseURL: todoApiBaseUrl,
    timeout: 3000
  });

  const handleChangeText = (label: LoginLabel, text: string) => {
    setState(prevState => ({...prevState, [label]: text}));
  }

  const submitData = async ({email, password}: LoginState) => {
    const response = await axiosClient.post(loginEndpoint, {username: email, password});
    return response.status === HTTP_OK;
  }

  return {state, isStateValid, handleChangeText, submitData};
}