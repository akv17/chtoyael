import { useSubmit } from "react-router-dom";
import styles from "./edit.module.css"
import ItemModal from "./modal"


export function EditModal({state, setState, items}) {
    const submit = useSubmit()
    
    function onClose() {
        setState({...state, isEditing: false, activeItemId: null})
    }

    function onSubmit(e) {
        setState({...state, isEditing: false})
        submit(e.currentTarget)
    }

    function onDelete(e) {
        setState({...state, isEditing: false})
        submit(e.currentTarget)
    } 

    if (state.activeItemId === null) return
    const item = items.filter(it => it.id === state.activeItemId)[0]
    
    return <ItemModal
        action="edit"
        onClose={onClose}
        onSubmit={onSubmit}
        onDelete={onDelete}
        id={item.id}
        name={item.name}
        protein={item.protein}
        fat={item.fat}
        carbs={item.carbs}
        kcal={item.kcal}
    />
}
