import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Topup(props: any) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M12.167 16V8M15.157 12h1.01M8.167 12h3.81M12.167 16V8M4.167 6c-1.25 1.67-2 3.75-2 6 0 5.52 4.48 10 10 10s10-4.48 10-10-4.48-10-10-10c-1.43 0-2.8.3-4.03.85"
        stroke="#F9F7EF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Topup
