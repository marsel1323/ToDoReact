import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Join from './Join';


const App = () => (
  <div className="ui container">
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
