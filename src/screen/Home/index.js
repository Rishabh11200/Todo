import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {styles} from './styles';
import {Color} from '../../constants/Color';
import ScreenDetails from '../../constants/ScreenDetails';

const Home = ({route, navigation}) => {
  const screen = ScreenDetails();
  const todoList = useSelector(state => state.todo);
  const [localList, setLocalList] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', padding: 5}}>
          <Icon name="delete-sweep" size={27} color={Color.shadeBlue} />
          <View style={{marginLeft: 5}}>
            <Icon
              name="add-task"
              size={27}
              color={Color.shadeBlue}
              onPress={() => {
                navigation.navigate('Add');
              }}
            />
          </View>
        </View>
      ),
    });
    setLocalList(todoList);
  }, []);

  console.log(todoList);
  const renderItem = ({item}) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
  return (
    <View style={styles.view}>
      <Text>Hey</Text>
      {localList ? (
        <FlatList
          data={localList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.center}>
          <Text>No Todos for you!!</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
