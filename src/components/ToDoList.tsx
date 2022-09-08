import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
}

const ToDoList = (props: ToDoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAddTask = () => {
        if (title.trim() === '') {
            setError(true)
            return
        }
        props.addTask(title.trim())
        setTitle('')
    }
    const onBlurInputError = () => {
        title.trim() === '' ? setError(true) : setError(false)
    }
    const onClickRemoveTask = (taskID: string) => {
        props.removeTask(taskID)
    }
    const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }


    const taskItem = props.tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={(e)=> props.changeStatus(t.id, e.currentTarget.checked)}/>
        <span>{t.title}</span>
        <button onClick={() => onClickRemoveTask(t.id)}>x</button>
    </li>)
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title} onChange={onChangeHandler} onBlur={onBlurInputError}/>
                    <button onClick={onClickAddTask }>+</button>
                    {error && <div>Name is require!</div>}
                </div>
                <ul>
                    {taskItem}
                </ul>
                <div>
                    <button onClick={() => onClickFilterHandler('all')}>All</button>
                    <button onClick={() => onClickFilterHandler('active')}>Active</button>
                    <button onClick={() => onClickFilterHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;