import DashboardStatsCard from "./_components/DashboardStatsCard"
import DashboardStats from "./_components/DashboardStats"
import { UserService } from "@/userservice/user.service"
import CareProviderCard from "./_components/CareProviderCard"
import { multiAvatar, activeAvatar, suspendedAvatar } from "@/public/SVG/DashbaordSvg"
import MetricsOverview from "./_components/MetricsOverview"
import BarChart from "./_components/BarChart"
import CareProviderList from "./_components/CareProviderList"
import DashboardNotificationCard from "./_components/DashboardNotificationCard"


const data = [
    {
        label: "total",
        value: 400,
        icon: multiAvatar,
        color: '#1570EF'
    },
    {
        label: "active",
        value: 200,
        icon: activeAvatar,
        color: '#147638'
    },
    {
        label: "suspended",
        value: 200,
        icon: suspendedAvatar,
        color: '#EF4444'
    },
]


const notificationData=[
    {
        title: "Staff Performance Alerts",
        desc: "You have **1** staff members rated below 3 stars needing immediate review and follow-up.",
        button: "Review Now",
        color: "#ef4444a3",
        bgColor: "#FDECEC"
    },
    {
        title: "Compliance & Onboarding",
        desc: "**1** HCP documents are expiring soon. **0** new staff pending approval",
        button: "Manage Compliance",
        color: "#eab308a3",
        bgColor: "#FDF7E6"
    },
]


export default function Page() {
    return (
        <div className="bg-white w-full h-full p-6 space-y-6">
            <div className="w-full h-fit dashboard gap-6">
                <div className="flex-1 flex flex-col gap-6 min-h-0">
                    <DashboardStats />
                    <MetricsOverview />
                </div>

                <div className="min-w-[350px] h-full grid grid-rows-2 gap-6">
                    <div className="min-h-0">
                        <CareProviderCard title="Care Provider" data={data} />
                    </div>
                    <div className="min-h-0">
                        <CareProviderCard title="Agency Staff (Worker)" data={data} />
                    </div>
                </div>
            </div>
            <div className="flex gap-6 w-full">
                <div className="flex-1 grid grid-cols-2 gap-6">
                    <BarChart />
                    <CareProviderList />
                </div>
                <div className="w-[370px] space-y-6 grid grid-rows-2">
                    {notificationData?.map(item=>
                        <DashboardNotificationCard data={item}/>
                    )}
                </div>
            </div>
        </div>
    )
}