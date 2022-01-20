import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksPropsType} from "./App";

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksPropsType>
    filter: FilterValuesType
    removeTasks: (id: string, todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addNewTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    removeTodoList: (todolistID:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const addNewTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addNewTask(trimTitle, props.todolistID)
            setTitle('')
        } else {
          setError("Title is required")
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (e.key === "Enter") {
            addNewTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.todolistID)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todolistID)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todolistID)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTasks(t.id, props.todolistID)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID)
                        return <li key={t.id} className={t.isDone?'is-done':""}><input type="checkbox" checked={t.isDone}
                                                     onChange={(onChangeHandler)}/> <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter==='all'?"active-filter":""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter==='active'?"active-filter":""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter==='completed'?"active-filter":""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;