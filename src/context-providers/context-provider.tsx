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
    editItem: Function;
    setTableContent: React.Dispatch<React.SetStateAction<Item[]>>;
    addItem: (name: string, task: string, finished: boolean) => void;
}

export const TodoContext = createContext<TodoContextType>({
    items: [],
    tableContent: [],
    setItems: () => {},
    editItem: () => {},
    setTableContent: () => {},
    addItem: () => {},
});

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
            if (data && data.length != 0) {
                setItems(data);
                setTableContent(data);
            }
        })();
    }, []);

    const editItem = async (item: Item, method: string): Promise<void> => {
        const url = `http://localhost:3000/items`

        try {

            if (method == `edit`) {
                const req = await fetch(url, {
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify(item)
                })

                if (req.status === 200) {
                    const data: Item = await req.json();

                    const copy = [...items];
                    const index = copy.findIndex(item => item.id == data.id);
                    copy[index] = data;
                    setItems(copy);
                }
            } else if (method == `delete`) {

                const req = await fetch(url, {
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "DELETE",
                    body: JSON.stringify(item)
                })

                if (req.status === 200) {
                    const data: Item[] = await req.json();
                    setItems(data);
                }


            }
            
        } catch (error) {
            console.warn(error)
            
        }

    }

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
        <TodoContext.Provider value={{ items, tableContent, setItems, editItem, setTableContent, addItem  }}>
            {children}
        </TodoContext.Provider>
    );
}
