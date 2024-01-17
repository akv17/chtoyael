import { useSubmit } from "react-router-dom";
import styles from "./add.module.css"
import MealModal from "./modal/main";


export function AddButton({state, setState}) {
    function onClick() {
        setState({...state, isAddingMeal: true, mealDishes: []})
    }
    return (
        <button className={styles.button} onClick={onClick}>➕</button>
    )
}


export function AddModal({state, setState, dayId, allDishes}) {
    const submit = useSubmit()
    
    function onClose() {
        setState({...state, isAddingMeal: false, mealDishes: []})
    }

    function onSubmit(e) {
        setState({...state, isAddingMeal: false, mealDishes: [], submitHasError: false, submitErrorMsg: null})
        submit(e.currentTarget)
    }

    function validateFormData(data) {
        if (
            !data.get("startHour").length
            || !data.get("startMinute").length
            || !data.get("endHour").length
            || !data.get("endMinute").length
        ) {
            return "Время не заполнено"
        }
        const dishes = JSON.parse(data.get("dishes"))
        if (!dishes.length) {
            return "Еда пустая"
        }
        return null
    }

    return (
        <MealModal
            state={state}
            setState={setState}
            action="addMeal"
            onSubmit={onSubmit}
            onClose={onClose}
            dayId={dayId}
            allDishes={allDishes}
        />
    )
}
