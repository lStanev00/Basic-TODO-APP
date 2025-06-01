import { createContext, ReactNode, useEffect, useState } from "react";

export interface Item {
    name: string;
    task: string;
    finished: boolean;
    id?: number;
}

interface TodoContextType {
    items: Item[];
    tableContent: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    setTableContent: React.Dispatch<React.SetStateAction<Item[]>>;
    addItem: (name: string, task: string, finished: boolean) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

const getItems = async (): Promise<Item[]> => {
    try {

        const res = await fetch("http://localhost:3000/items");

        if (res.status === 200) {

            const data: Item[] = await res.json();


            return data;

        }
    } catch (error) {
        console.warn(error);
    }
    return [];
};

const postItem = async (item: Item): Promise<Item|null>  => {
    try {

        const res = await fetch("http://localhost:3000/items", {
            headers: {
                "content-type": "application-json"
            },
            method: "POST",
            body: JSON.stringify({
                name: item.name,
                task: item.task,
                finished: item.finished
            })
        });

        if (res.status === 200) {

            const data: Item = await res.json();

            return data;

        }
    } catch (error) {
        console.warn(error);
    }
    return null;
};


export default function TodoProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Item[]>([]);
    const [tableContent, setTableContent] = useState<Item[]>([]);


    useEffect(() => {
        (async () => {
            const data = await getItems();
            setItems(data);
            setTableContent(data);
        })();
    }, []);

    const addItem = async (name: string, task: string, finished: boolean): Promise<void> => {
        const newItem: Item = {
            name: name,
            task: task,
            finished: finished,
        };

        const reqData = await postItem(newItem);

        if (reqData) setItems((prev) => [...prev, newItem]);
        
    }

    return (
        <TodoContext.Provider value={{ items, tableContent, setItems, setTableContent, addItem  }}>
            {children}
        </TodoContext.Provider>
    );
}
