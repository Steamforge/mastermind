import React from 'react';

import Code from '../components/Code';
import Container from '../components/Container';
import Guess from '../components/Guess';
import Layout from '../components/layout';
import Nav from '../components/Nav';
import reducer from '../../reducer';
import Tray from '../components/tray';

import { INITIAL_STATE } from '../../constants';
import { StateProvider } from '../../store';

const IndexPage = () => (
  <StateProvider initialState={INITIAL_STATE} reducer={reducer}>
    <Layout>
      <Container>
        <Code />
        <Guess />
        <Tray />
        <Nav />
      </Container>
    </Layout>
  </StateProvider>
);
export default IndexPage;
