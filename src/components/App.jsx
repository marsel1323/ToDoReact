import React from 'react';

import Header from './Header';


const App = ({ children }) => (
  <div className="ui container">
    <Header />
    {children}
  </div>
);


export default App;
