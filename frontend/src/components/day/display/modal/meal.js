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


export function MealTime({startHour, startMinute, endHour, endMinute}) {
    
    function formatValue(value) {
        let fmtValue = String(value)
        if (!fmtValue.length) return ""
        fmtValue = fmtValue.length == 1 ? `0${fmtValue}` : fmtValue
        return fmtValue
    }

    const fmtStartHour = formatValue(startHour)
    const fmtStartMin = formatValue(startMinute)
    const fmtEndHour = formatValue(endHour)
    const fmtEndMin = formatValue(endMinute)
    return (
        <div className={styles.container}>
            <label className={styles.label}>Время</label>
            <div className={styles.timeSlotsContainer}>
                <div className={styles.timeSlot}>
                    <input type="text" name="startHour" className={styles.timeValue} defaultValue={fmtStartHour}/>
                    <div className={styles.timeValueSep}>:</div>
                    <input type="text" name="startMinute" className={styles.timeValue} defaultValue={fmtStartMin}/>
                </div>
                <div className={styles.timeSlot}>
                    <input type="text" name="endHour" className={styles.timeValue} defaultValue={fmtEndHour}/>
                    <div className={styles.timeValueSep}>:</div>
                    <input type="text" name="endMinute" className={styles.timeValue} defaultValue={fmtEndMin}/>
                </div>
            </div>
        </div>
    )
}
