import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = ('all' | 'active' | 'completed')

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TasksPropsType>
}

function App() {
    const TodoList_1 = v1()
    const TodoList_2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
            {id: TodoList_1, title: "What to learn?", filter: 'all'},
            {id: TodoList_2, title: "What to Buy?", filter: 'all'},
        ]
    )
    const [tasks, setTasks] = useState<TaskStateType>({
        [TodoList_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Rest Api", isDone: false},
        ],
        [TodoList_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Coffee", isDone: false},
            {id: v1(), title: "Water", isDone: false},
        ],
    })

    // const [filter, setFilter] = useState<FilterValuesType>('all')
    // const [tasks, setTask] = useState <Array<TasksPropsType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: false},
    //     {id: v1(), title: "React", isDone: false},
    // ])


    const removeTasks = (id: string, todolistID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].filter(t => t.id !== id)
        setTasks(copyTasks)
    }

    const addNewTask = (title: string, todolistID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = [{id: v1(), title, isDone: false}, ...tasks[todolistID]]
        setTasks(copyTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === id ? {...t, isDone} : t)
        setTasks(copyTasks)
    }

    const changeFilter = (filter: FilterValuesType, todolistID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    const removeTodoList = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        const copyTasks = {...tasks}
        delete copyTasks[todolistID]
        setTasks(copyTasks)
    }

    const getTaskForRender = (filter:FilterValuesType, tasks: Array<TasksPropsType>): Array<TasksPropsType> =>{
        switch (filter){
            case "completed":
                return tasks.filter(t=>t.isDone)
            case "active":
                return tasks.filter(t=>!t.isDone)
            default:
                return tasks
        }
    }



    const todoListComps = todoLists.map(tl => {
        // let allTodoListTasks = tasks[tl.id]
        // let tasksForTodolist = tasks
        // if (tl.filter === 'active') {
        //     tasksForTodolist = allTodoListTasks.filter(t => !t.isDone)
        // }
        // if (tl.filter === 'completed') {
        //     tasksForTodolist = allTodoListTasks.filter(t => t.isDone)
        // }
        return <Todolist
            key={tl.id}
            todolistID={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={getTaskForRender(tl.filter, tasks[tl.id])}
            removeTasks={removeTasks}
            changeFilter={changeFilter}
            addNewTask={addNewTask}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
        />
    })

    return (
        <div className="App">
            {todoListComps}
        </div>
    );
}

export default App;
