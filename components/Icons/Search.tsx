import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Search(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.625 16.313c-4.237 0-7.688-3.45-7.688-7.688 0-4.237 3.45-7.688 7.688-7.688 4.238 0 7.688 3.45 7.688 7.688 0 4.238-3.45 7.688-7.688 7.688zm0-14.25a6.57 6.57 0 00-6.563 6.562 6.57 6.57 0 006.563 6.563 6.57 6.57 0 006.563-6.563 6.57 6.57 0 00-6.563-6.563zM16.5 17.063a.556.556 0 01-.398-.165l-1.5-1.5a.566.566 0 010-.796.566.566 0 01.796 0l1.5 1.5a.566.566 0 010 .796.556.556 0 01-.398.165z"
        fill="#726A64"
      />
    </Svg>
  );
}

export default Search;
