import React from 'react';

import Code from '../components/Code';
import Container from '../components/Container';
import DragContext from '../components/DragContext';
import GridArea from '../components/GridArea';
import GridContainer from '../components/GridContainer';
import Guess from '../components/Guess';
import Layout from '../components/layout';
import Nav from '../components/Nav';
import reducer from '../../reducer';
import Scoreboard from '../components/Scoreboard';
import Tray from '../components/Tray';

import { INITIAL_STATE } from '../../constants';
import { StateProvider } from '../../store';

const IndexPage = () => (
  <StateProvider initialState={INITIAL_STATE} reducer={reducer}>
    <DragContext>
      <Layout>
        <GridContainer>
          <GridArea area="tray">
            <Tray />
          </GridArea>
          <GridArea area="game">
            <Container>
              <Code />
              <Guess />
            </Container>
          </GridArea>
          <GridArea area="nav">
            <Nav />
          </GridArea>
          <GridArea area="score">
            <Scoreboard />
          </GridArea>
        </GridContainer>
      </Layout>
    </DragContext>
  </StateProvider>
);

export default IndexPage;
