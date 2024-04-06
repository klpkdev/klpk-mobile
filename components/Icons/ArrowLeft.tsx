import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowLeft(props: any) {
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
        d="M9.57 18.82c.19 0 .38-.07.53-.22.29-.29.29-.77 0-1.06L4.56 12l5.54-5.54c.29-.29.29-.77 0-1.06a.754.754 0 00-1.06 0l-6.07 6.07c-.29.29-.29.77 0 1.06l6.07 6.07c.15.15.34.22.53.22z"
        fill="#F9F7EF"
      />
      <Path
        d="M3.67 12.75H20.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H3.67c-.41 0-.75.34-.75.75s.34.75.75.75z"
        fill="#F9F7EF"
      />
    </Svg>
  )
}

export default ArrowLeft
