import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksPropsType} from "./App";

type TodolistPropsType = {
    title:string
    tasks: Array<TasksPropsType>
    filter: FilterValuesType
    removeTasks:(id:string)=>void
    changeFilter: (filter: FilterValuesType)=>void
    addNewTask: (title:string)=>void
    changeTaskStatus: (id:string, isDone:boolean)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const addNewTask = ()=>{
        const trimTitle = title.trim()
        if(trimTitle) {
            props.addNewTask(trimTitle)
        }
        setTitle('')
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter"){
            addNewTask()
        }
    }
    const onAllClickHandler = ()=>{props.changeFilter('all')}
    const onActiveClickHandler = ()=>{props.changeFilter('active')}
    const onCompletedClickHandler = ()=>{props.changeFilter('completed')}


    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addNewTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTasks(t.id)
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> props.changeTaskStatus(t.id, e.currentTarget.checked)
                        return <li key={t.id}><input type="checkbox" checked={t.isDone}
                        onChange={(onChangeHandler)}/> <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;