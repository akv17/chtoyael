import { Form as _Form } from "react-router-dom";

import styles from "./form.module.css"
import DishSelector from "./dishSelector";
import DishDisplay from "./dishDisplay";



export default function Form({state, setState, action, onSubmit, onDelete, allDishes, displayedDishes}) {
    return (
        <_Form method="post" action={action} className={styles.container}>
            {/* <input type="hidden" name="id" value={id}/> */}
            {/* <label className={styles.formLabel}>Название</label>
            <input
                className={styles.formInput}
                placeholder=""
                name="name"
                defaultValue={name}
            /> */}
            <DishSelector state={state} setState={setState} allDishes={allDishes}/>
            <DishDisplay state={state} setState={setState} dishes={displayedDishes}/>
            <SubmitPanel onSubmit={onSubmit} onDelete={onDelete}/>
        </_Form>
    )
}


function SubmitPanel({onSubmit, onDelete}) {
    return (
        <div className={styles.submitContainer}>
            <button type="submit" name="submit" className={styles.submit} onClick={onSubmit}>✔️</button>
            {onDelete !== null && <button type="submit" name="delete" className={styles.submit} onClick={onSubmit}>✖️</button>}
        </div>
    )
}