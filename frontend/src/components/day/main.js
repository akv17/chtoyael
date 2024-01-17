import { useState } from "react"

import styles from "./main.module.css"
import { Date } from "./display/date"
import { Stats } from "./display/stats"
import { Meal } from "./display/meal"
import { AddButton, AddModal } from "./display/add"
import EditModal from "./display/edit"

const initState = {
    isAddingMeal: false,
    isEditingMeal: false,
    editedMealId: null,

    isAddingMealDish: false,
    mealDishes: [],
    mealDishQuery: null,

    submitHasError: false,
    submitErrorMsg: null,
}


export default function DayDisplay({day, meals, allDishes}) {
    const [state, setState] = useState(initState)
    const mealsComps = meals.map((m, i) => <Meal key={i} state={state} setState={setState} meal={m} allDishes={allDishes}/>)
    return (
        <div className={styles.container}>
            <div className={styles.dateAndAddContainer}>
                <Date day={day}/>
                <AddButton state={state} setState={setState}/>
                {state.isAddingMeal && <AddModal state={state} setState={setState} dayId={day.id} allDishes={allDishes}/>}
                {state.isEditingMeal && <EditModal state={state} setState={setState} dayId={day.id} meals={meals} allDishes={allDishes}/>}
            </div>
            <div className={styles.mealsContainer}>{mealsComps}</div>
        </div>
    )
}
