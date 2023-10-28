import React, { useState } from 'react';
import AppContext from './AppContext';

import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
  TouchableHighlight
} from 'react-native';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}


const Home = ({navigation}) => {
  const context = React.useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [showCompleted, setShowCompleted] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(context.tasks)
  
  const handleItemClick = (item) => {
    console.log({item});
    navigation.navigate('TaskDetail', { tasks: item });
  };

  const toggleShowCompleted = () => {
    // Toggle the state
    setShowCompleted(!showCompleted);

    if (showCompleted) {
      setFilteredTasks(context.tasks.filter((item) => !item.completed));
    } else {
      setFilteredTasks(context.tasks.filter((item) => item.completed));
    }
  };

  const renderCheckmark = (completed) => {
    if (completed) {
      return (
        <Text style={styles.checkmark}>&#10003;</Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>Welcome to Threedo!</Text>
      <Text style={styles.secondHeaderText}>Today's Date:</Text>
      <Text>{currentDate}</Text>
      <View style={styles.inputContainer}>
        <Button title="Add Task" onPress={() => {navigation.navigate('Add')} } />
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={({item}) => {
          <TouchableHighlight key={item.id} onPress={() => handleItemClick(item)} underlayColor="lightgray">
            <View style={styles.listItem}>
              <Text style={styles.checkmarkContainer}>
                {renderCheckmark(item.completed)}
              </Text>
              <Text style={styles.taskItem}>{item.value}</Text>
              <Text>Duration: {item.duration}</Text>
              <Text>Date Added: {item.date.toDateString()}</Text>
              {item.completed && (
                  <Text>
                    Date Completed: {item.dateCompleted ? new Date(item.dateCompleted).toDateString() : 'not completed'}
                    </Text>
                )}
              <Button title="X" onPress={() => context.removeTask(item.id)} />
            </View>
          </TouchableHighlight>
        }}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.secondHeaderText}>Tasks:</Text>
      <Button title={`Show ${showCompleted ? 'Incompleted' : 'Completed'}`} onPress={toggleShowCompleted} />

      <FlatList
        data={filteredTasks}
        renderItem={({item}) => (
            <TouchableHighlight key={item.id} onPress={() => handleItemClick(item)} underlayColor="lightgray">
              <View style={styles.listItem}>
                <Text style={styles.checkmarkContainer}>
                  {renderCheckmark(item.completed)}
                </Text>
                <Text style={styles.taskItem}>{item.value}</Text>
                <Text>Duration: {item.duration}</Text>
                <Text>Date Added: {item.date.toDateString()}</Text>
                {item.completed && (
                  <Text>
                    Date Completed: {item.dateCompleted ? new Date(item.dateCompleted).toDateString() : 'not completed'}
                    </Text>
                )}
                <Button title="X" onPress={() => context.removeTask(item.id)} />
              </View>
            </TouchableHighlight>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    lineHeight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  },
  taskItem: { 
    color: 'black'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 20,
  },
  checkmarkContainer: {
    marginRight: 10,
  },
});

export default Home;
