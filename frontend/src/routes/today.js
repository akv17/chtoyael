import { useLoaderData, Navigate } from "react-router-dom";
import BackendService from "../api/service";

const service = new BackendService()


export async function todayLoader({request}) {
    const dayId = await service.getTodayId()
    return dayId
}


export function TodayRoute() {
    const dayId = useLoaderData()
    return <Navigate to={`/day/${dayId}`}/>
}
