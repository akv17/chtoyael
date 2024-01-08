import styles from "./main.module.css"

import { Link } from "react-router-dom"


export default function Header() {
    return (
        <div className={styles.container}>
            <HeaderLogo/>
            <HeaderLinkButton uri="/" text="Лента"/>
            <HeaderLinkButton uri="/dishes" text="Еда"/>
        </div>
    )
}


function HeaderLogo() {
    return <Link to="/" className={styles.logo}>Чтояел?</Link>
}


function HeaderLinkButton({uri, text}) {
    return (
        <Link to={uri}>
            <button className={styles.linkButton}>{text}</button>
        </Link>
    )
}
