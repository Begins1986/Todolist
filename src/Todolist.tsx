import React from 'react';
import {FilterValuesType, TasksPropsType} from "./App";

type TodolistPropsType = {
    title:string
    tasks: Array<TasksPropsType>
    filter: FilterValuesType
    removeTasks:(id:string)=>void
    changeFilter: (filter: FilterValuesType)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t =><li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={()=>{props.removeTasks(t.id)}}>X</button></li>)
                }


                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;