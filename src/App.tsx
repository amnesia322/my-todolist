import React, {useState} from 'react';
import './App.css';
import ToDoList from "./components/ToDoList";
import {v1} from "uuid";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'Fight club', isDone: true},
        {id: v1(), title: 'Devil\'s Advocate', isDone: true},
        {id: v1(), title: 'Brigada', isDone: false},
        {id: v1(), title: 'Batman', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const addTask = (title: string) => {
        if (title) {
            const newTask = {id: v1(), title, isDone: false}
            setTasks([newTask, ...tasks])
        }

    }
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const getFilteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter(t => t.isDone)
            case 'active':
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <ToDoList title="What to watch?" tasks={getFilteredTasks()} addTask={addTask} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
