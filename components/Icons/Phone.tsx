import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Phone(props: any) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M15 22.75H9c-4.41 0-5.75-1.34-5.75-5.75V7c0-4.41 1.34-5.75 5.75-5.75h6c4.41 0 5.75 1.34 5.75 5.75v10c0 4.41-1.34 5.75-5.75 5.75zm-6-20c-3.58 0-4.25.68-4.25 4.25v10c0 3.57.67 4.25 4.25 4.25h6c3.58 0 4.25-.68 4.25-4.25V7c0-3.57-.67-4.25-4.25-4.25H9z"
        fill="#AF7F3E"
      />
      <Path
        d="M14 6.25h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75zM12 19.86a2.3 2.3 0 110-4.6 2.3 2.3 0 010 4.6zm0-3.11c-.44 0-.8.36-.8.8 0 .44.36.8.8.8.44 0 .8-.36.8-.8 0-.44-.36-.8-.8-.8z"
        fill="#AF7F3E"
      />
    </Svg>
  )
}

export default Phone
