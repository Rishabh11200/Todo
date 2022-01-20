import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {styles} from './styles';
import {Color} from '../../constants/Color';
import {
  queryAllTodoLists,
  updateOnlyStatus,
  deleteTodoList,
  deleteAll,
} from '../../Realm';

const Home = ({navigation}) => {
  const name = useSelector(state => state.UserReducer.name);
  const [localList, setLocalList] = useState([]);

  reloadData = () => {
    queryAllTodoLists(name)
      .then(todoLists => {
        setLocalList(todoLists.allTodos);
      })
      .catch(error => {
        setLocalList([]);
        console.log(error);
      });
    // console.log(`reloadData`);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', padding: 5}}>
          <Icon
            name="delete-sweep"
            size={27}
            color={Color.shadeBlue}
            onPress={() => {
              deleteAllTodos();
            }}
          />
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
    reloadData();
    navigation.addListener('focus', () => {
      reloadData();
    });
  }, [navigation]);
  const onToggle = item => {
    updateOnlyStatus(item.id, !item.status);
    reloadData();
  };
  const deleteAllTodos = () => {
    Alert.alert('Really?', 'want to delete all todos...', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          deleteAll(name);
          reloadData();
        },
      },
    ]);
  };
  navigateToEdit = item => {
    navigation.navigate('Edit', {item: JSON.stringify(item)});
  };
  const deleteSingle = item => {
    deleteTodoList(item.id);
    reloadData();
  };
  const toViewTodo = item => {
    navigation.navigate('View', {item: JSON.stringify(item)});
  };
  const renderItem = ({item}) => (
    <View style={styles.space}>
      <View style={styles.listView}>
        <View style={styles.insideList}>
          <Pressable
            onPress={() => {
              toViewTodo(item);
            }}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <Text style={styles.listDescriptionText}>{item.description}</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          {item.status ? (
            <TouchableOpacity onPress={() => onToggle(item)}>
              <Icon
                name="check-circle"
                size={24}
                color={Color.green}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onToggle(item)}>
              <Icon
                name="cancel"
                size={24}
                color={Color.red}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}

          <Icon
            name="mode-edit"
            size={24}
            color={Color.white}
            style={styles.icon}
            onPress={() => navigateToEdit(item)}
          />
          <Icon
            name="delete-forever"
            size={24}
            color={Color.white}
            style={styles.icon}
            onPress={() => {
              deleteSingle(item);
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.view}>
      {localList.length !== 0 ? (
        <FlatList
          data={localList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#000',
                }}
              />
            );
          }}
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
