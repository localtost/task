import React from 'react';
import Root from './core/nav';
import {Provider} from 'react-redux';
import store from './core/redux/index.tsx';
function App(): React.JSX.Element | null {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
