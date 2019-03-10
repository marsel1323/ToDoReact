import React from 'react';

import ToDoApp from './ToDo/ToDoApp';

import requireAuth from './requireAuth';

const Home = () => (
  <div>
    <ToDoApp />
  </div>
);

export default requireAuth(Home);
