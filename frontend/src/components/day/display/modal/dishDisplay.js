import styles from "./dishDisplay.module.css"

const WEIGHT_INCREASE = 10


export default function DishDisplay({state, setState, dishes}) {
    
    function onDelete(id) {
        const newDishes = dishes.filter(d => d.getId() !== id).map(d => d.getId())
        const newWeights = {...state.addedWeights}
        delete newWeights[id]
        setState({...state, addedDishes: newDishes, addedWeights: newWeights})
    }
    
    function onDecreaseWeight(id) {
        const newWeights = {...state.addedWeights}
        newWeights[id] = Math.max(0, newWeights[id] - WEIGHT_INCREASE)
        setState({...state, addedWeights: newWeights})
    }

    function onIncreaseWeight(id) {
        const newWeights = {...state.addedWeights}
        newWeights[id] += WEIGHT_INCREASE
        setState({...state, addedWeights: newWeights})
    }

    const dishComps = dishes.map((d, i) =>
        <Dish
            key={i}
            name={d.getName()}
            image={d.getImage()}
            weight={state.addedWeights[d.getId()]}
            onDelete={() => onDelete(d.getId())}
            onDecreaseWeight={() => onDecreaseWeight(d.getId())}
            onIncreaseWeight={() => onIncreaseWeight(d.getId())}
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
