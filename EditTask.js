import React, { useState } from 'react';
import AppContext from './AppContext';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';


const EditTask = ({ route, navigation }) => {
    const context = React.useContext(AppContext);
    const { tasks } = route.params;

    const [updatedTaskValue, setUpdatedTaskValue] = useState('');
    const [updatedTaskDuration, setUpdatedTaskDuration] = useState(0);


    const handleSavePress = () => {
        console.log('handleSavePress clicked');
        const updatedTask = {
            ...tasks, value: updatedTaskValue, duration: updatedTaskDuration,
        };

        context.updateTask(updatedTask);

        // Sending updatedTask back to TaskDetail page
        navigation.navigate('TaskDetail', { tasks: updatedTask });
        console.log('moving back to task detail page');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Edit Name"
                onChangeText={setUpdatedTaskValue}
                value={updatedTaskValue}
            />
            <TextInput
                style={styles.input}
                placeholder='Edit Duration'
                onChangeText={setUpdatedTaskDuration}
                value={updatedTaskDuration.toString()}

            />
            <Button title="Save" onPress={handleSavePress} />
            <Button title="Cancel" onPress={() => navigation.goBack() } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 16,
    },
});

export default EditTask;
