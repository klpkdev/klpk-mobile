import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TopChapter(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.063 6.75v4.5c0 4.072-1.74 5.813-5.813 5.813h-4.5c-4.072 0-5.813-1.74-5.813-5.813v-4.5C.938 2.678 2.678.937 6.75.937h4.5c4.072 0 5.813 1.74 5.813 5.813zm-15 4.5c0 3.457 1.23 4.688 4.687 4.688h4.5c3.457 0 4.688-1.23 4.688-4.688v-4.5c0-3.458-1.23-4.688-4.688-4.688h-4.5c-3.458 0-4.688 1.23-4.688 4.688v4.5z"
        fill="#F9F7EF"
      />
      <Path
        d="M12.21 8.055a.556.556 0 01-.165.398L9.398 11.1a.566.566 0 01-.795 0L5.955 8.453a.566.566 0 010-.795.566.566 0 01.795 0L9 9.907l2.25-2.25a.566.566 0 01.795 0 .532.532 0 01.165.397z"
        fill="#F9F7EF"
      />
    </Svg>
  )
}

export default TopChapter
