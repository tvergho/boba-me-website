/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require('path');

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'BobaMe',
    titleTemplate: '%s · BobaMe',
    description:
      'Social recommendation app for Boba.',
    url: 'http://bobame.app', // No trailing slash allowed!
    image: 'icon.png',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'BobaMe',
        short_name: 'BobaMe',
        start_url: '/',
        background_color: '#FFB7B2',
        theme_color: '#FFB7B2',
        display: 'standalone',
        icon: 'static/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyBFx-xgMmczuxz1nKSSb1twkYWFTQizl_8',
          authDomain: 'bobame-fe94d.firebaseapp.com',
          databaseURL: 'https://bobame-fe94d.firebaseio.com',
          projectId: 'bobame-fe94d',
          storageBucket: 'bobame-fe94d.appspot.com',
          messagingSenderId: '723059767047',
          appId: '1:723059767047:web:72e180fe5fde5a24c177a2',
        },
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
  ],
};
