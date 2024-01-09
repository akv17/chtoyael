import styles from "./main.module.css"
import { Date } from "./display/date"
import { Stats } from "./display/stats"
import { Meal } from "./display/meal"


export default function DayDisplay({day}) {
    const meals = day.getMeals().map((m, i) => <Meal key={i} meal={m}/>)
    return (
        <div className={styles.container}>
            <div className={styles.dateAndStatsContainer}>
                <Date day={day}/>
                {/* <Stats day={day}/> */}
            </div>
            <div className={styles.mealsContainer}>{meals}</div>
        </div>
    )
}
