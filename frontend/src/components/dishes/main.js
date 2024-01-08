import { useState } from "react"
import styles from "./main.module.css"
import { AddButton, AddModal } from "./add"
import SearchBar from "./search"
import { ItemsDisplay } from "./display"
import { EditModal } from "./edit"


const initState = {
    isAdding: false,
    isEditing: false,
    activeItemId: null,
}


export default function DishesDisplay({items}) {
    const [state, setState] = useState(initState)
    return (
        <div className={styles.container}>
            <div className={styles.upperControlContainer}>
                <SearchBar/>
                <AddButton state={state} setState={setState}/>
            </div>
            <ItemsDisplay state={state} setState={setState} items={items}/>
            {state.isAdding && <AddModal state={state} setState={setState}/>}
            {state.isEditing && <EditModal state={state} setState={setState} items={items}/>}
        </div>
    )
}
