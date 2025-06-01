import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context-providers/context-provider";

export default function SelectSort() {
    const [value, setValue] = useState<string>(`all`);
    const {items, setTableContent} = useContext(TodoContext);

    useEffect(() => {
        if(items.length == 0) return;
        filterOnChange(value)
    }, [value, items])

    const filterOnChange = (val:string) => {
        const value = val;

        let filtered = items;

        if(value == `finished`) filtered = items.filter(item => item.finished)
        else if (value == `inProgress`) filtered = items.filter(item => !(item.finished))

        return setTableContent(filtered);

    }


    return (
        <select onChange={(e) => setValue(e.target.value)}>
            <option value="all">All</option>
            <option value="inProgress">In Progress</option>
            <option value="finished">Finished</option>
        </select>
    )
}