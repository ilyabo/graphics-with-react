import React from 'react';
import {
  Appear,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  Image,
} from 'spectacle'
import styled, { css } from 'react-emotion'
import createTheme from 'spectacle/lib/themes/default'
import { range } from 'lodash'
import SvgBubbles, { code as SvgBubblesCode } from './examples/SvgBubbles'
import SvgAnim, { code as SvgAnimCode } from './examples/SvgAnim'
import SvgSpringAnim, { code as SvgSpringAnimCode } from './examples/SvgSpringAnim'
import CanvasLines, { code as CanvasLinesCode } from './examples/CanvasLines'
import CanvasAnim, { code as CanvasAnimCode } from './examples/CanvasAnim'
import CanvasInteractive, { code as CanvasInteractiveCode } from './examples/CanvasInteractive'
import CanvasInteractive2, { code as CanvasInteractive2Code } from './examples/CanvasInteractive2'
import HelloGL, { code as HelloGLCode } from './examples/HelloGL'
import HelloGLAnim from './examples/HelloGLAnim'

require('normalize.css');
require('./main.css');
require('prismjs/themes/prism.css');

const colors = {
  primary: 'white',
  secondary: '#1f2042',
  tertiary: '#0386d1',
  quarternary: '#bde',
}
const theme = createTheme(
  colors,
  {
    primary: 'Open Sans',
    secondary: 'Helvetica',
  }
)


const SummaryItem = ({ children, kind }) =>
  <Appear>
    <ListItem className={smallerFont}>
      <div style={{
        display: 'flex',
      }}>
      <span role="img" style={{ marginRight: '.5em' }}>{kind === 'yes' ? '😀' : '😢'}</span>
      {children}
      </div>
    </ListItem>
  </Appear>


const CodeSnippet = ({ code, fontSize = 1.5 }) =>
  <div
    className={css({
      display: 'flex',
      flex: '0 0 800px',
      height: '800px',
      overflow: 'auto',
      justifyContent: 'center',
      '& > div': {
        fontSize: `${fontSize}rem`,
      },
      '& pre': {
        backgroundColor: '#fff',
      },
    })}
  >
    <CodePane
      lang="javascript"
      source={code}
      theme="external"
    />
  </div>

const Figure = styled('div')(props => ({
  display: 'flex',
  flex: '0 0 auto',
  '& > *': {
    border: '1px solid #999',
    display: 'block',  // remove bottom margin from svg or canvas
    justifyContent: 'center',
  }
}))

const Row = styled('div')(props => ({
  display: 'flex',
  flexDirection: 'row',
  flexBasis: 0, // the content should have no influence on the size
  flexGrow: 1,
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'center',
  minHeight: 500,
  // '&>*': {
  //   // display: 'flex',
  //   // flexGrow: 1,
  //   // justifyContent: 'center',
  // },
  '&>*+*': {
    marginLeft: 40,
  },
}))

const smallerFont = css({ fontSize: '1em' })


