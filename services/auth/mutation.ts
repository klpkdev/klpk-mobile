import {useMutation} from '@tanstack/react-query';
import {login, loginGoogle, register, resetPassword} from './api';

export const useLogin = () => {
  return useMutation({
    mutationFn: data => {
      return login(data);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: data => {
      return register(data);
    },
  });
};

export const useLoginGoogle = () => {
  return useMutation({
    mutationFn: data => {
      return loginGoogle(data);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: data => {
      return resetPassword(data);
    },
  });
};
