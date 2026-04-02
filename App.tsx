import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {loadFavorites} from './src/store/slices/favoritesSlice';
import AppNavigator from './src/navigation/AppNavigator';

store.dispatch(loadFavorites());

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
