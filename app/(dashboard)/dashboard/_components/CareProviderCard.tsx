
import { ReactElement } from "react";

interface dataType{
    label: string;
    value: number;
    icon: ReactElement;
    color: string;
}

export default function CareProviderCard({title,data}:{title:string,data:dataType[]}) {
    return (
        <div className="p-4 space-y-4 border border-[#6366f152] rounded-lg h-full">
            <h3 className="text-[#383E49] text-xl font-medium leading-[30px] text-center">{title}</h3>
            <div className="grid grid-cols-3">
                {data?.map(item =>
                    <div className={`flex flex-col gap-2 items-center ${item?.label !== "suspended" ? "border-r border-[#F0F1F3]" : ""}`}>
                        <div style={{ color: item?.color }}>
                            {item?.icon}
                        </div>
                        <div className="space-y-[2px] text-center">
                            <span
                            className="font-semibold"
                            style={{ color: item?.color }}
                        >
                            {item?.value}
                        </span>
                        <h2 className="text-[#444] capitalize font-medium text-sm leading-[21px]">
                            {item?.label}
                        </h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}