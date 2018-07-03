import * as React from 'react'

export default class CanvasAnim extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      time: 0
    }
  }

  componentDidMount() {
    this.redraw()
    requestAnimationFrame(this.tick)
  }

  tick = () => {
    this.setState(({ time }) => ({ time: time + 1 }))
    requestAnimationFrame(this.tick)
  }

  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { width, height } = this.props
    const { time } = this.state
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.translate(width/2, height/2)
    ctx.rotate(time * 0.01)
    ctx.fillStyle = '#5ba'
    ctx.fillRect(-80, -80, 160, 160)
    ctx.rotate(-time * 0.03)
    ctx.fillStyle = '#eeb'
    ctx.fillRect(-40, -40, 80, 80)
    ctx.restore()
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
}



export const code = `
class CanvasAnim extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      time: 0
    }
  }

  componentDidMount() {
    this.redraw()
    requestAnimationFrame(this.tick)
  }

  tick = () => {
    this.setState(({ time }) => ({ time: time + 1 }))
    requestAnimationFrame(this.tick)
  }

  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { width, height } = this.props
    const { time } = this.state
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.translate(width/2, height/2)
    ctx.rotate(time * 0.01)
    ctx.fillStyle = '#5ba'
    ctx.fillRect(-80, -80, 160, 160)
    ctx.rotate(-time * 0.03)
    ctx.fillStyle = '#eeb'
    ctx.fillRect(-40, -40, 80, 80)
    ctx.restore()
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
}
`