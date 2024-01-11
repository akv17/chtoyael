import { useSubmit } from "react-router-dom";
import styles from "./edit.module.css"
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
    const dish = dishes.filter(d => d.getId() === state.activeDishId)[0]
    
    return <DishModal
        action="edit"
        onClose={onClose}
        onSubmit={onSubmit}
        onDelete={onDelete}
        id={dish.getId()}
        name={dish.getName()}
        protein={dish.getProtein()}
        fat={dish.getFat()}
        carbs={dish.getCarbs()}
        kcal={dish.getKcal()}
    />
}
