import styles from "./dishSelector.module.css"


export default function DishSelector({state, setState, allDishes}) {
    return (
        <div className={styles.container}>
            <Control state={state} setState={setState}/>
            {state.isAdding && <Dropdown state={state} setState={setState} allDishes={allDishes}/>}
        </div>
    )
}


function Control({state, setState}) {
    function onAddClick() {
        if (state.isAdding) {
            setState({...state, isAdding: false})
        }
        else {
            setState({...state, isAdding: true})
        }
    }
    return (
        <div className={styles.controlContainer}>
            <div className={styles.controlLabel}>Еда</div>
            <button type="button" className={styles.controlButton} onClick={onAddClick}>➕</button>
        </div>
    )
}


function Dropdown({state, setState, allDishes}) {

    function onSearchQueryChange(e) {
        const query = e.target.value.length > 0 ? e.target.value : null
        setState({...state, dishQuery: query})
    }

    function onDishAdd(id) {
        const newDishes = [...state.addedDishes, id]
        const newWeights = {...state.addedWeights}
        newWeights[id] = 100
        setState({...state, addedDishes: newDishes, addedWeights: newWeights})
    }

    let dishesQueried = []
    if (state.dishQuery !== null) {
        dishesQueried = allDishes.filter(d => d.getName().toLowerCase().startsWith(state.dishQuery.toLowerCase()))
    }
    else {
        dishesQueried = allDishes
    }
    const dishComps = dishesQueried.map((d, i) =>
        <DropdownDish
            key={i}
            name={d.getName()}
            onClick={() => {onDishAdd(d.getId())}}
        />
    )
    return (
        <div className={styles.dropdownContainer}>
            <DropdownSearchBar onChange={onSearchQueryChange}/>
            <div className={styles.dropdownDishesContainer}>{dishComps}</div>
        </div>
    )
}


function DropdownSearchBar({onChange}) {
    return (
        <input className={styles.dropdownSearchBar} type="text" placeholder="Чтояем?" onChange={onChange}/>
    )
}

function DropdownDish({name, onClick}) {
    return (
        <div className={styles.dropdownDishContainer} onMouseDown={onClick}>
            <div className={styles.dropdownDishName}>{name}</div>
            {/* <button type="button" className={styles.dropdownDishAddButton} onClick={onClick}>+</button> */}
            <button type="button" className={styles.dropdownDishAddButton}>+</button>
        </div>
    )
}
