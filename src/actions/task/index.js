import * as type from './types';

import instance from '../../interceptors';


const create = credentials => async (dispatch, getState) => {
  try {
    const response = await instance.post('/task', credentials);

    const { data } = response;

    dispatch({ type: type.CREATE_TASK, payload: data });
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

const remove = (id) => async (dispatch) => {
  try {
    await instance.delete(`/task/${id}`);
    
    dispatch({ type: type.REMOVE_TASK, payload: {id} });
  } catch (error) {
    dispatch({ type: type.REMOVE_TASK_ERROR, payload: 'Task not found' });
  }
};

const edit = ({id, title, status}) => async (dispatch) => {
  try {
    console.log({id, title, status});
    const {data} = await instance.put(`/task/${id}`, {title, status});
    dispatch({ type: type.UPDATE_TASK, payload: data });
  } catch (error) {
    dispatch({ type: type.UPDATE_TASK_ERROR, payload: 'Task not found' });
  }
};

export {
  create,
  list,
  remove,
  edit,
};
