import styles from "./dishSelector.module.css"


export default function DishSelector({state, setState, allDishes}) {
    return (
        <div className={styles.container}>
            <Control state={state} setState={setState}/>
            {state.isAddingMealDish && <Dropdown state={state} setState={setState} allDishes={allDishes}/>}
        </div>
    )
}


function Control({state, setState}) {
    function onAddClick() {
        if (state.isAddingMealDish) {
            setState({...state, isAddingMealDish: false})
        }
        else {
            setState({...state, isAddingMealDish: true})
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
        setState({...state, mealDishQuery: query})
    }

    function onDishAdd(id) {
        const ids = state.mealDishes.map(d => d.id)
        if (ids.includes(id)) return
        let dish = new Map(allDishes.map(d => [d.id, d])).get(id)
        dish = {...dish, weight: dish.weight || 100}
        setState({...state, mealDishes: [...state.mealDishes, dish]})
    }

    let dishesQueried = []
    if (state.mealDishQuery !== null) {
        dishesQueried = allDishes.filter(d => d.name.toLowerCase().startsWith(state.mealDishQuery.toLowerCase()))
    }
    else {
        dishesQueried = allDishes
    }
    const dishComps = dishesQueried.map((d, i) =>
        <DropdownDish
            key={i}
            name={d.name}
            onClick={() => {onDishAdd(d.id)}}
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
