import {HttpTransportType, HubConnectionBuilder} from '@microsoft/signalr';
import React, {createContext, useEffect, useState} from 'react';
import {useAuth} from '../store';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../constant';

export const NotificationContext = createContext({
  connection: {
    on: (str: string, data: any) => {},
    invoke: (str: string, data: any) => {},
  },
  notifications: {notifications: [], unreadCount: 0},
});

export const useNotification = () => {
  const {notifications} = React.useContext(NotificationContext);
  return {notifications};
};

export const NotificationContextProvider = (props: any) => {
  let connection = {} as any;
  const token = useAuth(state => state.token);
  const [notificationsLocal, setNotificationsLocal] = useState<any>();

  useEffect(() => {
    if (token) {
      connection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/notification-hub`, {
          accessTokenFactory: () => token,
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .build();

      async function start() {
        try {
          await connection.start();
          // console.log('SignalR Connected.');
        } catch (err) {
          setTimeout(start, 5000);
        }
      }

      connection.on('LoadNotifications', (data: any) => {
        setNotificationsLocal(data);
      });

      connection.on('ReceiveNotification', (notification: any) => {
        const temp = [...notificationsLocal.notifications];
        temp.push(notification);
        setNotificationsLocal({...notificationsLocal, notifications: temp});
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: notification?.title,
          autoHide: false,
          onPress: () => Toast.hide(),
        });
      });

      start();
    }
  }, [token]);

  return (
    <NotificationContext.Provider
      value={{
        connection,
        notifications: notificationsLocal,
      }}>
      {props.children}
    </NotificationContext.Provider>
  );
};
