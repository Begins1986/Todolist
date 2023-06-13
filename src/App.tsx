import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import Todolist from "./Todolist";

export type FilterValueType = 'All'| 'Active'|'Completed'

function App() {

    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    let [filter, setFilter]=useState<FilterValueType>('All')

    const removeTask=(taskId: string)=>{
        setTask(tasks.filter(t=>t.id!==taskId))
    }

    const addTask = (title: string)=>{
        setTask([{id: v1(), title: title, isDone: true}, ...tasks])
    }

    const changeStatus =(taskId:string, checkedValue:boolean)=>{
        setTask(tasks.map(el=>el.id===taskId?{...el,isDone:checkedValue}:el))

    }

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    let taskForTodolist = tasks
    if (filter==='Active') {
        taskForTodolist = tasks.filter(el=>!el.isDone)
    }
    if (filter==='Completed') {
        taskForTodolist = tasks.filter(el=>el.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
