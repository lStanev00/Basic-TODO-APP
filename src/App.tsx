import FormAction from "./componenets/FormAction"
import ItemsTable from "./componenets/ItemsTable"
import SelectSort from "./componenets/SelectSort"
import TodoProvider from "./context-providers/context-provider"
import style from "./styles/App.module.css"
import './styles/global.css'
export default function App() {

  return (
    <TodoProvider>

      <h1 className={style.h1}>Lachezar's TODO List</h1>
      
      <SelectSort />
      <ItemsTable />
      <FormAction />

    </TodoProvider>
    
  )
}