import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/" className="item">Home</Link>
          <div className="right menu">
            <Link to="/signout">Sign Out</Link>
          </div>
        </div>
      );
    }
    return (
      <div className="right menu">
        <Link to="/login" className="item">Sign in</Link>
        <Link to="/join" className="item">Sign up</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        {this.renderLinks()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
