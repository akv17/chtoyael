import { useState } from "react"

import styles from "./main.module.css"
import { Date } from "./display/date"
import { Stats } from "./display/stats"
import { Meal } from "./display/meal"
import { AddButton, AddModal } from "./display/add"

const initState = {
    isAdding: false,
}


export default function DayDisplay({day, allDishes}) {
    const [state, setState] = useState(initState)
    const meals = day.getMeals().map((m, i) => <Meal key={i} meal={m}/>)
    return (
        <div className={styles.container}>
            <div className={styles.dateAndAddContainer}>
                <Date day={day}/>
                <AddButton state={state} setState={setState}/>
                {state.isAdding && <AddModal state={state} setState={setState} allDishes={allDishes}/>}
            </div>
            <div className={styles.mealsContainer}>{meals}</div>
        </div>
    )
}
