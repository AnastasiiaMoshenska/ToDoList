import styles from './NewItem.module.scss';
import Dropdown from "rsuite/Dropdown";
import {useState} from "react";
import Category from "../../model/Category";
import {RestClient} from "../../rest-client/RestClient";
import Task from "../../model/Task";
import {Form} from "rsuite";

export default function NewItem(props: any) {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState("Home");
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
    const [id, setId] = useState(Math.floor(1000000 + Math.random() * 9000000));

    const changeValue = (event) => {
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

    function handleClick() {
        const task: Task = {
            id: id,
            name: name,
            description: description,
            deadline: new Date(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10)),
            category: props.categories.find(s => category == s.name)
        }

        if (task.name != "") {
            RestClient.addTask(task).then(
                () => {
                    setId(id + 1);
                    RestClient.getTasks().then(
                        (data) => {
                            console.log(data);
                            props.receiveClick(data)
                        })
                })
        }
    }

    return (
        <Form className={styles.NewItem}>
            <h6>Add new item</h6>
            <div className={styles.wrapper}>
                <input
                    placeholder="name"
                    required={true}
                    onChange={changeName}
                />
                <input
                    placeholder="description"
                    onChange={changeDescription}
                />
                <div className={styles.dropdown__wrapper}>
                    <div className={styles.calendar}>
                        <input
                            defaultValue={date}
                            required={true}
                            type="date"
                            onChange={() => changeDate(event)}
                        />
                    </div>
                    <p className={styles.label}>Category:</p>
                    <Dropdown className={styles.dropdown} title={category}>
                        {props.categories.map((category: Category) => (
                            <Dropdown.Item
                                key={category.id}
                                onClick={() => changeValue(event)}
                            >{category.name}</Dropdown.Item>
                        ))}
                    </Dropdown>
                    <div className={styles.category__description}>
                        <p className={styles.category__label}>Category description:</p>
                        <div>{props.categories.length > 0 ? props.categories.find(s => category == s.name).description : " "}</div>
                    </div>
                </div>
                <button className={styles.add} onClick={handleClick}>Add</button>
            </div>
        </Form>
    )
}