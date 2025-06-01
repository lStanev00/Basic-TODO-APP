import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../context-providers/context-provider";
import style from "../styles/FormAction.module.css";
import type { Item } from "../context-providers/context-provider";

export default function FormAction() {
    const { addItem, action, setAction, editItem } = useContext(TodoContext);

    const [name, setName] = useState<string>("");
    const [task, setTask] = useState<string>("");
    const [finished, setFinished] = useState<boolean>(false);
    const [id, setId] = useState<number | undefined>(undefined);

    useEffect(() => {

        const logic = () => {
            if (typeof action == `string`) {return}

            if(action?.id) {
                setName(action.name);
                setTask(action.task);
                setFinished(action.finished);
                setId(action.id);
            }

        }
        logic();
        
    }, [action])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !task.trim()) return;

        if(id) {

            const edditedItem: Item = {
                name: name,
                task: task,
                finished: finished,
                id: id
            }

            await editItem(edditedItem, "edit")

        } else {
            
            await addItem(name.trim(), task.trim(), finished);

        }
        setName("");
        setTask("");
        setFinished(false);
        setId(undefined);

    };

    return (<>

        	<button className={style.btn} onClick={()=> setAction(`new`)}>Submit new task</button>

            {action && (

                <form className={style.form} onSubmit={async (e) => await handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Task name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={style.input}
                    />
                    <input
                        type="text"
                        placeholder="Task description"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className={style.input}
                    />
                    <label className={style.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={finished}
                            onChange={(e) => setFinished(e.target.checked)}
                        />
                        Finished?
                    </label>
                    <button type="submit" className={style.btn}>{id==undefined ? "Add" : "Edit"} Task</button>
                </form>
            )}


    </>
    );
}
