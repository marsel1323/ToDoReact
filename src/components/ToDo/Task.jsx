import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";

import * as actions from "../../actions/task";

import TaskTitle from './TaskTitle'


class Task extends Component {
	state = {
		isEditing: false,
		id: this.props.task.id,
		title: this.props.task.title,
		status: this.props.task.status,
	};
	
	removeHandleClick = () => {
		const {id} = this.state;
		this.props.remove(id);
	};
	
	editHandleClick = () => {
		this.setState({isEditing: !this.state.isEditing});
	};
	
	editHandleSubmit = () => {
		const {id, title, status} = this.state;
		
		this.props.edit({id, title, status,});
		
		this.setState({isEditing: false});
	};
	
	doneHandler = () => {
		const {id, title} = this.state;
		this.setState({
			status: 1,
		});
		this.props.edit({id, title, status: 1,});
	};
	
	renderEditBtn() {
		const editBtnContent = !this.state.isEditing ? 'Edit' : 'Cancel';
		
		return (
			<div
				className="ui button"
				onClick={this.editHandleClick}
			>
				{editBtnContent}
			</div>
		)
	}
	
	renderRemoveBtn() {
		return (
			!this.state.isEditing
				? <div
					className="ui button"
					onClick={this.removeHandleClick}
				>
					Remove
				</div>
				: <div
					className="ui button"
					onClick={this.editHandleSubmit}
				>
					Save
				</div>
		)
	}
	
	renderDoneBtn() {
		return (
			this.state.isEditing || this.state.status
				? <div></div>
				: <div
					className="ui button"
					onClick={this.doneHandler}
				>
					Done
				</div>
		)
	}
	
	render() {
		const task = this.state;
		
		return (
			<div className="item">
				<TaskTitle
					task={task}
					isEditing={this.state.isEditing}
					onChange={(title) => this.setState({title})}
				/>
				
				<div className="right floated content">
					{this.renderEditBtn()}
					{this.renderRemoveBtn()}
					{this.renderDoneBtn()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.task.createErrorMessage,
	};
}

export default compose(
	connect(mapStateToProps, actions),
	reduxForm({form: 'create'})
)(Task);
