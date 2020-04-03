import * as React from 'react';

function SvgNeuron(props) {
  return (
    <svg viewBox="0 0 14.98 15.23" {...props}>
      <g data-name="Layer 2">
        <path
          d="M7.49 0A7.55 7.55 0 000 7.61a7.55 7.55 0 007.49 7.62A7.55 7.55 0 0015 7.61 7.55 7.55 0 007.49 0zm4.57 3.85a5.56 5.56 0 01-2.06.86c-.51.12-1 .2-1.53.32s-1.06.23-1.18.6a1.52 1.52 0 011.16 2.43 5.34 5.34 0 01-.45.39c-.13.15-.09.18 0 .39s0 .33.07.49.08.47.12.71a1.93 1.93 0 00.15.72 1.15 1.15 0 00.4.39c.24.18.49.36.75.53a3.61 3.61 0 01.68.44c.29.36-.29.65-.65.43-.08-.05-.1-.15-.17-.21a3.83 3.83 0 00-.42-.28c-.26-.17-.52-.35-.76-.54v1.79c0 .28.19 1.11-.37 1.09-.19 0-.43-.16-.44-.33s.09-.17.1-.27a1.77 1.77 0 000-.4c0-.58 0-1.16-.05-1.75-.32.21-.89.57-1 .93-.05.18.08.2-.15.36a.52.52 0 01-.51.09c-.74-.34.8-1.54 1.12-1.74s.58-.37.6-.73a3.2 3.2 0 00-.12-.87c0-.21 0-.92-.18-1s-.37 0-.49-.08a1.56 1.56 0 01-.43-.21 1.54 1.54 0 01-.5-1.86c.16-.34.52-.51.71-.79a.68.68 0 000-.83c-.25-.23-.63-.34-.89-.58a2.56 2.56 0 01-.64-1 4.16 4.16 0 01-.23-1.13 2.11 2.11 0 00-.09-.45.32.32 0 010-.35c.25-.3.62-.07.73.18a2.8 2.8 0 01.1.91 2.09 2.09 0 001 1.68c.49-.69 1.6-.84 2.05-1.53a1.32 1.32 0 00.18-.78.38.38 0 01.59-.31c.59.4-.19 1.52-.58 1.82A8.24 8.24 0 017.62 4a1.94 1.94 0 00-.45.35c-.15.22 0 .2.11.42 1.32-.58 2.92-.54 4.15-1.27.22-.13.45-.35.73-.16s.09.38-.1.51z"
          fill={props.fill}
          data-name="Layer 1"
        />
      </g>
    </svg>
  );
}

export default SvgNeuron;