import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type ToDoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const taskItem = props.tasks.length ? props.tasks.map(t => {
    return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}  </span>
        <button onClick={() => {
            props.removeTask(t.id)
        }}>x
        </button>
    </li>
}) : <span>Task-List is empty</span>
    const onClickAddTask = () =>{
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value)
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onClickAddTask()
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeInputHandler} onKeyDown={onKeyDownAddTask}/>
                <button onClick={ ()=>{onClickAddTask()} }>+</button>
            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;