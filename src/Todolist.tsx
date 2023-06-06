import React, {useState} from 'react';
import {FilterValueType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (Filter: FilterValueType) => void
    addTask: (title: string) => void
}

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input

                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    onKeyPress={(e)=>{
                        console.log(e.key)
                        if(e.key==='Enter'){
                            addTaskHandler()
                        }
                    }

                    }
                />
                <button onClick={addTaskHandler}>+
                </button>
            </div>
            <ul>
                {props.tasks.map((el: TaskPropsType) => {
                        return (
                            <>
                                <li key={el.id}>
                                    <button onClick={() => {
                                        props.removeTask(el.id)
                                    }}>х
                                    </button>
                                    <input type="checkbox" checked={el.isDone}/>
                                    <span>{el.title}</span></li>
                            </>

                        )
                    }
                )}
                {/*<li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
                {/*<li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
                {/*<li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('All')}>All</button>
                <button onClick={() => props.changeFilter('Active')}>Active</button>
                <button onClick={() => props.changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;