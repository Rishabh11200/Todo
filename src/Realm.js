import Realm from 'realm';
export const Todo_List = 'TodoList';
export const TodoWith_User = 'TodoWithUser';

export const TodoList = {
  name: Todo_List,
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    startDate: 'string',
    dueDate: 'string',
    createdDate: 'string',
    updatedDate: 'string',
    status: {type: 'bool', default: false},
  },
};

export const TodoWithUser = {
  name: TodoWith_User,
  primaryKey: 'userName',
  properties: {
    userName: 'string',
    allTodos: {type: 'list', objectType: Todo_List},
  },
};

const database = {
  path: 'ToDo.realm',
  schema: [TodoList, TodoWithUser],
};

export async function insertSingleUser(name) {
  return Realm.open(database)
    .then(realm => {
      console.log('from textinput: ', name);
      let user = realm.objectForPrimaryKey(TodoWith_User, name);
      console.log('from db: ', user);
      if (user == undefined) {
        console.log('if:', user, name);
        realm.write(() => {
          realm.create(TodoWith_User, {userName: name, todos: []});
        });
        return 'done';
      } else {
        console.log('else:', name, user);
        return 'done';
      }
    })
    .catch(error => {
      console.log(error);
      return String(error);
    });
}

export async function insertTodoItem(name, item) {
  console.log('in db: ', item);
  return Realm.open(database)
    .then(realm => {
      realm.write(() => {
        const user = realm.objectForPrimaryKey(TodoWith_User, name);
        user.allTodos.push(item);
      });
    })
    .catch(error => console.log(error));
}

export async function getAllTodosWithUser(name) {
  return Realm.open(database)
    .then(realm => {
      const user = realm.objectForPrimaryKey(TodoWith_User, name);
      const allTodosWithUserFromDB = {
        userName: user.name,
        todos: user.allTodos.sorted('dueDate'),
      };
      return allTodosWithUserFromDB;
    })
    .catch(error => {
      console.log(error);
      return String(error);
    });
}
