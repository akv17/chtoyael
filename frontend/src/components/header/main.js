import styles from "./main.module.css"

import { Link } from "react-router-dom"


export default function Header() {
    return (
        <div className={styles.container}>
            <HeaderImage/>
            <div className={styles.controlContainer}>
                <div className={styles.linkButtonContainer}>
                    <HeaderLinkButton uri="/today" text="Сегодня"/>
                    <HeaderLinkButton uri="/feed" text="Лента"/>
                    <HeaderLinkButton uri="/dishes" text="Еда"/>
                </div>
            </div>
        </div>
    )
}


function HeaderImage() {
    return <img className={styles.image} src="/h1_.jpg"></img>
}


function HeaderLinkButton({uri, text}) {
    return (
        <Link to={uri}>
            <button className={styles.linkButton}>{text}</button>
        </Link>
    )
}
