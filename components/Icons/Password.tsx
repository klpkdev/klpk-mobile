import * as React from 'react'
import Svg, {Path, Circle} from 'react-native-svg'

function Password(props: any) {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M0 9a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H3a3 3 0 01-3-3V9z" fill="#AF7F3E" />
      <Path
        d="M5 6c0-2 .5-5 4-5s4 3 4 5"
        stroke="#AF7F3E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={9} cy={12} r={1.5} fill="#AF7F3E" stroke="#2B2937" />
      <Path d="M9 15v-3" stroke="#2B2937" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default Password
