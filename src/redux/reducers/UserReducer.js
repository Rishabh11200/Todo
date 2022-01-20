import {ADD_TODO, ADD_USER, GET_TODO, GET_USER} from '../../constants/strings';
import {
  insertSingleUser,
  getAllTodosWithUser,
  insertTodoItem,
} from '../../Realm';

const initialState = {
  name: '',
  todo: [],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      insertSingleUser(action.payload);
      return {
        ...state,
        name: action.payload,
        todo: getAllTodosWithUser(action.payload),
      };

    case ADD_TODO:
      insertTodoItem(state.name, action.payload);
      return {
        ...state,
        todo: getAllTodosWithUser(state.name),
      };

    default:
      return state;
  }
};
