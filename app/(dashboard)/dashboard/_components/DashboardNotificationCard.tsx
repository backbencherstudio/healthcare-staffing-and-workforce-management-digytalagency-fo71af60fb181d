import { warningIcon } from "@/public/SVG/DashbaordSvg"


interface propType {
    data: {
        title: string,
        desc: string,
        button: string,
        color: string,
        bgColor: string
    }
}


export default function DashboardNotificationCard({ data }: propType) {

    return (
        <div
            className={`px-6 py-[36px] rounded-[8px] flex flex-col justify-center items-center gap-4`}
            style={{
                backgroundColor: data?.bgColor,
                borderLeft: `4px solid ${data?.color}`,
                borderTop: data ? `1px solid ${data.color}` : undefined,
                borderRight: data ? `1px solid ${data.color}` : undefined,
                borderBottom: data ? `1px solid ${data.color}` : undefined,
            }}
        >
            <div className="flex items-center gap-3">
                <div style={{ color: `${data?.color}` }}>
                    {warningIcon}
                </div>
                <div className="">
                    <h3 className="font-medium" style={{color: data?.color}}>{data?.title}</h3>
                    <p className="text-wrap text-sm" style={{color: data?.color}}>{data?.desc}</p>
                </div>
            </div>
            <button type="button" className="px-[26px] py-[10px] text-white rounded-lg font-medium cursor-pointer" style={{backgroundColor: data?.color}}>{data?.button}</button>
        </div>
    );
}