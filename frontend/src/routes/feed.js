import { useLoaderData, redirect } from "react-router-dom"

import styles from "./feed.module.css"
import Header from "../components/header/main";
import Feed from "../components/feed/main";
import BackendService from "../api/service";

const service = new BackendService()


export async function feedLoader({ request }) {
    const days = await service.getDays(14)
    return days
}


export function FeedRoute() {
    const days = useLoaderData()
    return <div className={styles.container}>
        <Header/>
        <Feed days={days}/>
    </div>
}
