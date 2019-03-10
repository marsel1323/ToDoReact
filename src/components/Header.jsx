import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <div className="ui secondary pointing menu">
    <Link to="/" className="item">Home</Link>
    <div className="right menu">
      <Link to="/login" className="item">Sign in</Link>
      <Link to="/join" className="item">Sign up</Link>
    </div>
  </div>
);

export default Header;
