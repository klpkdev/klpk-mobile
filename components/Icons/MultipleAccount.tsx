import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MultipleAccount(props: any) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.106 7.747h-.053a.362.362 0 00-.12 0C4 7.687 2.54 6.167 2.54 4.293A3.465 3.465 0 016 .833a3.465 3.465 0 013.46 3.46 3.448 3.448 0 01-3.334 3.454h-.02zM6 1.833a2.467 2.467 0 00-2.46 2.46 2.442 2.442 0 002.366 2.454 1.11 1.11 0 01.214 0 2.456 2.456 0 002.34-2.454A2.467 2.467 0 006 1.833zM11.027 7.833c-.02 0-.04 0-.06-.006-.274.026-.554-.167-.58-.44-.027-.274.14-.52.413-.554.08-.006.166-.006.24-.006a1.83 1.83 0 001.733-1.834c0-1.013-.82-1.833-1.833-1.833a.494.494 0 01-.5-.493c0-.274.226-.5.5-.5A2.84 2.84 0 0113.773 5c0 1.533-1.2 2.773-2.726 2.833h-.02zM6.113 15.033c-1.307 0-2.62-.333-3.613-1-.927-.613-1.434-1.453-1.434-2.366 0-.914.507-1.76 1.434-2.38 2-1.327 5.24-1.327 7.226 0 .92.613 1.434 1.453 1.434 2.366 0 .914-.507 1.76-1.434 2.38-1 .667-2.306 1-3.613 1zm-3.06-4.906c-.64.426-.987.973-.987 1.546 0 .567.354 1.114.987 1.534 1.66 1.113 4.46 1.113 6.12 0 .64-.427.987-.974.987-1.547 0-.567-.354-1.113-.987-1.533-1.66-1.107-4.46-1.107-6.12 0zM12.226 13.833a.492.492 0 01-.486-.4.507.507 0 01.386-.593 2.7 2.7 0 001.107-.487c.38-.286.587-.646.587-1.026s-.207-.74-.58-1.02c-.294-.227-.66-.387-1.094-.487a.504.504 0 01-.38-.6.504.504 0 01.6-.38 3.721 3.721 0 011.48.667c.62.466.974 1.126.974 1.82 0 .693-.36 1.353-.98 1.826a3.61 3.61 0 01-1.507.667c-.04.013-.073.013-.107.013z"
        fill="#F9F7EF"
      />
    </Svg>
  )
}

export default MultipleAccount
