import styles from "./display.module.css"


export default function Display({state, setState, dishes}) {
    
    function onClick(id) {
        setState({...state, isEditing: true, activeDishId: id})
    }

    const comps = dishes.map((d, i) =>
        <Dish
            key={i}
            name={d.name}
            protein={d.protein}
            fat={d.fat}
            carbs={d.carbs}
            kcal={d.kcal}
            onClick={() => {onClick(d.id)}}
        />
    )
    return <div className={styles.grid}>{comps}</div>
}


function Dish({name, protein, fat, carbs, kcal, onClick}) {
    return (
        <div className={styles.container} onMouseDown={onClick}>
            <div className={styles.image}></div>
            <div className={styles.dataContainer}>
                <div className={styles.name}>{name}</div>
                <div className={styles.statsContainer}>
                    <div className={styles.statsValue}>{`К ${kcal}`}</div>
                    <div className={styles.statsValue}>{`Б ${protein}`}</div>
                    <div className={styles.statsValue}>{`Ж ${fat}`}</div>
                    <div className={styles.statsValue}>{`У ${carbs}`}</div>
                </div>
            </div>
        </div>
    )
}
