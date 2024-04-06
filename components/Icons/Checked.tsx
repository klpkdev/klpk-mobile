import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

interface IProps {
  width?: number
  height?: number
  xmlns?: string
}

const Checked: React.FC<IProps> = ({width = 13, height = 12, ...props}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M6.222 1c-2.755 0-5 2.245-5 5s2.245 5 5 5 5-2.245 5-5-2.245-5-5-5zm2.39 3.85L5.777 7.685a.375.375 0 01-.53 0L3.832 6.27a.377.377 0 010-.53.377.377 0 01.53 0l1.15 1.15 2.57-2.57a.377.377 0 01.53 0 .377.377 0 010 .53z"
        fill="#00C008"
      />
    </Svg>
  )
}

export default Checked
