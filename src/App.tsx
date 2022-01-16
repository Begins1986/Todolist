import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TasksPropsType = {
    id:string
    title:string
    isDone: boolean
}

export type FilterValuesType = ('all'| 'active'| 'completed')

function App() {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [tasks, setTask] = useState <Array<TasksPropsType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ])
    const changeFilter = (filter: FilterValuesType) =>setFilter(filter)

    const removeTasks = (id: string) => {
        setTask(tasks.filter(t => t.id !== id))
    }

    const addNewTask = (title: string) =>{
        setTask([{id: v1(), title, isDone: false}, ...tasks])
    }

    let tasksForTodolist = tasks
    if (filter=== 'active'){
        tasksForTodolist = tasks.filter(t=>!t.isDone)
    }
    if (filter=== 'completed'){
        tasksForTodolist = tasks.filter(t=>t.isDone)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      filter={filter}
                      tasks={tasksForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addNewTask={addNewTask}
            />
        </div>
    );
}

export default App;
