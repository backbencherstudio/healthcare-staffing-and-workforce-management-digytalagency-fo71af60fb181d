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
        desc: "You have **1** staff members rated below 3 stars needing immediate...",
        button: "Review Now",
        type: "staffPerformance"
    },
    {
        title: "Compliance & Onboarding",
        desc: "**1** HCP documents are expiring soon. **0** new staff pending...",
        button: "Manage Compliance",
        type: "compliance"
    },
]


export default function Page() {
    return (
        <div className="bg-white w-full h-full p-6 space-y-6">
            <div className="w-full h-fit grid lg:grid-cols-[1fr_350px] gap-6">
                <div className="flex-1 flex flex-col gap-6 min-h-0">
                    <DashboardStats />
                    <MetricsOverview />
                </div>

                <div className="min-w-[350px] h-fit min-[1500px]:h-full grid min-[1500px]:grid-rows-2 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    <div className="min-h-0">
                        <CareProviderCard title="Care Provider" data={data} />
                    </div>
                    <div className="min-h-0">
                        <CareProviderCard title="Agency Staff (Worker)" data={data} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-6 w-full">
                <div className="flex-1 grid grid-cols-1 gap-6 min-[1500px]:grid-cols-2">
                    <BarChart />
                    <CareProviderList />
                </div>
                <div className="gap-6 grid h-fit min-[1500px]:h-auto min-[1500px]:grid-rows-2 sm:grid-cols-2 min-[1500px]:grid-cols-1 lg:grid-cols-1">
                    {notificationData?.map(item=>
                        <DashboardNotificationCard data={item} key={item?.type}/>
                    )}
                </div>
            </div>
        </div>
    )
}