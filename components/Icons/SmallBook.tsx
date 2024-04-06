import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function SmallBook(props: any) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M14.667 11.16V3.113c0-.8-.654-1.393-1.447-1.326h-.04c-1.4.12-3.527.833-4.713 1.58l-.114.073a.739.739 0 01-.706 0l-.167-.1C6.293 2.6 4.173 1.893 2.773 1.78a1.312 1.312 0 00-1.44 1.327v8.053c0 .64.52 1.24 1.16 1.32l.194.027c1.446.193 3.68.926 4.96 1.626l.026.014c.18.1.467.1.64 0 1.28-.707 3.52-1.447 4.974-1.64l.22-.027c.64-.08 1.16-.68 1.16-1.32zM8 3.66v10M5.167 5.66h-1.5M5.667 7.66h-2"
        stroke="#F9F7EF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SmallBook
