import React from 'react';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
}

type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el: TaskPropsType) => {
                        return (
                            <>
                                <li key={el.id}>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;