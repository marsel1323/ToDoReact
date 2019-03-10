import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  signOut = () => {
      this.props.signout(() => {
        this.props.history.push('/login');
      });
  };
  
  renderLinks() {
    const { authenticated: isAuth } = this.props;
    if (isAuth) {
      return (
          <div className="right menu">
            <a
              className="item"
              onClick={this.signOut}>Sign Out</a>
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

export default connect(mapStateToProps, actions)(Header);
