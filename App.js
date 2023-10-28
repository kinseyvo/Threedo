import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppContext from './AppContext';
import Home from './Home';
import Add from './Add';
import TaskDetail from './TaskDetail';
import EditTask from './EditTask';


const Stack = createNativeStackNavigator();

const App = () => { 
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask, duration) => {
    console.log("adding ",newTask)
    if (newTask.trim().length > 0) {
      setTasks([...tasks, {
        id: Date.now().toString(), value: newTask.trim(), duration: duration, completed: false, date: new Date(), dateCompleted: null
      }]);
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    console.log("removing ",taskId);
  };

  const updateTask = (taskToUpdate) => {
    //(taskId, newTaskValue) or (taskId) or (newTaskValue)
    //map() or filter()
    //id == updTas
    //? up : task))
    //tenary: express ? true : false
    setTasks(tasks.map((task) => task.id == taskToUpdate.id ? taskToUpdate : task));
  };

  const contextValue = {
    tasks,
    addTask,
    removeTask,
    updateTask
  };

  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} initialParams={{removeTask, tasks}}/>
          <Stack.Screen name="Add" component={Add} initialParams={addTask}/>
          <Stack.Screen name="TaskDetail" component={TaskDetail} initialParams={tasks}/>
          <Stack.Screen name="EditTask" component={EditTask} initialParams={{tasks, updateTask}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
 }

  export default App;
