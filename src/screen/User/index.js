import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import ScreenDetails from '../../constants/ScreenDetails';
import {Color} from '../../constants/Color';
import {styles} from './styles';

import {useDispatch} from 'react-redux';
import {addUser} from '../../redux/actions';

const User = ({navigation}) => {
  const screen = ScreenDetails();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (text != '') {
      let res = dispatch(addUser(text));
      if (res != 'not') {
        navigation.navigate('home', {
          user: text,
          title: `Hello ${text}`,
        });
      }
    } else {
      Alert.alert('Enter username');
    }
  };
  return (
    <View style={styles.view}>
      <Text style={styles.text(screen)}>Todo</Text>
      <View style={{flex: 1, alignSelf: 'center', width: '90%'}}>
        <View style={styles.inside}>
          <View style={styles.modalView}>
            <TextInput
              mode="outlined"
              label="Username"
              value={text}
              placeholder="Enter username"
              placeholderTextColor={Color.black}
              onChangeText={text => {
                setText(text);
              }}
              activeOutlineColor={Color.shadeBlue}
              outlineColor={Color.blue}
            />
            <Button
              icon="account-settings"
              mode="text"
              color={Color.blue}
              labelStyle={{fontSize: 18}}
              uppercase={true}
              onPress={() => {
                onSubmit();
              }}
              style={styles.button}>
              Login
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default User;
