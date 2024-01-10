import { useLoaderData } from "react-router-dom";

import styles from "./today.module.css"
import DayServiceMock from "../services/day";
import DishesServiceMock from "../services/dishes";
import Header from "../components/header/main";
import DayDisplay from "../components/day/main";

const dayService = new DayServiceMock()
const dishesService = new DishesServiceMock()


export async function todayLoader({request}) {
    const day = await dayService.getToday()
    const allDishes = await dishesService.get()
    return {day, allDishes}
}


export function TodayRoute() {
    const {day, allDishes} = useLoaderData()
    return (
        <div className={styles.container}>
            <Header/>
            <DayDisplay day={day} allDishes={allDishes}/>
        </div>
    )
}
