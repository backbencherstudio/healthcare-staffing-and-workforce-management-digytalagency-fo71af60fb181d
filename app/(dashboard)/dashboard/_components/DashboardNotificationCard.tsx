import { warningIcon } from "@/public/SVG/DashbaordSvg"
import { Roboto } from "next/font/google"

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})


const colors = {
    "staffPerformance": {
        color: "#ef4444a3",
        bgColor: "#FDECEC",
        border: "#ef4444a3",
        button: "#EF4444",
        title: "#EF4444",
        subTitle: "#EF4444"
    },
    "compliance": {
        color: "#ef4444a3",
        bgColor: "#FDECEC",
        border: "#EAB308",
        button: "#EAB308",
        title: "#A47D06",
        subTitle: "#A47D06"
    }
}

interface propType {
    data: {
        title: string,
        desc: string,
        button: string,
        type: string
    }
}


export default function DashboardNotificationCard({ data }: propType) {
    const color = colors[data?.type as keyof typeof colors]
    return (
        <div
            className={`p-4 rounded-[8px] flex flex-col justify-center items-center gap-4 lg:w-[320px]`}
            style={{
                backgroundColor: color.bgColor,
                borderLeft: `4px solid ${color?.border}`,
                borderTop: data ? `1px solid ${color?.border}` : undefined,
                borderRight: data ? `1px solid ${color.border}` : undefined,
                borderBottom: data ? `1px solid ${color?.border}` : undefined,
            }}
        >
            <div className="flex items-center gap-3">
                <div style={{ color: `${color?.title}` }}>
                    {warningIcon}
                </div>
                <div className="">
                    <h3 className={`font-medium ${roboto?.variable} font-sans`} style={{ color: color?.title }}>{data?.title}</h3>
                    <p className="text-wrap text-sm" style={{ color: color?.subTitle }}>{data?.desc}</p>
                </div>
            </div>
            <button type="button" className="px-[26px] py-[10px] text-white rounded-lg font-medium cursor-pointer" style={{ backgroundColor: color?.button }}>{data?.button}</button>
        </div>
    );
}