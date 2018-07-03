import React from 'react'

import { Spring, animated as a } from 'react-spring'

const TRIANGLE = 'M20,380 L380,380 L380,380 L200,20 L20,380 Z'
const RECTANGLE = 'M20,20 L20,380 L380,380 L380,20 L20,20 Z'

export default
class SvgSpringAnim extends React.Component {
  state = { toggle: true }
  handleClick = () => {
    this.setState(({ toggle }) => ({ toggle: !toggle }))
  }
  render() {
    const { width, height } = this.props
    const { toggle } = this.state
    return (
      <Spring
        native
        from={{ fill: 'black' }}
        to={{
          fill: toggle ? '#247BA0' : '#70C1B3',
          shape: toggle ? TRIANGLE : RECTANGLE
        }}
        toggle={toggle}
      >
        {({ toggle, fill, shape }) =>
          <a.svg
            style={{ fill }}
            viewBox="0 0 400 400"
            width={width} height={height}
          >
            <g onClick={this.handleClick}>
              <a.path d={shape} />
            </g>
          </a.svg>
        }
      </Spring>
    )
  }
}


export const code = `
import { Spring, animated as a } from 'react-spring'

const TRIANGLE = 'M20,380 L380,380 L380,380 L200,20 L20,380 Z'
const RECTANGLE = 'M20,20 L20,380 L380,380 L380,20 L20,20 Z'

class SvgSpringAnim extends React.Component {
  state = { toggle: true }
  handleClick = () => {
    this.setState(({ toggle }) => ({ toggle: !toggle }))
  }
  render() {
    const { width, height } = this.props
    const { toggle } = this.state
    return (
      <Spring
        native
        from={{ fill: 'black' }}
        to={{
          fill: toggle ? '#247BA0' : '#70C1B3',
          shape: toggle ? TRIANGLE : RECTANGLE
        }}
        toggle={toggle}
      >
        {({ toggle, fill, shape }) =>
          <a.svg
            style={{ fill }}
            viewBox="0 0 400 400"
            width={width} height={height}
          >
            <g onClick={this.handleClick}>
              <a.path d={shape} />
            </g>
          </a.svg>
        }
      </Spring>
  }
}

`