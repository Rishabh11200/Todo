import Realm from 'realm';
export const Todo = 'Todo';
export const TodoWith_User = 'TodoWith_User';

export const Todos = {
  name: Todo,
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
    allTodos: {type: 'list', objectType: Todo},
  },
};

const database = {
  path: 'ToDo.realm',
  schema: [Todos, TodoWithUser],
};

export async function insertSingleUser(name) {
  return Realm.open(database)
    .then(realm => {
      let user = realm.objectForPrimaryKey(TodoWith_User, name);
      if (user == undefined) {
        realm.write(() => {
          realm.create(TodoWith_User, {userName: name, todos: []});
        });

        return 'done';
      } else {
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
  console.log('name: ', name);
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
        userName: user.userName,
        todos: user.allTodos.sorted('dueDate'),
      };
      // console.log('db:', allTodosWithUserFromDB);
      return allTodosWithUserFromDB;
    })
    .then(allTodosWithUserFromDB => {
      return allTodosWithUserFromDB;
    })
    .catch(error => {
      console.log(error);
      return String(error);
    });
}

export async function updateOnlyStatus(id, status) {
  return Realm.open(database)
    .then(realm => {
      const Status = realm.objectForPrimaryKey(Todo, id);
      realm.write(() => {
        Status.status = status;
      });
      // console.log('db:', Status);
    })
    .catch(error => {
      console.log('error:', error);
      return String(error);
    });
}
export async function updateItem(id, item) {
  return Realm.open(database)
    .then(realm => {
      const Item = realm.objectForPrimaryKey(Todo, id);
      realm.write(() => {
        Item.status = item.status;
        Item.title = item.title;
        Item.description = item.description;
        Item.startDate = item.startDate;
        Item.dueDate = item.dueDate;
        Item.updatedDate = item.updatedDate;
      });
    })
    .catch(error => {
      console.log('error:', error);
      return String(error);
    });
}

export const queryAllTodoLists = name =>
  new Promise((resolve, reject) => {
    Realm.open(database)
      .then(realm => {
        let allTodoLists = realm.objectForPrimaryKey(TodoWith_User, name);
        resolve(allTodoLists);
      })
      .catch(error => {
        reject(error);
      });
  });

export async function deleteTodoList(id) {
  return Realm.open(database)
    .then(realm => {
      const item = realm.objectForPrimaryKey(Todo, id);
      realm.write(() => {
        realm.delete(item);
      });
    })
    .catch(error => {
      console.log('error:', error);
      return String(error);
    });
}

export async function deleteAll(name) {
  return Realm.open(database)
    .then(realm => {
      const user = realm.objectForPrimaryKey(TodoWith_User, name);
      let todos = user.allTodos;
      realm.write(() => {
        realm.delete(todos);
      });
    })
    .catch(error => {
      console.log('error', error);
      return String(error);
    });
}
