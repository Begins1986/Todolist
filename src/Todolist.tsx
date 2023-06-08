import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
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

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
            addTaskHandler()
        }
    }

    const changeFilterHandler = (filter:FilterValueType) =>{
        props.changeFilter(filter)
    }

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input

                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler}>+
                </button>
            </div>
            <ul>
                {props.tasks.map((el: TaskPropsType) => {

                    const removeTask = () =>{
                        props.removeTask(el.id)
                    }

                        return (
                            <>
                                <li key={el.id}>
                                    <button onClick={removeTask}>х
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
                <button onClick={() => changeFilterHandler('All')}>All</button>
                <button onClick={() => changeFilterHandler('Active')}>Active</button>
                <button onClick={() => changeFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;