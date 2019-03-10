import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/task';


class ToDoApp extends Component {
	state = {
		title: '',
	};
	
	async componentDidMount() {
		await this.props.list();
	}
	
	handleClick = () => {
		this.props.create(this.state);
	};
	
	inputChangeHandle = (e) => {
		this.setState({
			title: e.target.value
		})
	};
	
	renderList() {
		if (this.props.tasks) {
			return (
				this.props.tasks.map((task, index) => {
					return (<p key={index}>{task.title}</p>)
				})
			)
		}
		return (<div>Loading...</div>)
	}
	
	render() {
		return (
			<div className="todoapp-container">
				<div className="ui action input">
					<input type="text" placeholder="Input your task" onChange={this.inputChangeHandle}/>
					<button className="ui button" onClick={this.handleClick}>Add</button>
				</div>
				
				<div className="todo-list">
					{this.renderList()}
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
