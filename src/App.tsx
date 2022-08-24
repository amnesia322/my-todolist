import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";



function App() {
    //BLL:

    const [tasks, setTasks] = useState<Array<TaskType>>( [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS&TS", isDone: true},
            {id: 3, title: "REACT", isDone: false},
        ]
    )



    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    //UI:
    return (
        <div className="App">
            <ToDoList title="What to learn" tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
