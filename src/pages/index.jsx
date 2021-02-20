import Code from '../components/Code';
import Layout from '../components/layout';
import React from 'react';
import reducer from '../../reducer';

import { StateProvider } from '../../store';

const INITIAL_STATE = {
  code: [],
};

const IndexPage = () => (
  <StateProvider initialState={INITIAL_STATE} reducer={reducer}>
    <Layout>
      <Code />
    </Layout>
  </StateProvider>
);
export default IndexPage;