export default class Presentation extends React.Component {
  render() {

    return (
      <Deck
        transition={['fade']}
        transitionDuration={500}
        controls={false}
        theme={theme}
      >
        <Slide>
          <Text margin="0 0 100px 0" textColor="tertiary" bold>
            Zürich ReactJS Meetup
          </Text>
          <Heading margin="0 0 50px 0" size={2} fit  caps textColor="secondary" bold>
            Graphics with React
          </Heading>
          <Image
            src="images/tl-illustraion-1.svg"
            height={300}
          />
          <Image
            src="images/TL-logo-Horizontal-White.svg"
            height={30}
          />
          <Text caps margin="60px 0 10px 0" textColor="tertiary" >
            Ilya Boyandin
          </Text>
          <Text textColor="tertiary">
            @ilyabo
          </Text>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading margin="0 0 50px 0" size={6} caps textColor="secondary" bold>
            Movement of people
          </Heading>
          <Image
            src="images/us.png"
          />
        </Slide>

        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading margin="0 0 50px 0" size={6} caps textColor="secondary" bold>
            Public transport
          </Heading>
          <Image
            src="images/ptn-metrics.png"
          />
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            2018 Technology
          </Heading>
          <List>
            <Appear>
              <ListItem>SVG</ListItem>
            </Appear>
            <Appear>
              <ListItem>Canvas</ListItem>
            </Appear>
            <Appear>
              <ListItem>WebGL</ListItem>
            </Appear>
          </List>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            SVG
          </Heading>

          <Row>
            <List>
              <Appear><ListItem>Vector graphics</ListItem></Appear>
              <Appear><ListItem>Scene graph</ListItem></Appear>
              <Appear><ListItem>XML, lives in the DOM</ListItem></Appear>
              <Appear><ListItem>Objects support events</ListItem></Appear>
              <Appear><ListItem>CSS for styling</ListItem></Appear>
              <Appear><ListItem>React supports SVG</ListItem></Appear>
            </List>

            <Figure>
              <SvgBubbles
                width={400}
                height={400}
                color={colors.secondary}
                numPoints={200}
              />
            </Figure>
          </Row>

        </Slide>



        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            REACT + SVG
          </Heading>
          <Row>
            <CodeSnippet code={SvgBubblesCode} />
            <Figure>
              <SvgBubbles
                width={400}
                height={400}
                numPoints={200}
              />
            </Figure>
          </Row>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            REACT + SVG + Animation
          </Heading>
          <Row>
            <CodeSnippet
              code={SvgAnimCode}
              fontSize={1.3}
            />
            <Figure>
              <SvgAnim
                width={400}
                height={400}
              />
            </Figure>
          </Row>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            REACT + SVG + React-Spring
          </Heading>
          <Row>
            <CodeSnippet
              code={SvgSpringAnimCode}
              fontSize={1.1}
            />
            <Figure>
              <SvgSpringAnim
                width={400}
                height={400}
              />
            </Figure>
          </Row>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
           <Heading size={6} textColor="secondary" caps>
             SVG summary
           </Heading>
           <Row>
             <List>
               <SummaryItem kind="yes">Very convenient to use</SummaryItem>
               <SummaryItem kind="yes">Good for geom objects</SummaryItem>
               <SummaryItem kind="yes">Seamless with React</SummaryItem>
             </List>
             <List>
               <SummaryItem kind="no">Slow for >5K objects</SummaryItem>
               <SummaryItem kind="no">Bad for work with pixels</SummaryItem>
             </List>
           </Row>
         </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            Canvas (2D)
          </Heading>

          <Row>
            <List>
              <Appear><ListItem>Raster bitmap</ListItem></Appear>
              <Appear><ListItem>Drawing primitives</ListItem></Appear>
              <Appear><ListItem>Access to pixels</ListItem></Appear>
            </List>

            <Figure>
              <CanvasLines
                width={400}
                height={400}
                numLines={10000}
              />
            </Figure>
          </Row>

        </Slide>




        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            REACT + 2D Canvas
          </Heading>

          <Row>
            <CodeSnippet
              code={CanvasLinesCode}
              fontSize={1.4}
            />
            <Figure>
              <CanvasLines
                width={400}
                height={400}
                numLines={10000}
              />
            </Figure>
          </Row>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            REACT + 2D Canvas + Animation
          </Heading>
          <Row>
            <CodeSnippet
              code={CanvasAnimCode}
              fontSize={1.4}
            />
            <Figure>
              <CanvasAnim
                width={400}
                height={400}
              />
            </Figure>
          </Row>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Image
            src="images/add-hit-region.png"
          />
        </Slide>



        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            REACT + 2D Canvas + Interactivity
          </Heading>
          <Row>
            <CodeSnippet
              code={CanvasInteractiveCode}
              fontSize={1.2}
            />
            <Figure>
              <CanvasInteractive
                width={400}
                height={400}
                numObjects={20000}
              />
            </Figure>
          </Row>
        </Slide>


        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            REACT + 2D Canvas + Fast Interactivity
          </Heading>
          <Row>
            <CodeSnippet
              code={CanvasInteractive2Code}
              fontSize={1.2}
            />
            <Figure>
              <CanvasInteractive2
                width={400}
                height={400}
                numObjects={20000}
              />
            </Figure>
          </Row>
        </Slide>

        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" >
            REACT + 2D CANVAS + devicePixelRatio
          </Heading>
          <Row>
            <CodeSnippet
              code={`
  render() {
    const { width, height } = this.props
    const { devicePixelRatio } = window
    return (
      <canvas
        style={{ width, height }}
        width={width * devicePixelRatio}
        height={height * devicePixelRatio}
        ref={this.canvasRef}
      />
    )
              `}
            />
          </Row>
        </Slide>




        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
           <Heading size={6} textColor="secondary" caps>
             2D Canvas summary
           </Heading>
           <Row>
             <List>
               <SummaryItem kind="yes">Faster than SVG</SummaryItem>
               <SummaryItem kind="yes">Better for many objects (~10K)</SummaryItem>
               <SummaryItem kind="yes">Better for working with pixels</SummaryItem>
             </List>
             <List>
               <SummaryItem kind="no">Less convenient</SummaryItem>
               <SummaryItem kind="no">No support for interactivity</SummaryItem>
             </List>
           </Row>
         </Slide>




          <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
            <Heading size={6} textColor="secondary" caps>
              WebGL (3D Canvas)
            </Heading>

            <Row>
              <List>
                <Appear><ListItem>3D graphics</ListItem></Appear>
                <Appear><ListItem>Runs on the GPU</ListItem></Appear>
                <Appear><ListItem>The fastest performance</ListItem></Appear>
                <Appear><ListItem>Most difficult to use</ListItem></Appear>
                <Appear><ListItem>Shader magic</ListItem></Appear>
              </List>

              <Figure>
                <HelloGLAnim />
              </Figure>
            </Row>
          </Slide>




      </Deck>
    );
  }
}
