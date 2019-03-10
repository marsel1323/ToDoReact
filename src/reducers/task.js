import * as type from '../actions/task/types';


const INITIAL_STATE = {
	tasks: '',
	tasksErrorMessage: '',
	
	newTask: '',
	newTaskErrorMessage: '',
};


export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case type.CREATE_TASK:
			return {...state, tasks: [...state.tasks, action.payload]};
		case type.CREATE_TASK_ERROR:
			return {...state, newTaskErrorMessage: action.payload};
		
		case type.FETCH_TASKS:
			return {
				...state,
				tasks: action.payload
			};
		case type.FETCH_TASKS_ERROR:
			return {
				...state,
				taskErrorMessage: action.payload
			};
		
		case type.REMOVE_TASK:
			return {
				...state,
				tasks: [...state.tasks.filter(task => task.id !== action.payload.id),]
			};
		case type.REMOVE_TASK_ERROR:
			return {...state, taskErrorMessage: action.payload};
		
		case type.UPDATE_TASK:
			console.log(action);
			return {
				...state,
				tasks: [
					...state.tasks.map(task => (task.id === action.payload.id) ? action.payload : task
					)]
			};
		case type.UPDATE_TASK_ERROR:
			return {...state, taskErrorMessage: action.payload};
		
		default:
			return state;
	}
}
