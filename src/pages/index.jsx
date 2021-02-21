import React from 'react';

import Code from '../components/Code';
import Guess from '../components/Guess';
import Layout from '../components/layout';
import reducer from '../../reducer';
import Tray from '../components/tray';

import { INITIAL_STATE } from '../../constants';
import { StateProvider } from '../../store';

const IndexPage = () => (
  <StateProvider initialState={INITIAL_STATE} reducer={reducer}>
    <Layout>
      <Code />
      <Guess />
      <Tray />
    </Layout>
  </StateProvider>
);
export default IndexPage;
