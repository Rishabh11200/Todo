import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

const ViewTodo = ({route}) => {
  const data = route.params.item;
  const item = JSON.parse(data);

  return (
    <View style={styles.view}>
      <View style={styles.center}>
        <View style={styles.inside}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.text}>Start date: {item.startDate}</Text>
            <Text style={styles.text}>Due date: {item.dueDate}</Text>
            <Text style={styles.text}>
              {`Status: ${item.status ? 'Completed' : 'Pending'}`}
            </Text>
            <Text style={styles.text}>Created on: {item.createdDate}</Text>
            <Text style={styles.text}>Updated on: {item.updatedDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewTodo;
