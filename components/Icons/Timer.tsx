import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Timer(props: any) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M8.695 7.835L6.675 6H5.32L3.3 7.835a1.8 1.8 0 00-.475 2.005c.275.705.945 1.16 1.7 1.16H7.47a1.81 1.81 0 001.7-1.16 1.8 1.8 0 00-.475-2.005zM6.91 9.07H5.09a.34.34 0 01-.34-.34c0-.185.155-.34.34-.34h1.82c.19 0 .34.155.34.34 0 .185-.155.34-.34.34zM9.175 2.16A1.815 1.815 0 007.475 1h-2.95a1.815 1.815 0 00-1.22 3.165L5.325 6H6.68L8.7 4.165c.56-.51.745-1.295.475-2.005zM6.91 3.615H5.09a.34.34 0 01-.34-.34c0-.185.155-.34.34-.34h1.82c.19 0 .34.155.34.34 0 .185-.155.34-.34.34z"
        fill="#D6B16D"
      />
    </Svg>
  )
}

export default Timer
