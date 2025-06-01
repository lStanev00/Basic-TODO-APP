import type { Item } from "../context-providers/context-provider";
import style from "../styles/ItemElement.module.css"

export default function ItemElement({ data }: { data: Item }) {
    if (!data) return null;

    return (
        <tr className={style.tr}>
            <td className={style.cell}>{data.name}</td>
            <td className={style.cell}>{data.task}</td>
            <td className={style.cell}>
                <input type="checkbox" checked={data.finished} />
            </td>
        </tr>
    );
}