import React from 'react';

import Code from '../components/Code';
import Container from '../components/Container';
import DragContext from '../components/DragContext';
import Guess from '../components/Guess';
import Layout from '../components/layout';
import Nav from '../components/Nav';
import reducer from '../../reducer';
// import Scoreboard from '../components/Scoreboard';
import Tray from '../components/Tray';

import { INITIAL_STATE } from '../../constants';
import { StateProvider } from '../../store';

const IndexPage = () => (
  <StateProvider initialState={INITIAL_STATE} reducer={reducer}>
    <DragContext>
      <Layout pagetitle="mastermind">
        <Container>
          <Code />
          <Guess />
        </Container>
        <Tray />
        <Nav />
      </Layout>
    </DragContext>
  </StateProvider>
);

export default IndexPage;
