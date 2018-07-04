import React, { Component } from "react"
import { Node, Shaders, GLSL, Uniform, LinearCopy } from "gl-react"
import { Surface } from "gl-react-dom"

const shaders = Shaders.create({
  MotionBlur: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D children, backbuffer;
uniform float persistence;
void main () {
  gl_FragColor = vec4(mix(
    texture2D(children, uv),
    texture2D(backbuffer, uv),
    persistence
  ).rgb, 1.0);
}`
  },
  HelloGL: {
    // uniforms are variables from JS. We pipe blue uniform into blue output color
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float red;
void main() {
  gl_FragColor = vec4(red, uv.x, uv.y, 1.0);
}`
  },
  Rotate: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float angle, scale;
uniform sampler2D children;
void main() {
  mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 p = (uv - vec2(0.5)) * rotation / scale + vec2(0.5);
  gl_FragColor =
    p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0
    ? vec4(0.0)
    : texture2D(children, p);
}`
  }
});

const MotionBlur = ({ children, persistence }) => (
  <Node
    shader={shaders.MotionBlur}
    backbuffering
    uniforms={{ children, backbuffer: Uniform.Backbuffer, persistence }}
  />
);


class Rotate extends Component {
  render() {
    const { angle, scale, children } = this.props;
    return (
      <Node shader={shaders.Rotate} uniforms={{ scale, angle, children }} />
    );
  }
}

class HelloGL extends Component {
  render() {
    const { red } = this.props;
    return <Node shader={shaders.HelloGL} uniforms={{ red }} />;
  }
}

export default class HelloGLAnim extends Component {
  constructor(props) {
    super(props)
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
      time: time + 20,
      animation: requestAnimationFrame(this.tick)
    }))
  }
  
  render() {
    const { time } = this.state
    const persistence = 0.75 - 0.2 * Math.cos(0.0005 * time);
    const red = 0.6 + 0.4 * Math.cos(0.004 * time);
    const scale = 0.7 + 0.4 * Math.cos(0.001 * time);
    const angle = 2 * Math.PI * (0.5 + 0.5 * Math.cos(0.001 * time));
    return (
      <Surface width={400} height={400}>
        <LinearCopy>
          <MotionBlur persistence={persistence}>
            <Rotate scale={scale} angle={angle}>
              <HelloGL red={red} />
            </Rotate>
          </MotionBlur>
        </LinearCopy>
      </Surface>
    );
  }
}
