import { useLoaderData, redirect } from "react-router-dom";

import styles from "./today.module.css"
import BackendService from "../api/service";
import Header from "../components/header/main";
import DayDisplay from "../components/day/main";


const service = new BackendService()


export async function dayLoader({request}) {
    const path = request.url.split('/')
    const dayId = path[path.length - 1]
    const day = await service.getDay(dayId)
    const meals = await service.getDayMeals(dayId)
    const allDishes = await service.getDishes()
    return {day, meals, allDishes}
}


export async function dayAction({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())
    const dayId = data.dayId
    const path = request.url.split('/')
    const action = path[path.length - 1]
    if (action === "addMeal") {
        delete data.submit
        delete data.dayId
        service.addMeal(dayId, data)
    }
    else if (action === "editMeal") {
        delete data.submit
        if (data.hasOwnProperty("deleteMeal")) {
            service.deleteMeal(data.mealId)
        }
        else {
            delete data.dayId
            const mealId = data.mealId
            delete data.mealId
            service.updateMeal(mealId, data)
        }
    }
    return redirect(`/day/${dayId}`)
}


export function DayRoute() {
    const {day, meals, allDishes} = useLoaderData()
    return (
        <div className={styles.container}>
            <Header/>
            <DayDisplay day={day} meals={meals} allDishes={allDishes}/>
        </div>
    )
}
