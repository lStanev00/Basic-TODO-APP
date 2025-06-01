import type { Item } from "../context-providers/context-provider";

export default function ItemElement( { data } : { data : Item } ) {

    if(data) return (
        <tr>
            <td>{data.name}</td>
            <td>{data.task}</td>
            <td><input type="checkbox" checked={data.finished}></input></td>
        </tr>
    )

}