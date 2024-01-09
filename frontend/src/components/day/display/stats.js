import styles from "./stats.module.css"


export function Stats({day}) {
    return (
        <div className={styles.container}>
            <div className={styles.value}>{`Вес ${day.getWeightTotal()}`}</div>
            <div className={styles.value}>{`Вода ${day.getWaterTotal()}`}</div>
            <div className={styles.supplementContainer}>
                <div className={styles.supplementValue}>{`К ${day.getParamTotal("kcal")}`}</div>
                <div className={styles.supplementValue}>{`Б ${day.getParamTotal("protein")}`}</div>
                <div className={styles.supplementValue}>{`Ж ${day.getParamTotal("fat")}`}</div>
                <div className={styles.supplementValue}>{`У ${day.getParamTotal("carbs")}`}</div>
            </div>
        </div>
    )
}