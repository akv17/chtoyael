import { Form } from "react-router-dom";
import styles from "./search.module.css"



export default function SearchBar({state, setState}) {
    function onChange(e) {
        const query = e.target.value.length > 0 ? e.target.value : null
        setState({...state, query: query})
    }
    return (
        <Form action="search" className={styles.form}>
            <input
                onChange={onChange}
                className={styles.input}
                placeholder="Чтояем?"
                type="search"
                name="query"
                defaultValue={state.query || ""}
            />
            <button type="submit" className={styles.submit}><div className={styles.emote}>⌕</div></button>
        </Form>
    )
}
