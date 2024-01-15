import { useLoaderData, Navigate } from "react-router-dom";
import DayService from "../services/day";

const service = new DayService()


export async function todayLoader({request}) {
    const dayId = await service.getTodayId()
    return dayId
}


export function TodayRoute() {
    const dayId = useLoaderData()
    return <Navigate to={`/day/${dayId}`}/>
}
