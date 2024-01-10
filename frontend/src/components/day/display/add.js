import { useSubmit } from "react-router-dom";
import styles from "./add.module.css"
import MealModal from "./modal/main";


export function AddButton({state, setState}) {
    function onClick() {
        setState({...state, isAdding: true})
    }
    return (
        <button className={styles.button} onClick={onClick}>➕</button>
    )
}


export function AddModal({state, setState, allDishes}) {
    const submit = useSubmit()
    
    function onClose() {
        setState({...state, isAdding: false})
    }

    function onSubmit(e) {
        setState({...state, isAdding: false})
        submit(e.currentTarget)
    }

    return <MealModal action="add" onSubmit={onSubmit} onClose={onClose} allDishes={allDishes}/>
}
