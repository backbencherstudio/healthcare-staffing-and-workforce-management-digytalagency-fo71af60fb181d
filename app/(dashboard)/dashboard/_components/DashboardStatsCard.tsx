import { statsType } from "./DashboardStats";
import { multiAvatar, graphIcon, clockIcon, singlePageIcon } from "@/public/SVG/DashbaordSvg";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})

const statsData = {
    active_hcps: {
        bgColor: "#FDF7E6",
        borderColor: "#eab308a3",
        iconColor: "#5B5F5F",
        titleColor: "#444",
        subTitleColor: "#5D6679",
        icon: multiAvatar,
        title: "Active HCPs"
    },
    fill_rate: {
        bgColor: "#D6F5DA",
        borderColor: "#22c55ea3",
        iconColor: "#147638",
        titleColor: "#444",
        subTitleColor: "#5D6679",
        icon: graphIcon,
        title: "Current Fill Rate"
    },
    pending_timesheet: {
        bgColor: "#EFF0FE",
        borderColor: "#6366f1a3",
        iconColor: "#6366F1",
        titleColor: "#444",
        subTitleColor: "#5D6679",
        icon: singlePageIcon,
        title: "Timesheets Pending"
    },
    total_hours_booked: {
        bgColor: "#E8F1FD",
        borderColor: "#1570efa3",
        iconColor: "#6366F1",
        titleColor: "#444",
        subTitleColor: "#5D6679",
        icon: clockIcon,
        title: "Total Hours Booked(Week)"
    },
}


export default function DashboardStatsCard({ data }: { data: statsType }) {
    const statConfig = statsData[data.label as keyof typeof statsData];

    return (
        <div
            className={`px-6 py-[36px] rounded-[8px] flex flex-col justify-center items-center gap-2`}
            style={{
                backgroundColor: statConfig?.bgColor,
                borderLeft: `4px solid ${statConfig?.borderColor}`,
                borderTop: statConfig ? `1px solid ${statConfig.borderColor}` : undefined,
                borderRight: statConfig ? `1px solid ${statConfig.borderColor}` : undefined,
                borderBottom: statConfig ? `1px solid ${statConfig.borderColor}` : undefined,
            }}
        >
            <div style={{ color: `${statConfig?.iconColor}` }}>
                {statConfig?.icon}
            </div>
            <div className="text-center">
                <h2
                className={`text-[18px] font-semibold leading-[27px] ${roboto.variable} font-sans`}
                    style={{ color: statConfig?.subTitleColor }}
                >
                    {data?.value}
                </h2>
                <h3
                    className={`text-[18px] font-medium leading-[27px] ${roboto.variable} font-sans`}
                    style={{ color: statConfig?.titleColor }}
                >
                    {statConfig?.title}
                </h3>
            </div>
        </div>
    );
}