import './layout.css';
import React from 'react';
import SEO from '../seo';

const Layout = ({ children, description, pagetitle }) => (
  <>
    <SEO description={description} title={pagetitle} />
    <main>{children}</main>
  </>
);

export default Layout;
