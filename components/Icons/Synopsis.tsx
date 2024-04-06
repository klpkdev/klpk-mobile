import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Synopsis(props : any) {
  return (
    <Svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.397 2.637v7.15c0 .425-.294.957-.656 1.182L8.566 13.58c-.407.25-1.044.225-1.425-.062L2.828 10.28c-.306-.231-.556-.731-.556-1.112V2.637c0-1.093 1.2-1.756 2.131-1.18l2.769 1.73c.369.232.969.232 1.337 0l2.769-1.73c.919-.576 2.119.093 2.119 1.18z"
        stroke="#D6B16D"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Synopsis
