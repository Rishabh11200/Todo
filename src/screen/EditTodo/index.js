import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {Color} from '../../constants/Color';
import ScreenDetails from '../../constants/ScreenDetails';
import {updateItem} from '../../Realm';

const EditTodo = route => {
  const data = route.route.params.item;
  const item = JSON.parse(data);
  const navigation = useNavigation();

  const screen = ScreenDetails;
  let dDate = item.dueDate.split('/');
  let date = item.startDate.split('/');
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [startDate, setStartDate] = useState(
    new Date(date[2], date[1] - 1, date[0]),
  );
  const [startText, setStartText] = useState(item.startDate);
  const [openStart, setOpenStart] = useState(false);
  const [dueDate, setdueDate] = useState(
    new Date(dDate[2], dDate[1] - 1, dDate[0]),
  );
  const [dueText, setdueText] = useState(item.dueDate);
  const [opendue, setOpendue] = useState(false);
  const [status, setStatus] = useState(item.status);

  const onChangeStartDate = (event, selected) => {
    const current = selected || startDate;
    setOpenStart(screen.platform === 'ios');
    setStartDate(current);
    const temp = new Date(selected);
    const edited =
      temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
    setStartText(edited);
  };
  const openStartDate = () => {
    setOpenStart(true);
  };
  const onChangedueDate = (event, selected) => {
    const current = selected || startDate;
    setOpendue(screen.platform === 'ios');
    setdueDate(current);
    const temp = new Date(selected);
    const edited =
      temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
    setdueText(edited);
  };
  const opendueDate = () => {
    setOpendue(true);
  };
  function justNow() {
    const temp = new Date();
    const edited =
      temp.getDate() +
      '/' +
      (temp.getMonth() + 1) +
      '/' +
      temp.getFullYear() +
      '-' +
      temp.getHours() +
      ':' +
      temp.getMinutes();
    return edited;
  }

  const onSubmit = () => {
    if (
      title != '' &&
      description != '' &&
      startText != 'Select start date' &&
      dueText != 'Select due date'
    ) {
      if (startText <= dueText) {
        const Item = {
          title: title,
          description: description,
          startDate: startText,
          dueDate: dueText,
          updatedDate: justNow(),
          status: status,
        };
        updateItem(item.id, Item);
        navigation.pop();
      } else {
        Alert.alert('Please Enter valid date');
      }
    } else {
      Alert.alert('Please Enter all the Details');
    }
  };
  return (
    <View style={styles.view}>
      <View style={styles.center}>
        <View style={styles.inside}>
          <KeyboardAvoidingView>
            <View style={styles.modalView}>
              <TextInput
                mode="outlined"
                label="Title"
                value={title}
                placeholder="Enter title"
                placeholderTextColor={Color.black}
                onChangeText={text => {
                  setTitle(text);
                }}
                activeOutlineColor={Color.shadeBlue}
                outlineColor={Color.blue}
              />
              <TextInput
                mode="outlined"
                label="Description"
                value={description}
                placeholder="Enter description"
                placeholderTextColor={Color.black}
                onChangeText={text => {
                  setDescription(text);
                }}
                activeOutlineColor={Color.shadeBlue}
                outlineColor={Color.blue}
              />
              <View>
                <Button
                  icon="calendar-edit"
                  mode="contained"
                  color={Color.shadeBlue}
                  labelStyle={{fontSize: 18}}
                  uppercase={true}
                  style={{marginTop: 10}}
                  onPress={() => {
                    openStartDate();
                  }}>
                  {startText}
                </Button>
                {openStart && (
                  <DateTimePicker
                    minimumDate={startDate}
                    value={startDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartDate}
                  />
                )}
                <Button
                  icon="calendar-edit"
                  mode="contained"
                  color={Color.shadeBlue}
                  labelStyle={{fontSize: 18}}
                  uppercase={true}
                  style={{marginTop: 10}}
                  onPress={() => {
                    opendueDate();
                  }}>
                  {dueText}
                </Button>
                {opendue && (
                  <DateTimePicker
                    minimumDate={startDate}
                    value={dueDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangedueDate}
                  />
                )}
              </View>
              <View style={styles.row}>
                <Text style={styles.simpleText}>Status:</Text>
                {status ? (
                  <TouchableOpacity onPress={() => setStatus(false)}>
                    <Icon
                      name="check-circle"
                      size={24}
                      color={Color.darkGreen}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setStatus(true)}>
                    <Icon
                      name="cancel"
                      size={24}
                      color={Color.red}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Pressable
                onPress={() => {
                  onSubmit();
                }}>
                <View style={styles.centerButton}>
                  <View style={styles.button}>
                    <Text style={styles.insideSubmitText}>Submit</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default EditTodo;
