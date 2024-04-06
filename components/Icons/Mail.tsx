import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'

function Mail(props: any) {
  return (
    <Svg width={19} height={13} viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x={1} y={1} width={17} height={12} rx={1} fill="#AF7F3E" />
      <Path
        d="M9.723 7.416l.294.196.283-.212 7.28-5.46-.3-.4.3.4c.615-.461.289-1.44-.48-1.44H1.99C1.2.5.889 1.527 1.548 1.966l8.176 5.45z"
        fill="#AF7F3E"
        stroke="#2B2937"
      />
    </Svg>
  )
}

export default Mail
