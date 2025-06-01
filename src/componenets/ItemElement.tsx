import { useContext, useEffect, useState } from "react";
import { TodoContext, type Item } from "../context-providers/context-provider";
import style from "../styles/ItemElement.module.css"

export default function ItemElement({ data }: { data: Item }) {
    if (!data) return null;
    const [item, setItem] = useState<Item>(data);
    const {items, setItems , editItem , setAction }= useContext(TodoContext);
    const [index, setIndex] = useState<number>(-1);
    
    useEffect(() => {
        const index = items.findIndex(itemInItems => itemInItems.id === item.id);
        if(index != -1) {
            setIndex(index);
        }
    })

    useEffect(()=>{
        if (index != -1) {
            setItem(items[index]);
        }
    },[items])
    
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
                const modder = [...items];
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
            <td className={style.cell}>
                <button onClick={() => setAction(item)} className={style.btn}>Edit</button>
                <button className={`${style.btn} ${style.delete}`} onClick={async() => await editItem(item, "delete")}>Delete</button>
            </td>
        </tr>
    );
}