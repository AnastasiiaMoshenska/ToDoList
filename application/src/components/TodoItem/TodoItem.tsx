import styles from './TodoItem.module.scss';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import Category from "../../model/Category";
import {RestClient} from "../../rest-client/RestClient";
import {Form} from "rsuite";
import {useState} from "react";
import Task from "../../model/Task";

export default function TodoItem(props: any) {
    const [category, setCategory] = useState(props.task.category.name);
    const [editBtn, setSetEditBtn] = useState("Edit");
    const [readOnly, setReadOnly] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState<string>(props.task.name);
    const [description, setDescription] = useState<string>(props.task.description);
    const [date, setDate] = useState(new Date(props.task.deadline).toISOString().substring(0, 10));

    const formattedDate = props.task.deadline.slice(0,10);
    const deleteItem = () => {
        RestClient.deleteTask(props.task.id).then(
            () => {
                RestClient.getTasks().then(
                    (data) => {
                        console.log(data);
                        props.receiveClick(data)
                    }
                )
            }
        )
    }

    const changeCategory = (event) => {
        setCategory(event.target.innerText);
    }

    const changeName = event => {
        setName(event.target.value);
    };
    const changeDescription = event => {
        setDescription(event.target.value);
    };
    const changeDate = event => {
        setDate(event.target.value);
    };


    const editItems = () => {
        if (editBtn == "Save" && name.length != 0) {
            setSetEditBtn("Edit")
            setReadOnly(true)
            setDisabled(true)
            const task: Task = {
                id: props.task.id,
                name: name,
                description: description,
                deadline: new Date(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10)),
                category: props.categories.find(s => category == s.name)
            }
            RestClient.updateTask(task).then(
                () => {
                    //promise
                }
            )
        }else{
            setSetEditBtn("Save")
            setReadOnly(false)
            setDisabled(false)
        }
    }

    return (
        <Form className={styles.TodoItem}>
            <input
                className={styles.name}
                readOnly={readOnly}
                value={name}
                onChange={changeName}
                required={true}
            />
            <input
                className={styles.description}
                defaultValue={props.task.description}
                readOnly={readOnly}
                onChange={changeDescription}
            />
            <div className={styles.calendar}>
                <input
                    id="item-date"
                    type="date"
                    defaultValue={formattedDate}
                    readOnly={readOnly}
                    onChange={() => changeDate(event)}
                />
            </div>
            <Dropdown className={styles.drop} disabled={disabled} title={category}>
                {props.categories.map((category: Category) => (
                    <Dropdown.Item
                        key={category.id}
                        onClick={() => changeCategory(event)}
                    >{category.name}</Dropdown.Item>
                ))}
            </Dropdown>
            <button onClick={editItems}>{editBtn}</button>
            <button onClick={deleteItem}>Delete</button>
        </Form>
    )
}