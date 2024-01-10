import { useState } from "react";


import styles from "./main.module.css"
import Form from "./form";


const initState = {
    isAdding: true,
    dishQuery: null,
    addedDishes: [],
}


export default function MealModal({
    action,
    onSubmit,
    onClose,
    onDelete=null,
    id="",
    name="",
    start="",
    end="",
    allDishes=null,
    mealDishes=null,
}) {
    const [state, setState] = useState(initState)
    const displayedDishes = allDishes.filter(d => state.addedDishes.includes(d.getId()))
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.exitContainer}>
                    <button className={styles.exitButton} onClick={onClose}>✕</button>
                </div>
            <Form
                state={state}
                setState={setState}
                action={action}
                onSubmit={onSubmit}
                onDelete={onDelete}
                allDishes={allDishes}
                displayedDishes={displayedDishes}
            />
            </div>
        </div>
    )
}
