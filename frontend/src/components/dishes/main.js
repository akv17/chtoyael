import { useState } from "react"
import styles from "./main.module.css"
import { AddButton, AddModal } from "./add"
import SearchBar from "./search"
import Display from "./display"
import { EditModal } from "./edit"


const initState = {
    isAdding: false,
    isEditing: false,
    activeDishId: null,
}


export default function DishesDisplay({dishes}) {
    const [state, setState] = useState(initState)
    return (
        <div className={styles.container}>
            <div className={styles.upperControlContainer}>
                <SearchBar/>
                <AddButton state={state} setState={setState}/>
            </div>
            <Display state={state} setState={setState} dishes={dishes}/>
            {state.isAdding && <AddModal state={state} setState={setState}/>}
            {state.isEditing && <EditModal state={state} setState={setState} dishes={dishes}/>}
        </div>
    )
}
