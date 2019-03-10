import * as type from './types';

import instance from '../../interceptors';


const create = credentials => async (dispatch, getState) => {
  try {
    const response = await instance.post('/task', credentials);

    const { data } = response;

    dispatch({ type: type.CREATE_TASK, payload: data });
    
    // const tasks = [...getState().task.tasks.push(data)];
    // console.log(tasks);
    // dispatch({ type: type.FETCH_TASKS, payload: tasks });
  } catch (error) {
    console.error(error);
    dispatch({ type: type.CREATE_TASK_ERROR, payload: 'Task wasn\'t created' });
  }
};

const list = () => async (dispatch) => {
  try {
    const response = await instance.get('/task');

    const { data } = response;

    dispatch({ type: type.FETCH_TASKS, payload: data });
  } catch (error) {
    dispatch({ type: type.FETCH_TASKS_ERROR, payload: 'Tasks not found' });
  }
};

export {
  create,
  list,
};
