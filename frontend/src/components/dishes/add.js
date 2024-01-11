import { useSubmit } from "react-router-dom";
import styles from "./add.module.css"
import DishModal from "./modal";


export function AddButton({state, setState}) {
    function onClick() {
        setState({...state, isAdding: true})
    }
    return (
        <button className={styles.button} onClick={onClick}>➕</button>
    )
}


export function AddModal({state, setState}) {
    const submit = useSubmit()
    
    function onClose() {
        setState({...state, isAdding: false})
    }

    function onSubmit(e) {
        setState({...state, isAdding: false})
        submit(e.currentTarget)
    }

    return <DishModal action="add" onSubmit={onSubmit} onClose={onClose}/>
}
