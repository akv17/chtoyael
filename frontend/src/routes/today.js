import { useLoaderData } from "react-router-dom";

import styles from "./today.module.css"
import DayServiceMock from "../services/day";
import Header from "../components/header/main";
import DayDisplay from "../components/day/main";

const service = new DayServiceMock()


export async function todayLoader({request}) {
    const day = await service.getToday()
    return day
}


export function TodayRoute() {
    const day = useLoaderData()
    return (
        <div className={styles.container}>
            <Header/>
            <DayDisplay day={day}/>
        </div>
    )
}
