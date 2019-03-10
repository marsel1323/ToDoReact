import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Join from './components/Join.jsx';


import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  {
    auth: { authenticated: window.localStorage.getItem('token') },
  },
  composeEnhancers(applyMiddleware(thunk)),
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
