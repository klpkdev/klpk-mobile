import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

function CircleChevron(props: any) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M9 17.063C4.553 17.063.937 13.447.937 9 .938 4.553 4.553.937 9 .937c4.447 0 8.063 3.615 8.063 8.063 0 4.447-3.615 8.063-8.063 8.063zm0-15A6.946 6.946 0 002.062 9 6.946 6.946 0 009 15.938 6.946 6.946 0 0015.938 9 6.946 6.946 0 009 2.062z"
        fill="#726A64"
      />
      <Path
        d="M8.055 12.21a.556.556 0 01-.397-.165.566.566 0 010-.795L9.908 9l-2.25-2.25a.566.566 0 010-.795.566.566 0 01.795 0L11.1 8.602a.566.566 0 010 .796l-2.647 2.647a.556.556 0 01-.398.165z"
        fill="#726A64"
      />
    </Svg>
  )
}

export default CircleChevron
