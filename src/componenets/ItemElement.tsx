import { useContext, useEffect, useState } from "react";
import { TodoContext, type Item } from "../context-providers/context-provider";
import style from "../styles/ItemElement.module.css"

export default function ItemElement({ data }: { data: Item }) {
    if (!data) return null;
    const [item, setItem] = useState(data);
    const {items, setItems}= useContext(TodoContext);
    const [index, setIndex] = useState<number>(-1);
    
    useEffect(() => {
        const index = items.findIndex(itemInItems => itemInItems.id === item.id);
        if(index != -1) {
            setIndex(index);
        }
    })

    if(index == -1) return;



    const onChangeHandler= async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.disabled = true;
        e.preventDefault();

        const req = await fetch(`http://localhost:3000/items`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({id:item.id})
        });

        if(req.status == 200) {
            const data = await req.json();

            if(data) {
                setItem(data);
                let modder = items;
                modder[index] = data;
                setItems(modder);
            }
        }

        e.target.disabled = false;
    }

    return (
        <tr className={style.tr}>
            <td className={style.cell}>{item.name}</td>
            <td className={style.cell}>{item.task}</td>
            <td className={style.cell}>
                <input type="checkbox" checked={item.finished} onChange={async(e) => await onChangeHandler(e)}/>
            </td>
        </tr>
    );
}