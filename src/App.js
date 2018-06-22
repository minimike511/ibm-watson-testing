import React, { Component } from 'react';
import './App.css';
import VisualContainer from './app/container/VisualRecognitionContainer';
import {createStore} from 'redux';
import reducer from "./app/reducer/reducer";
import {Provider} from 'react-redux';

let store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <VisualContainer />
        </Provider>
    );
  }
}

export default App;
