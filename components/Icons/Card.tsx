import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Card(props: any) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M2 8.5h20M6 16.5h2M10.5 16.5h4"
        stroke="#AF7F3E"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 14.99v1.12c0 3.51-.89 4.39-4.44 4.39H6.44C2.89 20.5 2 19.62 2 16.11V7.89c0-3.51.89-4.39 4.44-4.39h11.11c3.56 0 4.45.88 4.45 4.39v3.09"
        stroke="#AF7F3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Card
