import { Form } from "react-router-dom";
import styles from "./modal.module.css"


export default function ItemModal({
    action,
    onSubmit,
    onClose,
    onDelete=null,
    id="",
    name="",
    protein="",
    fat="",
    carbs="",
    kcal=""
}) {

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.exitContainer}>
                    <button className={styles.exitButton} onClick={onClose}>✕</button>
                </div>
                <Form method="post" action={action} className={styles.form}>
                    <input type="hidden" name="id" value={id}/>
                    <label className={styles.formLabel}>Название</label>
                    <input
                        className={styles.formInput}
                        placeholder=""
                        name="name"
                        defaultValue={name}
                    />
                    <label className={styles.formLabel}>Параметры</label>
                    <div className={styles.formStatsContainer}>
                        <div className={styles.formStatValueContainer}>
                            <label className={styles.formStatValueLabel}>К</label>
                            <input
                                className={styles.formStatValueInput}
                                placeholder=""
                                name="kcal"
                                defaultValue={kcal}
                            />
                        </div>
                        <div className={styles.formStatValueContainer}>
                            <label className={styles.formStatValueLabel}>Б</label>
                            <input
                                className={styles.formStatValueInput}
                                placeholder=""
                                name="protein"
                                defaultValue={protein}
                            />
                        </div>
                        <div className={styles.formStatValueContainer}>
                            <label className={styles.formStatValueLabel}>Ж</label>
                            <input
                                className={styles.formStatValueInput}
                                placeholder=""
                                name="fat"
                                defaultValue={fat}
                            />
                        </div>
                        <div className={styles.formStatValueContainer}>
                            <label className={styles.formStatValueLabel}>У</label>
                            <input
                                className={styles.formStatValueInput}
                                placeholder=""
                                name="carbs"
                                defaultValue={carbs}
                            />
                        </div>
                    </div>
                    <div className={styles.formSubmitContainer}>
                        <button type="submit" name="submit" className={styles.formSubmit} onClick={onSubmit}>✔️</button>
                        {onDelete !== null && <button type="submit" name="delete" className={styles.formSubmit} onClick={onSubmit}>✖️</button>}
                    </div>
                </Form>
            </div>
        </div>
    )
}
