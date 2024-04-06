import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function Book(props: any) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M4.125 18V7c0-4 1-5 5-5h7c4 0 5 1 5 5v10c0 .14 0 .28-.01.42"
        stroke={props?.color ?? '#726A64'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.975 15h14.15v3.5c0 1.93-1.57 3.5-3.5 3.5h-10c-1.93 0-3.5-1.57-3.5-3.5v-.65c0-1.57 1.28-2.85 2.85-2.85zM8.625 7h8M8.625 10.5h5"
        stroke={props?.color ?? '#726A64'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Book
