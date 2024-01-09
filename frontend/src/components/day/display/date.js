import styles from "./date.module.css"


export function Date({day}) {
    return (
        <div className={styles.container}>
            <div className={styles.name}>{day.getName()}</div>
            <div className={styles.date}>{day.getDateString()}</div>
        </div>
    )
}
