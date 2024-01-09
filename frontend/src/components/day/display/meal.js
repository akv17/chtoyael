import styles from "./meal.module.css"


export function Meal({meal}) {
    const dishes = meal.getDishes()
    const dishComps = dishes.map((d, i) => <Dish key={i} dish={d}/>)
    return (
        <div className={styles.container}>
            <div className={styles.timeContainer}>
                <div>{meal.getTimeStartString()}</div>
                <div>{meal.getTimeEndString()}</div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.name}>{meal.getName()}</div>
                <div className={styles.statsContainer}>
                    <div className={styles.statsValue}>{`В ${meal.getWeightTotal()}`}</div>
                    <div className={styles.slStatsValue}>{`К ${meal.getParamTotal("kcal")}`}</div>
                    <div className={styles.slStatsValue}>{`Б ${meal.getParamTotal("protein")}`}</div>
                    <div className={styles.slStatsValue}>{`Ж ${meal.getParamTotal("fat")}`}</div>
                    <div className={styles.slStatsValue}>{`У ${meal.getParamTotal("carbs")}`}</div>
                </div>
                <div className={styles.dishesPanel}>{dishComps}</div>
            </div>
        </div>
    )
}

function Dish({dish}) {
    return (
        <div className={styles.dishContainer}>
            <div className={styles.dishImage}>{dish.getImage()}</div>
            <div className={styles.dishName}>{dish.getName()}</div>
            <div className={styles.dishWeight}>{dish.getWeight()}</div>
        </div>
    )
}
