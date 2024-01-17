import { useSubmit } from "react-router-dom";
import MealModal from "./modal/main"


export default function EditModal({state, setState, dayId, meals, allDishes}) {
    const submit = useSubmit()
    
    function onClose() {
        setState({...state, isEditingMeal: false, editedMealId: null})
    }

    function onSubmit(e) {
        setState({...state, isEditingMeal: false})
        submit(e.currentTarget)
    }

    function onDelete(e) {
        setState({...state, isEditingMeal: false})
        submit(e.currentTarget)
    } 

    if (state.activeMealId === null) return
    const meal = new Map(meals.map(m => [m.id, m])).get(state.editedMealId)
    return <MealModal
        state={state}
        setState={setState}
        action="editMeal"
        onClose={onClose}
        onSubmit={onSubmit}
        onDelete={onDelete}
        dayId={dayId}
        mealId={meal.id}
        name={meal.name}
        startHour={meal.start_hour}
        startMinute={meal.start_minute}
        endHour={meal.end_hour}
        endMinute={meal.end_minute}
        allDishes={allDishes}
    />
}
