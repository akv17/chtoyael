import styles from "./main.module.css"


export default function Feed({days}) {
    const comps = days.map((d, i) => {return createDay(i, d)})
    return <div className={styles.container}>
        <div className={styles.grid}>
            {comps}
        </div>
    </div>
}


function createDay(key, day) {
    return <Day
        key={key}
        name={day.getName()}
        date={day.getDateString()}
        numMeals={day.getNumMeals()}
        weight={day.getWeightTotal()}
        protein={day.getParamTotal("protein")}
        fat={day.getParamTotal("fat")}
        carbs={day.getParamTotal("carbs")}
        kcal={day.getParamTotal("kcal")}
        water={day.getWaterTotal()}
    />
}


function Day({
    name,
    date,
    numMeals,
    weight,
    protein,
    fat,
    carbs,
    kcal,
    water
}) {
    return <div className={styles.dayContainer}>
        <div className={styles.dayDateContainer}>
            <div className={styles.dayName}>{name}</div>
            <div className={styles.dayDate}>{date}</div>
        </div>
        <div className={styles.dayNumMeals}>{numMeals}</div>
        <div className={styles.dayStatsContainer}>
            <div className={styles.dayStatsValue}>{`Вес ${weight}`}</div>
            <div className={styles.dayStatsValue}>{`Вода ${water}`}</div>
            <div className={styles.dayStatsSupplementContainer}>
                <div className={styles.dayStatsSupplementValue}>{`К ${kcal}`}</div>
                <div className={styles.dayStatsSupplementValue}>{`Б ${protein}`}</div>
                <div className={styles.dayStatsSupplementValue}>{`Ж ${fat}`}</div>
                <div className={styles.dayStatsSupplementValue}>{`У ${carbs}`}</div>
            </div>
        </div>
    </div>
}
