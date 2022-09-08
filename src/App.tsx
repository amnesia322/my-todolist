import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const addTask = (title: string) => {
        const newTask = { id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTask = (taskID: string) => {
setTasks(tasks.filter(t => t.id !== taskID))
    }
    const changeStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id !== taskID ? t : {...t, isDone}))

    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const getFilteredTasks = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <ToDoList title='What to learn?' tasks={getFilteredTasks()}
                      removeTask={removeTask} addTask={addTask}
                      changeFilter={changeFilter} filter={filter}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
