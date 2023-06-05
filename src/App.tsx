import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type FilterValueType = 'All'| 'Active'|'Completed'

function App() {

    let [tasks, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    let [filter, setFilter]=useState('All')

    const removeTask=(taskId: number)=>{
        setTask(tasks.filter(t=>t.id!==taskId))
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
            />
        </div>
    );
}

export default App;
