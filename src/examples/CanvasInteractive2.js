import * as React from 'react'
import { findDOMNode } from 'react-dom'
import rbush from 'rbush'
import { last } from 'lodash'


class Rectangles extends React.PureComponent {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.redraw()
  }

  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { width, height, objects } = this.props
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1
    for (const { minX, minY, maxX, maxY, color } of objects) {
      ctx.fillStyle = color
      ctx.fillRect(minX, minY, maxX - minX, maxY - minY)
      ctx.strokeRect(minX, minY, maxX - minX, maxY - minY)
    }
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


export default class CanvasInteractive extends React.PureComponent {

  constructor(props) {
    super(props)
    const objects = this.generateObjects()
    this.state = {
      hoverObject: null,
      objects,
    }
    this.tree = rbush()
    this.tree.load(objects)
  }

  generateObjects() {
    const { width, height, numObjects } = this.props
    const objects = []
    for (let i = 0; i < numObjects; i++) {
      const minX = Math.random() * width
      const minY = Math.random() * height
      const maxX = minX + Math.random() * width / 10
      const maxY = minY + Math.random() * height / 10
      const color = `hsl(${0.2+Math.random()*0.5}turn 70% 40%)`
      objects.push({ minX, minY, maxX, maxY, color })
    }
    return objects
  }

  render() {
    const { width, height } = this.props
    const { hoverObject, objects } = this.state
    return (
      <div
        style={{
          position: 'relative', width, height,
        }}
        onMouseMove={this.handleMouseMove}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width, height
        }}>
          <Rectangles
            width={width} height={height}
            objects={objects}
          />
        </div>
        <svg style={{
          position: 'absolute', top: 0, left: 0,
          width, height,
        }}>
          { hoverObject &&
            <rect
              x={hoverObject.minX}
              y={hoverObject.minY}
              width={hoverObject.maxX - hoverObject.minX}
              height={hoverObject.maxY - hoverObject.minY}
              stroke="red" strokeWidth={3}
              fill={hoverObject.color}
            />
          }
        </svg>
      </div>
    )
  }

  handleMouseMove = ({ pageX, pageY }) => {
    const containerBB = findDOMNode(this).getBoundingClientRect()
    const [x, y] = [
      pageX - containerBB.left,
      pageY - containerBB.top
    ]
    const results = this.tree.search({
      minX: x, minY: y, maxX: x, maxY: y
    })
    this.setState({ hoverObject: last(results) })
  }

}



export const code = `
import rbush from 'rbush'

class Rectangles extends PureComponent {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.redraw()
  }

  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { width, height, objects } = this.props
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1
    for (const { minX, minY, maxX, maxY, color } of objects) {
      ctx.fillStyle = color
      ctx.fillRect(minX, minY, maxX - minX, maxY - minY)
      ctx.strokeRect(minX, minY, maxX - minX, maxY - minY)
    }
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


class CanvasInteractive extends PureComponent {

  constructor(props) {
    super(props)
    const objects = this.generateObjects()
    this.state = {
      hoverObject: null,
      objects,
    }
    this.tree = rbush()
    this.tree.load(objects)
  }

  generateObjects() {
    const { width, height, numObjects } = this.props
    const objects = []
    for (let i = 0; i < numObjects; i++) {
      const minX = Math.random() * width
      const minY = Math.random() * height
      const maxX = minX + Math.random() * width / 10
      const maxY = minY + Math.random() * height / 10
      const color = \`hsl(\${0.2+Math.random()*0.5}turn 70% 40%)\`
      objects.push({ minX, minY, maxX, maxY, color })
    }
    return objects
  }

  render() {
    const { width, height } = this.props
    const { hoverObject, objects } = this.state
    return (
      <div
        style={{
          position: 'relative', width, height,
        }}
        onMouseMove={this.handleMouseMove}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width, height
        }}>
          <Rectangles
            width={width} height={height}
            objects={objects}
          />
        </div>
        <svg style={{
          position: 'absolute', top: 0, left: 0,
          width, height,
        }}>
          { hoverObject &&
            <rect
              x={hoverObject.minX}
              y={hoverObject.minY}
              width={hoverObject.maxX - hoverObject.minX}
              height={hoverObject.maxY - hoverObject.minY}
              stroke="red" strokeWidth={3}
              fill={hoverObject.color}
            />
          }
        </svg>
      </div>
    )
  }

  handleMouseMove = ({ pageX, pageY }) => {
    const containerBB = findDOMNode(this).getBoundingClientRect()
    const [x, y] = [
      pageX - containerBB.left,
      pageY - containerBB.top
    ]
    const results = this.tree.search({
      minX: x, minY: y, maxX: x, maxY: y
    })
    this.setState({ hoverObject: last(results) })
  }

}

`