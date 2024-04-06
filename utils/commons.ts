import Toast from 'react-native-toast-message'

export const onError = (error: any) => {
  if (error?.response) {
    Toast.show({
      type: 'error',
      text1: 'Terjadi Kesalahan',
      text2: error?.response?.data?.errorMessage,
      autoHide: true,
      visibilityTime: 4000,
      onPress: () => Toast.hide(),
    })
  }
}

export const alertSuccess = (message: string) => {
  Toast.show({
    type: 'success',
    text1: 'Berhasil',
    text2: message,
    visibilityTime: 4000,
  })
}

export const alertError = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Terjadi Kesalahan',
    text2: message,
    visibilityTime: 4000,
  })
}

export const formatNumberWithK = (number: number): string => {
  if (number > 1000000) {
    return (number / 1000000) + 'juta'
  } else if (number >= 1000) {
    return (number / 1000) + 'rb'
  }
  return number.toString()
}

export const formatRupiah = (amount: number): string => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
  return formatter.format(amount)
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
}

export const checkByteSize = (byte: number) => {
  var megabyte = byte / (1024 * 1024);

  if (megabyte > 2) {
    return true;
  } else {
    return false;
  }
}

export function createNotificationTitle(type: string) {
  let title = ''
  if (type.toLocaleLowerCase().includes('book')) {
    title = 'Buku'
  } else if (type.toLocaleLowerCase().includes('topup')) {
    title = 'Topup'
  } else {
    title = 'Pesan'
  }
  return title
}