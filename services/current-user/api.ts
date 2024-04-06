import {IMePayload, IMePayloadAvatar, IMePayloadCover} from '../../interfaces/currentUser'
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const me = () => {
  return fetch.get('/@me')
}

export const UpdateMe = (data: IMePayload) => {
  return fetch.put('/@me', data)
}

export const UpdateMyAvatar = (data: IMePayloadAvatar) => {
  return fetch.post('/@me/avatars', data.file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'cache-control': ' no-cache',
    },
  })
}

export const UpdateMyCover = (data: IMePayloadCover) => {
  return fetch.post('/@me/covers', data.file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'cache-control': ' no-cache',
    },
  })
}

export const deleteUser = () => {
  return fetch.delete('/@me')
}
