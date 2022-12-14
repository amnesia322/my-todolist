import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
type toDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [toDoLists, setToDoLists] = useState<Array<toDoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeToDoList = (id: string) => setToDoLists(toDoLists.filter(t=> t.id !== id))
    const addTask = (title: string, toDoListID: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [toDoListID]: [newTask, ...tasks[toDoListID]]})
    }
    const removeTask = (taskID: string, toDoListID: string) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(t => t.id !== taskID)})
    }
    const changeStatus = (taskID: string, isDone: boolean, toDoListID: string) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map(t => t.id !== taskID ? t : {...t, isDone})})

    }
    const changeFilter = (filter: FilterValuesType, toDoListID: string) => {
        setToDoLists(toDoLists.map(t => t.id === toDoListID ? {...t, filter} : t))
    }


    return (
        <div className="App">
            {toDoLists.map(t => {
                const getFilteredTasks = () => {
                    switch (t.filter) {
                        case "active":
                            return tasks[t.id].filter(t => !t.isDone)
                        case "completed":
                            return tasks[t.id].filter(t => t.isDone)
                        default:
                            return tasks[t.id]
                    }
                }
                return (
                    <ToDoList key={t.id} toDoListID={t.id}
                              title={t.title} tasks={getFilteredTasks()}
                              removeTask={removeTask} removeToDoList={removeToDoList} addTask={addTask}
                              changeFilter={changeFilter} filter={t.filter}
                              changeStatus={changeStatus}/>
                )
            })}


        </div>
    );
}

export default App;
