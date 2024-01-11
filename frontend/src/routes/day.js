import { useLoaderData, redirect } from "react-router-dom";

import styles from "./today.module.css"
import DayServiceMock from "../services/day";
import DishesServiceMock from "../services/dishes";
import Header from "../components/header/main";
import DayDisplay from "../components/day/main";

const dayService = new DayServiceMock()
const dishesService = new DishesServiceMock()


export async function dayLoader({request}) {
    const path = request.url.split('/')
    const dayId = path[path.length - 1]
    const day = await dayService.getDay(dayId)
    const allDishes = await dishesService.get()
    return {day, allDishes}
}


export async function dayAction({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())
    const path = request.url.split('/')
    const action = path[path.length - 1]
    console.log(action, data)
    // if (action === "add") {
    //     service.add(data)
    // }
    // else if (action === "edit") {
    //     if (data.hasOwnProperty("delete")) {
    //         service.delete(data.id)
    //     }
    //     else {
    //         service.update(data)
    //     }
    // }
    return redirect('/day/05-01-2024')
}


export function DayRoute() {
    const {day, allDishes} = useLoaderData()
    return (
        <div className={styles.container}>
            <Header/>
            <DayDisplay day={day} allDishes={allDishes}/>
        </div>
    )
}
