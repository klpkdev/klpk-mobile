import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Bank(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.63 5.75c-.35.14-.63.56-.63.93V10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V6.68c0-.37-.28-.79-.63-.93l-9-3.6c-.2-.08-.54-.08-.74 0L6.79 4.09M22 22H2v-3c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v3zM4 18v-7M8 18v-7M12 18v-7M16 18v-7M20 18v-7M1 22h22"
        stroke="#AF7F3E"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="#AF7F3E"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Bank
