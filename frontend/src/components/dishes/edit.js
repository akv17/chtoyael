import { useSubmit } from "react-router-dom";
import DishModal from "./modal"


export function EditModal({state, setState, dishes}) {
    const submit = useSubmit()
    
    function onClose() {
        setState({...state, isEditing: false, activeDishId: null})
    }

    function onSubmit(e) {
        setState({...state, isEditing: false})
        submit(e.currentTarget)
    }

    function onDelete(e) {
        setState({...state, isEditing: false})
        submit(e.currentTarget)
    } 

    if (state.activeDishId === null) return
    const dish = dishes.filter(d => d.id === state.activeDishId)[0]
    
    return <DishModal
        action="edit"
        onClose={onClose}
        onSubmit={onSubmit}
        onDelete={onDelete}
        id={dish.id}
        name={dish.name}
        protein={dish.protein}
        fat={dish.fat}
        carbs={dish.carbs}
        kcal={dish.kcal}
    />
}
