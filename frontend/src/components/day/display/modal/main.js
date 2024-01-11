import { useState } from "react";
import { Form } from "react-router-dom";

import styles from "./main.module.css"
import DishSelector from "./dishSelector";
import DishDisplay from "./dishDisplay";
import { MealName, MealTime } from "./meal";

const initState = {
    isAdding: true,
    dishQuery: null,
    addedDishes: [],
    addedWeights: {},
    currentDish: null,
    currentDishWeight: null,
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
                <Form method="post" action={action} className={styles.formContainer}>
                    {/* <input type="hidden" name="id" value={id}/> */}
                    <MealName/>
                    <MealTime/>
                    <DishSelector state={state} setState={setState} allDishes={allDishes}/>
                    <DishDisplay state={state} setState={setState} dishes={displayedDishes}/>
                    <SubmittedDishes dishes={displayedDishes} weights={state.addedWeights}/>
                    <SubmitPanel onSubmit={onSubmit} onDelete={onDelete}/>
                </Form>
            </div>
        </div>
    )
}


function SubmittedDishes({dishes, weights}) {
    console.log(dishes)
    const data = JSON.stringify(dishes.map(d => {return {id: d.getId(), weight: weights[d.getId()]}}))
    return <input name="dishes" type="hidden" value={data}/>
}


function SubmitPanel({onSubmit, onDelete}) {
    return (
        <div className={styles.formSubmitContainer}>
            <button type="submit" name="submit" className={styles.formSubmit} onClick={onSubmit}>✔️</button>
            {onDelete !== null && <button type="submit" name="delete" className={styles.formSubmit} onClick={onSubmit}>✖️</button>}
        </div>
    )
}
