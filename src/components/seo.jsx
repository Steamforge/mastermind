import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import cover from '../images/studley-share.png';

const SEO = ({ description, lang = 'en', meta = [], title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            description
            title
            siteUrl
            image
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata?.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        {
          content: metaDescription,
          name: 'description',
        },
        {
          content: title,
          property: 'og:title',
        },
        {
          property: 'og:url',
          content: site.siteMetadata?.siteUrl,
        },
        {
          property: 'og:image',
          content: cover,
        },
        {
          content: metaDescription,
          property: 'og:description',
        },
        {
          content: 'website',
          property: 'og:type',
        },
        {
          content: 'summary',
          name: 'twitter:card',
        },
        {
          content: site.siteMetadata?.author || '',
          name: 'twitter:creator',
        },
        {
          content: title || site.siteMetadata?.title,
          name: 'twitter:title',
        },
        {
          content: metaDescription,
          name: 'twitter:description',
        },
      ].concat(meta)}
      title={title}
      titleTemplate={'%s | studley.dev'}
    />
  );
};

export default SEO;
