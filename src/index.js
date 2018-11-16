import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import { getAllCheats } from './actions/cheatsAction';
import './styles/index.css';
import App from './components/App.jsx';

const store = configureStore();
store.dispatch(getAllCheats())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >, 
document.getElementById('root')
);
