import { useContext } from "react";
import { TodoContext } from "../context-providers/context-provider";
import ItemElement from "./ItemElement";

export default function ItemsTable() {
    const context = useContext(TodoContext);
    if(!context) return;
    const {items} = context;


    if (items) return (<>

        {items && items.map(item => <ItemElement data={item} />)}

    </>)
}