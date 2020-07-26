/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/dashboard/)) {
    page.matchPath = '/dashboard/*';
    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-password-strength/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
