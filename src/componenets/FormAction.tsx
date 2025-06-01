import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../context-providers/context-provider";
import style from "../styles/FormAction.module.css";

export default function FormAction() {
    const { addItem, action, setAction } = useContext(TodoContext);

    const [name, setName] = useState("");
    const [task, setTask] = useState("");
    const [finished, setFinished] = useState(false);
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

            logic();
        }

    }, [action])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !task.trim()) return;

        addItem(name.trim(), task.trim(), finished);
        setName("");
        setTask("");
        setFinished(false);
    };

    return (<>

        	<button className={style.btn} onClick={()=> setAction(`new`)}>Submit new task</button>

            {action && (

                <form className={style.form} onSubmit={handleSubmit}>
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
