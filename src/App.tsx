import React from 'react';
import logo from './logo.svg';
import './App.scss';
import MovieList from './Views/Movies/Movies';
import { Provider } from 'react-redux';
import store from './Store/Store';

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <div className='row'>
          <MovieList/>
        </div>
      </Provider>
    </div>
  );
}

export default App;
