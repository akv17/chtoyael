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
    query: null,
}


export default function DishesDisplay({dishes}) {
    const [state, setState] = useState(initState)
    let displayedDishes = []
    if (state.query !== null) {
        displayedDishes = dishes.filter(d => d.name.toLowerCase().startsWith(state.query.toLowerCase()))
    }
    else {
        displayedDishes = dishes
    }
    return (
        <div className={styles.container}>
            <div className={styles.upperControlContainer}>
                <SearchBar state={state} setState={setState}/>
                <AddButton state={state} setState={setState}/>
            </div>
            <Display state={state} setState={setState} dishes={displayedDishes}/>
            {state.isAdding && <AddModal state={state} setState={setState}/>}
            {state.isEditing && <EditModal state={state} setState={setState} dishes={dishes}/>}
        </div>
    )
}
