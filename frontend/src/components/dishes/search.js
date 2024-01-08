import { Form } from "react-router-dom";
import styles from "./search.module.css"



export default function SearchBar() {
    return (
        <Form action="search" className={styles.form}>
            <input
                className={styles.input}
                placeholder="Чтояем?"
                type="search"
                name="query"
            />
            <button type="submit" className={styles.submit}><div className={styles.emote}>⌕</div></button>
        </Form>
    )
}
