import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import './styles/index.css';
import App from './components/App.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { setCurrentUser } from './actions/userAction'
import { setAuthToken } from './helpers/setAuthToken';


library.add(faStroopwafel)

const store = configureStore();
// store.dispatch(getAllCheats())

if (jwt.decode(localStorage.token) !== null) {
  setAuthToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
} else {
  setAuthToken('');
  store.dispatch(setCurrentUser({}));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >, 
document.getElementById('root')
);
