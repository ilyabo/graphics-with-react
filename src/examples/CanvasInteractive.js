import * as React from 'react'
import { findDOMNode } from 'react-dom'
import rbush from 'rbush'
import { last } from 'lodash'

export default class CanvasInteractive extends React.PureComponent {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    const objects = this.generateObjects()
    this.state = {
      hoverObject: null,
      objects
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

  componentDidMount() {
    this.redraw()
  }

  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { width, height } = this.props
    const { objects, hoverObject } = this.state
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

    if (hoverObject) {
      const { minX, minY, maxX, maxY, color } = hoverObject
      ctx.fillStyle = color
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
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
        onMouseMove={this.handleMouseMove}
      />
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
    this.setState({
      hoverObject: last(results),
    })
  }
}



export const code = `
import rbush from 'rbush'

class CanvasInteractive extends PureComponent {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    const objects = this.generateObjects()
    this.state = {
      hoverObject: null,
      objects
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
      const color = \`hsl(\${0.2 + Math.random() * 0.5}turn 70% 40%)\`
      objects.push({ minX, minY, maxX, maxY, color })
    }
    return objects
  }

  componentDidMount() {
    this.redraw()
  }

  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { width, height } = this.props
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = '#fff'
    for (const obj of this.tree.all()) {
      const { minX, minY, maxX, maxY, color } = obj
      ctx.fillStyle = color
      ctx.fillRect(minX, minY, maxX - minX, maxY - minY)
      ctx.strokeRect(minX, minY, maxX - minX, maxY - minY)
    }

    const { hoverObject } = this.state
    if (hoverObject) {
      const { minX, minY, maxX, maxY, color } = hoverObject
      ctx.fillStyle = color
      ctx.strokeStyle = 'red'
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
        onMouseMove={this.handleMouseMove}
      />
    )
  }

  handleMouseMove = ({ pageX, pageY }) => {
    const containerBB = findDOMNode(this).getBoundingClientRect()
    const [x, y] = [
      pageX - containerBB.left,
      pageY - containerBB.top
    ]
    const results = this.tree.search({ 
      minX: x, 
      minY: y, 
      maxX: x, 
      maxY: y 
    })
    this.setState({
      hoverObject: last(results)
    })
  }

  state = {
    hoverObject: null
  }
 }

`