import styles from "./meal.module.css"


export function Meal({state, setState, meal, allDishes}) {
    const dishesMap = new Map(allDishes.map(d => [d.id, d]))
    let dishes = meal.dishes.filter(d => dishesMap.has(d.id))
    dishes = dishes.map(d => {return {weight: d.weight, ...dishesMap.get(d.id)}})

    function onEdit(id) {
        const mealDishes = dishes
        setState({...state, isEditingMeal: true, editedMealId: id, mealDishes})
    }

    function createTimeString(hour, minute) {
        const hourString = hour < 10 ? `0${hour}` : hour
        const minuteString = minute < 10 ? `0${minute}` : minute
        const res = `${hourString}:${minuteString}`
        return res
    }

    function computeWeightTotal(dishes) {
        let accum = 0
        for (const dish of dishes) {
            accum += dish.weight
        }
        return accum
    }

    function computeStatValueSum(name, dishes) {
        let accum = 0
        for (const dish of dishes) {
            accum += dish[name]
        }
        return accum
    }


    const dishesComps = dishes.map((d, i) => <Dish key={i} dish={d}/>)
    const weight = computeWeightTotal(dishes)
    const protein = computeStatValueSum("protein", dishes)
    const fat = computeStatValueSum("fat", dishes)
    const carbs = computeStatValueSum("carbs", dishes)
    const kcal = computeStatValueSum("kcal", dishes)
    return (
        <div className={styles.container} onMouseDown={() => onEdit(meal.id)}>
            <div className={styles.timeContainer}>
                <div>{createTimeString(meal.start_hour, meal.start_minute)}</div>
                <div>{createTimeString(meal.end_hour, meal.end_minute)}</div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.name}>{meal.name}</div>
                <div className={styles.statsContainer}>
                    <div className={styles.statValue}>{`В ${weight}`}</div>
                    <div className={styles.statValue}>{`К ${kcal}`}</div>
                    <div className={styles.statValue}>{`Б ${protein}`}</div>
                    <div className={styles.statValue}>{`Ж ${fat}`}</div>
                    <div className={styles.statValue}>{`У ${carbs}`}</div>
                </div>
                <div className={styles.dishesPanel}>{dishesComps}</div>
            </div>
        </div>
    )
}


function Dish({dish}) {
    return (
        <div className={styles.dishContainer}>
            <div className={styles.dishImage}></div>
            <div className={styles.dishName}>{dish.name}</div>
            <div className={styles.dishWeight}>{dish.weight}</div>
        </div>
    )
}


class DishWithWeight {
    constructor(data, weight) {
        this.data = data
        this.weight = weight
    }
}
