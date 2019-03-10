import React from 'react';

const TaskTitle = (props) => {
	const {task: {title, status}, isEditing, onChange} = props;
	
	const contentStyle = status
		? {textDecoration: 'line-through', color: '#8a8a8a'}
		: {textDecoration: 'none'};
	
	return !isEditing
		? (
			<div
				className="content"
				style={contentStyle}>
				{title}
			</div>
		)
		: (
			<div className="ui action input">
				<input
					type="text"
					value={title}
					onChange={(e) => onChange(e.target.value)}/>
			</div>
		);
};

export default TaskTitle;
