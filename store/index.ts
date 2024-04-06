import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {ILoginToken, INav} from '../interfaces/login'

interface AuthState extends ILoginToken {
  login: (auth: ILoginToken) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    set => ({
      refreshToken: '',
      token: '',
      expirationDate: '',
      isLogin: false,
      login: (auth: ILoginToken) =>
        set({
          refreshToken: auth.refreshToken,
          token: auth.token,
          expirationDate: auth.expirationDate,
          isLogin: true,
        }),
      logout: () => set({refreshToken: '', token: '', expirationDate: '', isLogin: false}),
    }),
    {
      name: 'auth-state',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

