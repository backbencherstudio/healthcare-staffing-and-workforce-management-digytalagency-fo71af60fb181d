import DashboardStatsCard from "./DashboardStatsCard";
const dashbaordStats = [
    {
        "label": "active_hcps",
        "value": "45"
    },
    {
        "label": "fill_rate",
        "value": "100"
    },
    {
        "label": "pending_timesheet",
        "value": "0"
    },
    {
        "label": "total_hours_booked",
        "value": "44"
    }
]


export interface statsType {
    label: string;
    value: string;
}

export default async function DashboardStats() {

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 min-[1500px]:grid-cols-4 gap-4">
            {dashbaordStats?.map(item =>
                <DashboardStatsCard data={item}/>
            )}
        </div>
    )
}