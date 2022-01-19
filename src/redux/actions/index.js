import {ADD_TODO, ADD_USER, GET_TODO, GET_USER} from '../../constants/strings';

export const addUser = Name => ({
  type: ADD_USER,
  payload: Name,
});

export const addTodo = item => ({
  type: ADD_TODO,
  payload: item,
});
