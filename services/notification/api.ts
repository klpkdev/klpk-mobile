import {INotifications} from '../../interfaces/notifications';
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getNotification = () => {
  return fetch.get(`/notifications`);
};

export const getNotificationWithParams = (params: INotifications) => {
  return fetch.get(`/notifications`, {params});
};
