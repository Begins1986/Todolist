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


    const removeTasks = (id: string, todoListID: string ) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== id)
        setTasks(copyTasks)
    }

    const addNewTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))
    }

    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    return <Todolist title={tl.title}
                                     filter={tl.filter}
                                     tasks={tasksForTodolist}
                                     removeTasks={removeTasks}
                                     changeFilter={changeFilter}
                                     addNewTask={addNewTask}
                                     changeTaskStatus={changeTaskStatus}
                    />
                })
            }


        </div>
    );
}

export default App;
