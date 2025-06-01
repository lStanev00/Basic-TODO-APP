import { useContext } from "react";
import { TodoContext } from "../context-providers/context-provider";

export default function SelectSort() {
    const context = useContext(TodoContext);
    if (!context) return;
    const {items, setTableContent} = context;
    if(items.length == 0) return;

    const filterOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        let finised = items;

        if(value == `finished`) finised = items.filter(item => item.finished)
        else if (value == `inProgress`) finised = items.filter(item => !(item.finished))

        return setTableContent(finised);

    }


    return (
        <select onChange={(e) => filterOnChange(e)}>
            <option value="all">All</option>
            <option value="inProgress">In Progress</option>
            <option value="finished">Finished</option>
        </select>
    )
}