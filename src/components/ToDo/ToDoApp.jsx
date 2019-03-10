import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions/task';

import Task from './Task';


class ToDoApp extends Component {
	state = {title: '',};
	
	async componentDidMount() {
		await this.props.list();
	}
	
	handleClick = () => {
		this.props.create(this.state);
		this.setState({title: ''})
	};
	
	inputChangeHandle = (e) => {
		this.setState({title: e.target.value})
	};
	
	renderList() {
		if (this.props.tasks) {
			return (
				this.props.tasks.map((task) => {
					return (
						<Task task={task} key={task.id}/>
					)
				})
			)
		}
		return (<div>Loading...</div>)
	}
	
	render() {
		return (
			<div className="ui eight column grid">
				<div className="row">
					<div className="eight wide column">
						<div className="ui action input">
							<input
								type="text"
								placeholder="Input your task"
								onChange={this.inputChangeHandle}
								value={this.state.title}/>
							<button
								className="ui button"
								onClick={this.handleClick}>
								Add
							</button>
						</div>
					</div>
				</div>
				
				<div className="row">
					<div className="eight wide column">
						<div className="ui middle aligned divided list">
							{this.renderList()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.task.createErrorMessage,
		tasks: state.task.tasks
	};
}

export default compose(
	connect(mapStateToProps, actions),
	reduxForm({form: 'create'})
)(ToDoApp);
