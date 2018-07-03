import * as React from 'react'


export default class CanvasLines extends React.PureComponent {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = { time: 0 }
  }
  componentDidMount() {
    this.redraw()
  }
  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { width, height, numLines } = this.props
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < numLines; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * width, Math.random() * height)
      ctx.lineTo(Math.random() * width, Math.random() * height)
      ctx.strokeStyle = `hsl(${0.5+Math.random()*0.5}turn 40% ${90*(i/numLines)}%)`
      ctx.stroke()
    }
  }

  handleClick = () => {
    this.setState(({ time }) => ({ time: time + 1 }))
  }

  render() {
    const { width, height } = this.props
    return (
      <canvas
        onClick={this.handleClick}
        width={width} height={height}
        ref={this.canvasRef}
      />
    )
  }

}

export const code = `
class CanvasLines extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }
  
  render() {
    const { width, height } = this.props
    return (
      <canvas
        width={width} height={height}
        ref={this.canvasRef}
      />
    )
  }
  
  componentDidMount() { 
    this.redraw() 
  }
  
  componentDidUpdate() { 
    this.redraw() 
  }

  redraw() {
    const { width, height, numLines } = this.props
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < numLines; i++) {
      ctx.beginPath()
      ctx.moveTo(
        Math.random() * width, 
        Math.random() * height
      )
      ctx.lineTo(
        Math.random() * width, 
        Math.random() * height
      )
      ctx.strokeStyle = \`hsl(
        \${Math.random()}turn 40% \${100 * (i / numLines)}%
      )\`
      ctx.stroke()
    }
  }
}  
`