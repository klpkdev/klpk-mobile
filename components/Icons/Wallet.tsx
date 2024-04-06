import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Wallet(props: any) {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M22 12.5v5c0 3-2 5-5 5H7c-3 0-5-2-5-5v-5c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h10c.26 0 .51.01.75.05 2.58.3 4.25 2.21 4.25 4.95z"
        stroke="#F9F7EF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.751 7.55c-.24-.04-.49-.05-.75-.05h-10c-.28 0-.55.02-.81.06.14-.28.34-.54.58-.78l3.25-3.26a3.525 3.525 0 014.96 0l1.75 1.77c.64.63.98 1.43 1.02 2.26zM22 13h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3"
        stroke="#F9F7EF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Wallet
