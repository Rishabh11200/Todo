import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Pressable, Text, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './styles';
import {Color} from '../../constants/Color';
import ScreenDetails from '../../constants/ScreenDetails';
import {addTodo} from '../../redux/actions';

const AddTodo = ({navigation}) => {
  const screen = ScreenDetails;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startText, setStartText] = useState('Select start date');
  const [openStart, setOpenStart] = useState(false);
  const [dueDate, setdueDate] = useState(new Date());
  const [dueText, setdueText] = useState('Select due date');
  const [opendue, setOpendue] = useState(false);
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo);
  // console.log(todoList);

  const onChangeStartDate = (event, selected) => {
    const current = selected || startDate;
    setOpenStart(screen.platform === 'ios');
    setStartDate(current);
    const temp = new Date(selected);
    const edited =
      temp.getDate() +
      ' - ' +
      (temp.getMonth() + 1) +
      ' - ' +
      temp.getFullYear();
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
      temp.getDate() +
      ' - ' +
      (temp.getMonth() + 1) +
      ' - ' +
      temp.getFullYear();
    setdueText(edited);
  };
  const opendueDate = () => {
    setOpendue(true);
  };
  function justNow() {
    const temp = new Date();
    const edited =
      temp.getDate() +
      ' - ' +
      (temp.getMonth() + 1) +
      ' - ' +
      temp.getFullYear();
    return edited;
  }
  const onSubmit = () => {
    if (
      title != '' &&
      description != '' &&
      startText != 'Select start date' &&
      dueText != 'Select due date'
    ) {
      if (startText < dueText) {
        const Item = {
          id: title + String(Date()),
          title: title,
          description: description,
          startDate: startText,
          dueDate: dueText,
          createdDate: justNow(),
          updatedDate: justNow(),
          status: false,
        };
        dispatch(addTodo(Item));
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
                    minimumDate={new Date()}
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

export default AddTodo;
