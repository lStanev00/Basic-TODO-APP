import { useContext } from "react";
import { TodoContext } from "../context-providers/context-provider";
import ItemElement from "./ItemElement";
import style from "../styles/ItemsTable.module.css";

export default function ItemsTable() {
    const context = useContext(TodoContext);
    if(!context) return;
    const {items} = context;


    if (items) return (<>

        <table className={style.table}>
            <thead>
                <tr>
                    <th>Task name</th>
                    <th>Task description</th>
                    <th>Is it Finished?</th>
                </tr>
            </thead>
            <tbody>
                {items && items.map(item => <ItemElement key={item.id} data={item} />)}
            </tbody>
        </table>


    </>)
}