import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Calendar(props: any) {
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
        d="M8 2v3M16 2v3M3.5 9.09h17M3 13.01V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5"
        stroke="#726A64"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.995 13.7h.01M8.294 13.7h.01M8.294 16.7h.01"
        stroke="#726A64"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Calendar
