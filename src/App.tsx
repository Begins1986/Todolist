import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type TasksPropsType = {
    id:number
    title:string
    isDone: boolean
}

export type FilterValuesType = ('all'| 'active'| 'completed')

function App() {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [tasks, setTask] = useState <Array<TasksPropsType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: false},
    ])
    const changeFilter = (filter: FilterValuesType) =>setFilter(filter)

    const removeTasks = (id: number) => {
        setTask(tasks.filter(t => t.id != id))
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
            />

        </div>
    );
}



export default App;
