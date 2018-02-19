/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import configureStore, { history } from 'store/configureStore';
import Root from 'containers/Root';
import 'typeface-roboto';

require('favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app') /* eslint-disable-line */
);

if (module.hot) {
  module.hot.accept('containers/Root', () => {
    const NewRoot = require('containers/Root').default; /* eslint-disable-line */
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app') /* eslint-disable-line */
    );
  });
}
