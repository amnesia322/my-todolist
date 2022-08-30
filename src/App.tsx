import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";
import {v1} from "uuid";

export type FilterType = "all" | 'active' | 'completed'

function App() {
    //BLL:
    const [tasks, setTasks] = useState<Array<TaskType>>( [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS&TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterType>('all')

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const getFilteredTasks = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t=> !t.isDone)
            case "completed":
                return tasks.filter(t=> t.isDone)
            default:
                return tasks
        }

    }

    //UI:
    return (
        <div className="App">
            <ToDoList title="What to learn" tasks={getFilteredTasks()} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
