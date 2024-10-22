/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Alert } from 'react-native';






const FirstHealth = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => FirstHealth);





