import React, { useState } from 'react';
import AppContext from './AppContext';

import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput
} from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';


const Add = ({navigation}) => {
  const context = React.useContext(AppContext);
  const [task, setTask] = useState('');
  const [duration, setDuration] = useState(0);

  return (
    <View style={styles.screen}>
      <Text style={styles.label} >Add A Task</Text>
      <TextInput
        placeholder= "Enter your task here"
        style={styles.input}
        onChangeText={setTask}
        value={task}
      />
      <TextInput
        placeholder='Duration'
        style={styles.input2}
        onChangeText={setDuration}
        value={duration}
      />
      <Button title="Add" onPress={() => { context.addTask(task, duration); navigation.goBack() } } />
      <Button title="Cancel" onPress={() => navigation.goBack() } />

    </View>
    
  );

}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  label: { 
    color: 'black',
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  input2: {
    width: '20%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 9,
    padding: 9
  },
});


export default Add;
