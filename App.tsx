import {StatusBar} from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, {ReactElement, ReactNode, useState} from "react";
import {Button} from "react-native";

export default function App() {
  const [value, setValue] = useState('')
  const [isShow, setIsShow] = useState(null)
  const [tasks, setTasks] = useState([
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: false},
    {id: 3, title: 'React', isDone: true},
    {id: 4, title: 'Js', isDone: false}
  ])

  const addTask = () => {
    const task = {id: tasks.length + 1, title: value, isDone: false}
    setTasks([...tasks, task]);
    setValue('')
  }


  const deleteTask = (id: number) => {
    const filterTasks = tasks.filter(t => t.id !== id)
    setTasks(filterTasks)
  }

  // const changeStatus = (id: number, done: boolean) => {
  //   const changeTask = tasks.find(t => t.id === id)
  //
  //   if(changeTask) {
  //     changeTask.isDone = !done;
  //   }
  //   setTasks([...tasks])
  //  alert(JSON.stringify(tasks))
  // }

  const changeStatus = (id: number, status: boolean) => {
    setTasks(tasks.map(t => t.id === id ? {...t, isDone: !status} : t))
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <HideKeyboard>
          <View>
            <TextInput style={styles.input} value={value} onChangeText={setValue}/>
          </View>
        </HideKeyboard>
        <View style={styles.button}>
          <Button color={'#86b300'} title={'Add task'} onPress={addTask}/>
        </View>
        <View style={styles.button}>
          <Button color={'#86b300'} title={'Add task'} onPress={addTask}/>
        </View>
        <View style={styles.tasks_block}>
            {tasks.map(t => <View style={styles.task_container} key={t.id}>
              <Text>{t.title}</Text>
              <Checkbox
                value={t.isDone}
                onValueChange={() => changeStatus(t.id, t.isDone)}
                style={styles.checkbox}
              />
              <Button title={'delete'} onPress={() => deleteTask(t.id)}/>
            </View>)}
          </View>
      </View>
    </View>
  );
}

const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => {
  return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 350,
    width: '100%'
  },
  tasks_block: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // width: 100,
  },
  input: {
    width: 200,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'blue',
    color: 'white',
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 1
  },
  checkbox: {
    backgroundColor: 'red',
    marginLeft: 20,
    margin: 5,
  },
  task_container: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingLeft: 15,
    paddingRight: 15
  }
});


