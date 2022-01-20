import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import User from '../screen/User';
import Home from '../screen/Home';
import AddTodo from '../screen/AddTodo';
import EditTodo from '../screen/EditTodo';
import ViewTodo from '../screen/ViewTodo';

const AllPageNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="user"
          component={User}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={({route}) => ({
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="Add"
          component={AddTodo}
          options={{title: 'Add todo'}}
        />
        <Stack.Screen
          name="Edit"
          component={EditTodo}
          options={{title: 'Edit todo'}}
        />
        <Stack.Screen
          name="View"
          component={ViewTodo}
          options={{tile: 'View'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AllPageNavigation;
