import { Link } from "react-router-dom"
import styles from "./main.module.css"


export default function Feed({days}) {
    const comps = days.map((d, i) => <Day key={i} name={d.timestamp.day_name} date={d.id}/>)
    return (
        <div className={styles.grid}>{comps}</div>
    )
}


function Day({
    name,
    date,
}) {
    const dayId = date
    const fmtDate = date.replaceAll("-", ".")
    return (
        <Link className={styles.dayLink} to={`/day/${dayId}`}>
            <div className={styles.dayContainer}>
                <div className={styles.dayNameAndDateContainer}>
                    <div className={styles.dayName}>{name}</div>
                    <div className={styles.dayDate}>{fmtDate}</div>
                </div>
            </div>
        </Link>
    )
}
