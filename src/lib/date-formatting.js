import { formatDistanceToNow } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"


export const distanceToNow = (date) => {
    return formatDistanceToNow(date, {
        addSuffix: true,
    })
}


export const formatDate = (date) => {
    return formatInTimeZone(date, "UTC", "PPPP")
}
