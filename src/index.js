import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import { getAllCheats } from './actions/cheatsAction';
import './styles/index.css';
import App from './components/App.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

const store = configureStore();
store.dispatch(getAllCheats())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >, 
document.getElementById('root')
);
