import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import User from '../screen/User';
import Home from '../screen/Home';
import AddTodo from '../screen/AddTodo';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AllPageNavigation;
