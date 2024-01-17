import styles from "./date.module.css"


export function Date({day}) {
    const date = day.id.replaceAll('-', '.')
    return (
        <div className={styles.container}>
            <div className={styles.name}>{day.timestamp.day_name}</div>
            <div className={styles.date}>{date}</div>
        </div>
    )
}
