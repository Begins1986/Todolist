import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import Button from "./Components/Button";
import styles from './Todolist.module.css'


type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (Filter: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskId:string, checkedValue:boolean)=>void
    filter:FilterValueType
}

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string|null>(null)

    const addTaskHandler = () => {
        if (title.trim()){
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is requared')
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)

    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
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
                    className={error? styles.error : ''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <Button name={'+'} callback={addTaskHandler}/>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((el: TaskPropsType) => {
                    const removeTask = () =>{
                        props.removeTask(el.id)
                    }
                    const onCheckedHandler =(e:ChangeEvent<HTMLInputElement>) =>{
                        props.changeStatus(el.id, e.currentTarget.checked)
                    }
                        return (
                            <>
                                <li key={el.id} className={el.isDone?styles.isDone:''}>
                                    {/*<button onClick={removeTask}>х</button>*/}
                                    <Button name={'x'} callback={removeTask}/>
                                    <input type="checkbox" checked={el.isDone} onChange={onCheckedHandler}/>
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
                {/*<Button name={'All'} callback={() => changeFilterHandler('All')}/>*/}
                {/*<Button name={'Active'} callback={() => changeFilterHandler('Active')}/>*/}
                {/*<Button name={'Completed'} callback={() => changeFilterHandler('Completed')}/>*/}
                <button className={props.filter==='All'?styles.activeFilter:''} onClick={() => changeFilterHandler('All')}>All</button>
                <button className={props.filter==='Active'?styles.activeFilter:''} onClick={() => changeFilterHandler('Active')}>Active</button>
                <button className={props.filter==='Completed'?styles.activeFilter:''} onClick={() => changeFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;