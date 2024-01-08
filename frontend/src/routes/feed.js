import { useLoaderData, redirect } from "react-router-dom"

import styles from "./feed.module.css"
import Header from "../components/header/main";
import Feed from "../components/feed/main";
import { FeedServiceMock } from "../services/feed";

const service = new FeedServiceMock()


export async function feedLoader({ request }) {
    const days = await service.getDays()
    return days
}


export function FeedRoute() {
    const days = useLoaderData()
    return <div className={styles.container}>
        <Header/>
        <Feed days={days}/>
    </div>
}
