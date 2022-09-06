import React, {ChangeEvent, useState} from 'react';
import {FilterValueType, TasksType} from "../App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TasksType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueType) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    const [title, setTitle] = useState('')
   /* const [error, setError] = useState<boolean>(false)*/
    const onClickAddTask = () => {
        if (title.trim() === '') {
            return;
        }
        props.addTask(title.trim())
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handlerFilterButton = (filter: FilterValueType) => {
        return () => {
            props.changeFilter(filter)
        }
    }
    const onChangeStatusTaskHandler = (taskID: string) => {
        return (e: ChangeEvent<HTMLInputElement>)=> props.changeStatus(taskID, e.currentTarget.checked)
    }

    const tasksItems = props.tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={onChangeStatusTaskHandler(t.id)}/>
        <span>{t.title}</span>
        <button onClick={() => props.removeTask(t.id)}>x</button>
    </li>)

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input onChange={onChangeHandler} value={title}/>
                    <button onClick={onClickAddTask}>+</button>
                </div>
                <ul>
                    {tasksItems}
                </ul>
                <div>
                    <button onClick={handlerFilterButton('all')}>All</button>
                    <button onClick={handlerFilterButton('active')}>Active</button>
                    <button onClick={handlerFilterButton('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;