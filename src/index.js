import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Boot from './redux/boot';
import App from './App';
import theme from './assets/react-toolbox/theme'
import './assets/react-toolbox/theme.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import registerServiceWorker from './registerServiceWorker';

const renderApp = () => render(
  <ThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>, 
  document.getElementById('root'),
);

Boot().then(() => renderApp()).catch(error => console.error(error));
registerServiceWorker();
