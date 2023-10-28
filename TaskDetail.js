import React, { useState } from 'react';
import AppContext from './AppContext';

import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
//import { CheckBox } from 'react-native-elements';

const TaskDetail = ({ route, navigation }) => {
    const context = React.useContext(AppContext);

    const { tasks } = route.params;

    const [completed, setCompleted] = useState(false);

    const handleDonePress = () => {
      setCompleted(!completed);

      tasks.completed = !completed;
      tasks.dateCompleted = new Date().toDateString();
    };

    const handleEditPress = () => {
      console.log('moving to edit task page');
      navigation.navigate('EditTask', { tasks });
    };

    return (
        <View>
            <FlatList
                data={context.tasks}
                renderItem={({item}) => (
                <View>
                  <View style={styles.displaybox}>
                    <Text style={styles.text}>Task Name: {item.value}</Text>
                    <Text style={styles.text}>Duration: {item.duration}</Text>
                    <Text style={styles.text}>Date Added: {item.date.toDateString()}</Text>
                    <Text style={styles.text}>Date Completed: {item.dateCompleted || 'not completed'}</Text>
                  </View>

                  <View style={styles.checkboxWrapper}>
                    <CheckBox
                      disabled={false}
                      value={completed}
                      onValueChange={handleDonePress}
                    />
                    <Text>Mark as Complete</Text>
                  </View>

                    <View style={styles.inputContainer}>
                        <Button title="Edit Task" onPress={handleEditPress} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Button title="Delete Task" onPress={() => context.removeTask(item.id)} />
                    </View>
                </View>   
                )}
                keyExtractor={(item) => item.id}
            />
            <Button title="Done" onPress={() => navigation.goBack() } />
            <Button title="Cancel" onPress={() => navigation.goBack() } />
        </View>
        
    );
};


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
    text: {
      fontSize: 16,
      marginBottom: 5,
    },
    displaybox: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      width: 500,
    },
    checkboxWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
  });

export default TaskDetail;
