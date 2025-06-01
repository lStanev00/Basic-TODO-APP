import { useContext } from "react";
import { TodoContext } from "../context-providers/context-provider";
import ItemElement from "./ItemElement";
import style from "../styles/ItemsTable.module.css";

export default function ItemsTable() {
    const {tableContent} = useContext(TodoContext);


    if (tableContent) return (<>

        <table className={style.table}>
            <thead>
                <tr>
                    <th>Task name</th>
                    <th>Task description</th>
                    <th>Is it Finished?</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {tableContent && tableContent.map(item => <ItemElement key={item.id} data={item} />)}
            </tbody>
        </table>


    </>)
}