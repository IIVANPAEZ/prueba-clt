import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PaperProvider, MD3LightTheme} from 'react-native-paper';
import {store} from './src/store';
import {loadFavorites} from './src/store/slices/favoritesSlice';
import AppNavigator from './src/navigation/AppNavigator';

store.dispatch(loadFavorites());

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1565C0',
    primaryContainer: '#E3F2FD',
    secondary: '#1E88E5',
    secondaryContainer: '#BBDEFB',
    surface: '#FFFFFF',
    background: '#F5F7FA',
    error: '#D32F2F',
  },
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

export default App;
