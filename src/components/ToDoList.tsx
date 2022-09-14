import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    toDoListID: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    removeToDoList: (id: string) => void
    changeFilter: (filter: FilterValuesType, toDoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
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
        props.addTask(title.trim(), props.toDoListID)
        setTitle('')
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const onBlurInputError = () => title.trim() === '' ? setError(true) : setError(false)
    const onClickRemoveTask = (taskID: string) => props.removeTask(taskID, props.toDoListID)
    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(value, props.toDoListID)
    const onClickRemoveToDoList = () => {props.removeToDoList(props.toDoListID)
    }

    const taskItem = props.tasks.map(t => <li key={t.id} className={t.isDone ? 'done' : 'task'}>
        <input type="checkbox" checked={t.isDone}
               onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked, props.toDoListID)}/>
        <span>{t.title}</span>
        <button onClick={() => onClickRemoveTask(t.id)} style={{backgroundColor: '#ADCACB'}}>x</button>
    </li>)
    return (
        <div>
            <div>
                <h3 style={{color: '#058240'}}>{props.title} <button onClick={onClickRemoveToDoList}>x</button></h3>
                <div>
                    <input value={title} onChange={onChangeHandler} onBlur={onBlurInputError}
                           className={error ? 'errorInput' : ''} onKeyDown={onKeyDownAddTask}/>
                    <button onClick={onClickAddTask} className='button'>+</button>
                    {error && <div className='error'>Name is require!</div>}
                </div>
                <ul>
                    {taskItem}
                </ul>
                <div>
                    <button onClick={() => onClickFilterHandler('all')}
                            className={props.filter === 'all' ? 'active-filter' : 'button'}>All
                    </button>
                    <button onClick={() => onClickFilterHandler('active')}
                            className={props.filter === 'active' ? 'active-filter' : 'button'}>Active
                    </button>
                    <button onClick={() => onClickFilterHandler('completed')}
                            className={props.filter === 'completed' ? 'active-filter' : 'button'}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;