import React, {Component} from 'react';
import axios from 'axios';

class Join extends Component {
	state = {
		username: '',
		email: '',
		password: ''
	};
	
	handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('http://localhost:8080/api/signup',{
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		});
		console.log(response);
	};
	
	render() {
		return (
			<form className="ui form" onSubmit={this.handleSubmit}>
				<div className="field">
					<label>Username</label>
					<input
						type="text"
						name="user-name"
						placeholder="Username"
						onChange={e => this.setState({username: e.target.value})}
					/>
				</div>
				<div className="required field">
					<label>Email</label>
					<input
						type="text"
						name="email"
						placeholder="Email address"
						onChange={e => this.setState({email: e.target.value})}
					/>
				</div>
				<div className="required field">
					<label>Password</label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						onChange={e => this.setState({password: e.target.value})}
					/>
				</div>
				<button className="ui green button">Sign up!</button>
			</form>
		);
	}
}

export default Join;
