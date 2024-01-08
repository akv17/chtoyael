import styles from "./display.module.css"


export function ItemsDisplay({state, setState, items}) {
    
    function onClick(id) {
        setState({...state, isEditing: true, activeItemId: id})
    }
    
    const comps = items.map((it, i) => {return createItem(i, it, onClick)})
    return <div className={styles.grid}>{comps}</div>
}


function createItem(idx, data, onClick) {
    return <Item
        key={idx}
        name={data.name}
        protein={data.protein}
        fat={data.fat}
        carbs={data.carbs}
        kcal={data.kcal}
        onClick={() => {onClick(data.id)}}
    />
}


function Item({name, protein, fat, carbs, kcal, onClick}) {
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
