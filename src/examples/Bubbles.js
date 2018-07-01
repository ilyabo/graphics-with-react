import * as React from 'react'
import { range } from 'lodash'

const Bubbles = ({ width, height, numPoints }) =>  {
  return (
    <svg
      width={width}
      height={height}
    >
      { range(numPoints).map((point, i) =>
        <circle
          key={i}
          cx={Math.random() * width}
          cy={height - Math.random() * height}
          r={Math.random() * 20}
          fill={`hsl(${0.25 + Math.random() * 0.75}turn 70% 40%)`}
          stroke="#fff"
        />
      )}
    </svg>
  )
}

export default Bubbles

export const code = `
const Bubbles = ({ width, height, numPoints }) =>  {
  return (
    <svg
      width={width}
      height={height}
    >
      { range(numPoints).map((point, i) =>
        <circle
          key={i}
          cx={Math.random() * width}
          cy={height - Math.random() * height}
          r={Math.random() * 20}
          fill={\`hsl(\${0.25 + Math.random() * 0.75}turn 70% 40%)\`}
          stroke="#fff"
        />
      )}
    </svg>
  )
}
`