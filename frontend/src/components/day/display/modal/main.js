import { Form } from "react-router-dom";

import styles from "./main.module.css"
import DishSelector from "./dishSelector";
import DishDisplay from "./dishDisplay";
import { MealName, MealTime } from "./meal";


export default function MealModal({
    state,
    setState,
    action,
    onSubmit,
    onClose,
    onDelete=null,
    dayId="",
    mealId="",
    name="",
    startHour="",
    startMinute="",
    endHour="",
    endMinute="",
    allDishes=null,
}) {
    const displayedDishes = state.mealDishes
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.exitContainer}>
                    <button className={styles.exitButton} onClick={onClose}>✕</button>
                </div>
                <Form method="post" action={action} className={styles.formContainer}>
                    <input type="hidden" name="dayId" value={dayId}/>
                    <input type="hidden" name="mealId" value={mealId}/>
                    <MealName name={name}/>
                    <MealTime startHour={startHour} startMinute={startMinute} endHour={endHour} endMinute={endMinute}/>
                    <DishSelector state={state} setState={setState} allDishes={allDishes}/>
                    <DishDisplay state={state} setState={setState} dishes={displayedDishes}/>
                    <SubmittedDishes dishes={displayedDishes}/>
                    <SubmitPanel onSubmit={onSubmit} onDelete={onDelete}/>
                </Form>
            </div>
        </div>
    )
}


function SubmittedDishes({dishes}) {
    const data = JSON.stringify(dishes)
    return <input name="dishes" type="hidden" value={data}/>
}


function SubmitPanel({onSubmit, onDelete}) {
    return (
        <div className={styles.formSubmitContainer}>
            <button type="submit" name="submit" className={styles.formSubmit} onClick={onSubmit}>➕</button>
            {onDelete !== null && <button type="submit" name="deleteMeal" className={styles.formSubmit} onClick={onSubmit}>✖️</button>}
        </div>
    )
}


function SubmitError({state, setState, msg}) {
    function onClick() {
        setState({...state, submitHasError: false, submitErrorMsg: null})
    }
    return (
        <div className={styles.formSubmitError} onMouseDown={onClick}>{msg}</div>
    )
}
