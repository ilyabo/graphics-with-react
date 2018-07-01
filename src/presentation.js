import React from 'react';
import {
  Appear,
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Image,
  Table,
  TableHeader,
  TableBody,
  TableHeaderItem,
  TableRow,
  TableItem,
} from 'spectacle'
import styled, { css } from 'react-emotion'
import createTheme from 'spectacle/lib/themes/default'
import { range } from 'lodash'
import Bubbles, { code as BubblesCode } from './examples/Bubbles'

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


const CodeSnippet = ({ code }) =>
  <div
    className={css({
      display: 'flex',
      flex: '0 0 1000px',
      justifyContent: 'center',
      '& > div': {
        fontSize: '1.5rem',
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
  // '&>*': {
  //   // display: 'flex',
  //   // flexGrow: 1,
  //   // justifyContent: 'center',
  // },
  '&>*+*': {
    marginLeft: 40,
  },
}))


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
          <Text caps margin="40px 0 10px 0" textColor="tertiary" >
            Ilya Boyandin
          </Text>
          <Image
            src="images/TL-logo-Horizontal-White.svg"
            height={30}
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
              <Appear><ListItem>XML ⇒ lives in the DOM</ListItem></Appear>
              <Appear><ListItem>Objects support events</ListItem></Appear>
              <Appear><ListItem>React supports SVG</ListItem></Appear>
            </List>

            <Figure>
              <Bubbles
                width={400}
                height={400}
                color={colors.secondary}
                numPoints={1000}
              />
            </Figure>
          </Row>

        </Slide>



        <Slide bgColor="primary" textColor="tertiary" align="flex-end center">
          <Heading size={6} textColor="secondary" caps>
            SVG Example
          </Heading>

          <Row>
            <CodeSnippet code={BubblesCode} />
            <Figure>
              <Bubbles
                width={400}
                height={400}
                numPoints={1000}
                color={colors.secondary}
              />
            </Figure>
          </Row>


        </Slide>


        {/*<Table>*/}
          {/*<TableHeader>*/}
            {/*<TableRow>*/}
              {/*<TableHeaderItem>Good for</TableHeaderItem>*/}
              {/*<TableHeaderItem>Not so good for</TableHeaderItem>*/}
            {/*</TableRow>*/}
          {/*</TableHeader>*/}
          {/*<TableBody>*/}
            {/*<TableRow>*/}
              {/*<TableItem>None</TableItem>*/}
              {/*<TableItem>61.8%</TableItem>*/}
            {/*</TableRow>*/}
            {/*<TableRow>*/}
              {/*<TableItem>jQuery</TableItem>*/}
              {/*<TableItem>28.3%</TableItem>*/}
            {/*</TableRow>*/}
          {/*</TableBody>*/}
        {/*</Table>*/}


      </Deck>
    );
  }
}
