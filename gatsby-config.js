module.exports = {
  siteMetadata: {
    title: 'Mastermind',
    description: 'Mastermind Project',
    author: '@steamforge',
    siteUrl: 'https://matermind.studley.dev/',
    image: `src/images/studley-share.png`,
    lang: `en`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: `@import "./src/styles/variables";`,
      }
    },
    'gatsby-plugin-no-sourcemaps',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'mastermind',
        short_name: 'mastermind',
        start_url: '/',
        background_color: '#31353D',
        theme_color: '#31353D',
        display: 'minimal-ui',
        icon: 'src/images/studley-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Open Sans'
        ],
        display: 'swap'
      },
    },
  ],
};
