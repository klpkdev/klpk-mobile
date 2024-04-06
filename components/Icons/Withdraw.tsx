import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Withdraw(props: any) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M2.167 8.5h12.5M6.167 16.5h2M10.667 16.5h4"
        stroke="#F9F7EF"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.167 14.03v2.08c0 3.51-.89 4.39-4.44 4.39H6.607c-3.55 0-4.44-.88-4.44-4.39V7.89c0-3.51.89-4.39 4.44-4.39h8.06M20.167 9.5v-6l2 2M20.167 3.5l-2 2"
        stroke="#F9F7EF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Withdraw
