import * as React from 'react'
import { range } from 'lodash'
import { css } from 'react-emotion'
import { pure } from 'recompose'

const SvgBubbles = ({ width, height, numPoints }) =>
  <svg
    width={width}
    height={height}
  >
    { range(numPoints).map((point, i) =>
      <circle
        key={i}
        cx={Math.random() * width}
        cy={height - Math.random() * height}
        r={Math.random() * 50}
        fill={`hsl(${Math.random()}turn 70% 40%)`}
        className={css({
          stroke: '#fff',
          '&:hover': {
            stroke: 'orange',
            strokeWidth: 6,
          }
        })}
        onClick={alert}
      />
    )}
  </svg>

export default (SvgBubbles)

export const code = `
const SvgBubbles = ({ width, height, numPoints }) =>
  <svg width={width} height={height}>
    { range(numPoints).map((point, i) =>
      <circle key={i}
        cx={Math.random() * width} 
        cy={Math.random() * height}
        r={Math.random() * 20}
        fill={\`hsl(\${Math.random()}turn 70% 40%)\`}
        className={css({
          stroke: '#fff',
          '&:hover': {
            stroke: 'orange',
            strokeWidth: 6,
          }
        })}
        onClick={alert}
      />
    )}
  </svg>
  
`