import styles from "./dishDisplay.module.css"


export default function DishDisplay({state, setState, dishes}) {
    function onDishDelete(id) {
        const newDishes = dishes.map(d => d.getId()).filter(id_ => id_ !== id)
        setState({...state, addedDishes: newDishes})
    }
    const dishComps = dishes.map((d, i) =>
        <Dish
            key={i}
            name={d.getName()}
            image={d.getImage()}
            onClick={() => onDishDelete(d.getId())}
        />
    )
    return (
        <div className={styles.container}>
            {dishComps}
        </div>
    )
}

function Dish({name, image, onClick}) {
    return (
        <div className={styles.dishContainer} onMouseDown={onClick}>
            <div className={styles.dishImage}></div>
            <div className={styles.dishName}>{name}</div>
        </div>
    )
}
