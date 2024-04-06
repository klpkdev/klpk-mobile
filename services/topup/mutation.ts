import {useMutation} from '@tanstack/react-query';
import {purchaseIap, topups} from './api';

export const useTopups = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return topups(data);
    },
  });
};

export const usePurchaseIap = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return purchaseIap(data);
    },
  });
};
