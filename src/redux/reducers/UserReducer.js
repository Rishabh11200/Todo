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
      let res = insertSingleUser(action.payload);
      if (res === 'done') {
        return {
          ...state,
          name: action.payload,
          todo: getAllTodosWithUser(action.payload),
        };
      } else {
        return 'not';
      }

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
