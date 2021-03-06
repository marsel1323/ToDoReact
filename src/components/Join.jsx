import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

class Join extends Component {
	state = {
		username: '',
		email: '',
		password: '',
	};

  onSubmit = formProps  => {
    this.props.signup(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="ui form" onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Username</label>
          <Field
            name="username"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button className="ui green button">Sign up!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}


export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Join);
