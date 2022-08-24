import React from 'react';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type ToDoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}  </span>
                        <button onClick={() => {props.removeTask(t.id)
                        }}>x
                        </button>
                    </li>
                })}

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;