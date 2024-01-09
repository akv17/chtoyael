import { useState } from "react"

import styles from "./display.module.css"
import { AddButton } from "./add"

const initState = {
    isAdding: false
}


export function Display({day}) {
    const [state, setState] = useState(initState)
    
    const meals = day.getMeals()
    const mealComps = meals.map((m, i) => <Meal key={i} meal={m}/>)
    return (
        <div className={styles.dayContainer}>
            <Date day={day}/>
            <div className={styles.mealsContainer}>{mealComps}</div>
            
        </div>
    )
}


function Date({day}) {
    return (
        <div className={styles.dateContainer}>
            <div className={styles.dateName}>{day.getName()}</div>
            <div className={styles.dateTimestamp}>{day.getDateString()}</div>
        </div>
    )
}


function Meal({meal}) {
    const dishes = meal.getDishes()
    const dishComps = dishes.map((d, i) => <Dish key={i} dish={d}/>)
    return (
        <div className={styles.mealContainer}>
            <div className={styles.mealTimeContainer}>
                <div>{meal.getTimeStartString()}</div>
                <div>{meal.getTimeEndString()}</div>
            </div>
            <div className={styles.mealContentContainer}>
                <div className={styles.mealName}>{meal.getName()}</div>
                <div className={styles.mealDishesPanel}>{dishComps}</div>
                <div className={styles.mealStatsContainer}>
                    <div className={styles.mealStatsValue}>{`В ${meal.getWeightTotal()}`}</div>
                    <div className={styles.mealStatsValue}>{`К ${meal.getParamTotal("kcal")}`}</div>
                    <div className={styles.mealStatsValue}>{`Б ${meal.getParamTotal("protein")}`}</div>
                    <div className={styles.mealStatsValue}>{`Ж ${meal.getParamTotal("fat")}`}</div>
                    <div className={styles.mealStatsValue}>{`У ${meal.getParamTotal("carbs")}`}</div>
                </div>
            </div>
        </div>
    )
}


