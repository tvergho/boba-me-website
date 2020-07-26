/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/dashboard/)) {
    page.matchPath = '/dashboard/*';
    createPage(page);
  }
};
