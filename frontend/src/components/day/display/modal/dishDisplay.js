import styles from "./dishDisplay.module.css"

const WEIGHT_INCREASE = 10


export default function DishDisplay({state, setState}) {
    const dishes = state.mealDishes
    
    function onDelete(id) {
        const newDishes = dishes.filter(d => d.id !== id)
        setState({...state, mealDishes: newDishes})
    }
    
    function onDecreaseWeight(id) {
        const idx = dishes.map(d => d.id).indexOf(id)
        const newDishes = [...dishes]
        newDishes[idx].weight = Math.max(0, newDishes[idx].weight - WEIGHT_INCREASE)
        setState({...state, mealDishes: newDishes})
    }

    function onIncreaseWeight(id) {
        const idx = dishes.map(d => d.id).indexOf(id)
        const newDishes = [...dishes]
        newDishes[idx].weight = newDishes[idx].weight + WEIGHT_INCREASE
        setState({...state, mealDishes: newDishes})
    }

    const dishComps = dishes.map((d, i) =>
        <Dish
            key={i}
            name={d.name}
            image={null}
            weight={d.weight}
            onDelete={() => onDelete(d.id)}
            onDecreaseWeight={() => onDecreaseWeight(d.id)}
            onIncreaseWeight={() => onIncreaseWeight(d.id)}
        />
    )
    return (
        <div className={styles.container}>
            {dishComps}
        </div>
    )
}

function Dish({name, image, weight, onDelete, onDecreaseWeight, onIncreaseWeight}) {
    return (
        <div className={styles.dishContainer}>
            <div className={styles.dishImage} onMouseDown={onDelete}></div>
            <div className={styles.dishName}>{name}</div>
            <DishWeightControl weight={weight} onDecrease={onDecreaseWeight} onIncrease={onIncreaseWeight}/>
        </div>
    )
}


function DishWeightControl({weight, onDecrease, onIncrease}) {
    const leftButtonClassName = `${styles.dishWeightButton} ${styles.dishWeightButtonLeft}`
    const rightButtonClassName = `${styles.dishWeightButton} ${styles.dishWeightButtonRight}`
    return (
        <div className={styles.dishWeightContainer}>
            <button type="button" className={leftButtonClassName} onClick={onDecrease}>-</button>
            <div className={styles.dishWeightValue}>{weight}</div>
            <button type="button" className={rightButtonClassName} onClick={onIncrease}>+</button>
        </div>
    )
}
