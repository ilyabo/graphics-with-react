import * as React from 'react'

export default class SvgAnim extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      time: 0,
      animation: null,
    }
  }

  componentDidMount() {
    this.setState({
      animation: requestAnimationFrame(this.tick)
    })
  }

  componentWillUnmount() {
    const { animation } = this.state
    cancelAnimationFrame(animation)
  }


  tick = () => {
    this.setState(({ time }) => ({
      time: time + 1,
      animation: requestAnimationFrame(this.tick)
    }))
  }

  render() {
    const { width, height } = this.props
    const { time } = this.state
    return (
      <svg width={width} height={height}>
        <g transform={`
          rotate(${time},${width/2},${height/2})
          translate(${width/2},${height/2})
        `}>
          <rect
            x={-50} y={-50} width={100} height={100}
            fill="#ccb"
          />
        </g>
      </svg>
    )
  }
}



export const code = `
class SvgAnim extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      time: 0,
      animation: null,
    }
  }

  componentDidMount() {
    this.setState({
      animation: requestAnimationFrame(this.tick)
    })
  }

  componentWillUnmount() {
    const { animation } = this.state
    cancelAnimationFrame(animation)
  }

  tick = () => {
    this.setState(({ time }) => ({
      time: time + 1,
      animation: requestAnimationFrame(this.tick)
    }))
  }

  render() {
    const { width, height } = this.props
    const { time } = this.state
    return (
      <svg width={width} height={height}>
        <g transform={\`
          rotate(\${time},\${width / 2},\${height / 2})
          translate(\${width / 2},\${height / 2})
        \`}>
          <rect
            x={-50} y={-50} width={100} height={100}
            fill="#ccb"
          />
        </g>
      </svg>
    )
  }
}
`