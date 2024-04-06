import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Gallery(props: any) {
  return (
    <Svg width={49} height={48} viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M5.66 38.02l-.04.04c-.54-1.18-.88-2.52-1.02-4 .14 1.46.52 2.78 1.06 3.96zM18.5 20.76a4.76 4.76 0 100-9.52 4.76 4.76 0 000 9.52z"
        fill="#726A64"
      />
      <Path
        d="M32.88 4H16.12C8.84 4 4.5 8.34 4.5 15.62v16.76c0 2.18.38 4.08 1.12 5.68 1.72 3.8 5.4 5.94 10.5 5.94h16.76c7.28 0 11.62-4.34 11.62-11.62V15.62C44.5 8.34 40.16 4 32.88 4zm8.36 21c-1.56-1.34-4.08-1.34-5.64 0l-8.32 7.14c-1.56 1.34-4.08 1.34-5.64 0l-.68-.56c-1.42-1.24-3.68-1.36-5.28-.28L8.2 36.32c-.44-1.12-.7-2.42-.7-3.94V15.62C7.5 9.98 10.48 7 16.12 7h16.76c5.64 0 8.62 2.98 8.62 8.62v9.6l-.26-.22z"
        fill="#726A64"
      />
    </Svg>
  )
}

export default Gallery
