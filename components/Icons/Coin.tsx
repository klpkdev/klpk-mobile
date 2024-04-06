import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Coin(props: any) {
  return (
    <Svg
      width={12}
      height={13}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={6} cy={6.91174} r={6} fill="#D6B16D" />
      <Circle cx={5.99999} cy={6.91176} r={5.07692} fill="#F6D706" />
      <Path
        d="M8.77 8.627l-.99-.967a3.23 3.23 0 01-.634.451 1.576 1.576 0 01-.734.161c-.23 0-.438-.039-.623-.118a1.52 1.52 0 01-.79-.85 1.9 1.9 0 01-.1-.623V6.66c0-.216.033-.416.1-.603.074-.193.174-.362.3-.505.134-.143.286-.254.456-.333.178-.086.375-.13.59-.13.304 0 .556.058.756.173.208.114.408.268.6.462l1.035-1.075a3.139 3.139 0 00-.979-.71c-.37-.172-.838-.258-1.401-.258-.46 0-.882.079-1.268.237a3.024 3.024 0 00-.979.645 2.979 2.979 0 00-.878 2.118v.022a2.933 2.933 0 00.878 2.107c.275.265.6.477.979.634.386.158.8.237 1.246.237.593 0 1.075-.097 1.445-.29.371-.201.701-.455.99-.764z"
        fill="#D6B16D"
      />
    </Svg>
  )
}

export default Coin