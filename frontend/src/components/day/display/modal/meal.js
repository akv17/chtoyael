import styles from "./meal.module.css"


export function MealName({name=""}) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>Название</label>
            <select name="name" className={styles.nameSelector}>
                <option>Завтрак</option>
                <option>Обед</option>
                <option>Ужин</option>
                <option>Перекус</option>
            </select>
        </div>
    )
}


export function MealTime({start="", end=""}) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>Время</label>
            <div className={styles.timeSlotsContainer}>
                <div className={styles.timeSlot}>
                    <input type="text" name="timeStartHour" className={styles.timeValue} defaultValue="10"/>
                    <div className={styles.timeValueSep}>:</div>
                    <input type="text" name="timeStartMinute" className={styles.timeValue} defaultValue="00"/>
                </div>
                <div className={styles.timeSlot}>
                    <input type="text" name="timeEndHour" className={styles.timeValue} defaultValue="10"/>
                    <div className={styles.timeValueSep}>:</div>
                    <input type="text" name="timeEndMinute" className={styles.timeValue} defaultValue="30"/>
                </div>
            </div>
        </div>
    )
}
