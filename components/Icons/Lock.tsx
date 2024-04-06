import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Lock(props: any) {
  return (
    <Svg width={23} height={24} viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M6.283 10V8c0-3.31.881-6 5.286-6 4.405 0 5.287 2.69 5.287 6v2M11.57 18.5c1.216 0 2.202-1.12 2.202-2.5s-.986-2.5-2.203-2.5c-1.216 0-2.202 1.12-2.202 2.5s.986 2.5 2.202 2.5z"
        stroke="#AF7F3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.975 22h-8.81c-3.525 0-4.406-1-4.406-5v-2c0-4 .881-5 4.405-5h8.81c3.525 0 4.406 1 4.406 5v2c0 4-.881 5-4.405 5z"
        stroke="#AF7F3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Lock
