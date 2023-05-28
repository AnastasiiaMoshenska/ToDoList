import styles from './MainPage.module.scss';
import TodoItem from "../TodoItem/TodoItem";
import NewItem from "../NewItem/NewItem";
import {useCallback, useEffect, useState} from "react";
import Task from "../../model/Task";
import {RestClient} from "../../rest-client/RestClient";
import Category from "../../model/Category";
export default function MainPage(){
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(
        () => {
            RestClient.getCategories().then(
                categories => setCategories(categories)
            )
        }, []
    )

    useEffect(
        () => {
            RestClient.getTasks().then(
                tasks => setTasks(tasks)
            )
        }, []
    )

    const sendClick=(newTasks: any)=>{
        setTasks(newTasks)
    }

    const sendDeleteClick=(newTasks: any)=>{
        setTasks(newTasks)
    }

    return(
        <div className={styles.MainPage}>
            <h1>ToDo List</h1>
            <div>
                <NewItem
                    categories={categories}
                    receiveClick={sendClick}
                ></NewItem>
            </div>
            <h3>Items</h3>
            <div className={styles.wrapper}>
                {tasks.map((task: Task) => (
                    <TodoItem
                    key={task.id}
                    task={task}
                    categories={categories}
                    receiveClick={sendDeleteClick}
                    ></TodoItem>
                ))}
            </div>
        </div>
    )
}