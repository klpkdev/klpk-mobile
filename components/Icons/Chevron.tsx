import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Chevron(props: any) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <Path
        fill="#fff"
        d="M13.418 7.859a.695.695 0 01.978 0 .68.68 0 010 .969l-3.908 3.83a.697.697 0 01-.979 0l-3.908-3.83a.68.68 0 010-.969.695.695 0 01.978 0L10 11l3.418-3.141z"
      />
    </Svg>
  )
}

export default Chevron
