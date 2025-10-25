import { singleAvatar, singlePageIcon } from "@/public/SVG/DashbaordSvg";
import Image from "next/image";
import { staff } from "../../staff_management/page";

type propType={
    handleImageViewer: (data:string[])=> void;
    data?: staff;
}


export default function StaffDetailsCard({handleImageViewer,data}:propType) {
    return (
        <div className="p-4 rounded-lg border border-[#CFD2D2] grid min-[1700px]:grid-cols-3 gap-4">
            <div className="space-y-4">
                <div className="flex gap-4">
                    <Image src={data?.image || ""} alt="User avatar" width={500} height={500} className="w-[172px] aspect-square rounded-lg object-cover" />
                    <div className="text-[#2F3131]">
                        <h3 className="text-2xl capitalize font-semibold leading-[36px]">{data?.name}</h3>
                        <div>
                            <span className="font-medium leading-[25.6px]">Role: </span>
                            <span>{data?.role}</span>
                        </div>
                        <div>
                            <span className="font-medium leading-[25.6px]">Birthdate: </span>
                            <span>{data?.dob}</span>
                        </div>
                        <div>
                            <span className="font-medium leading-[25.6px]">Member since: </span>
                            <span>{data?.createdAt}</span>
                        </div>
                        <div>
                            <span className="font-medium leading-[25.6px]">Rating: </span>
                            <span>{data?.rating}/5.0</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm text-[#147638] ">DBS Update Service: Yes</h3>
                    <h3 className="text-sm text-[#147638] ">(Last Check: 12/10/2025)</h3>
                </div>
            </div>
            <div className="col-span-2 grid md:grid-cols-2 gap-[48px]">
                <div className="space-y-[14px]">
                    <div className="py-3 flex items-center gap-[6px] border-b border-[#CFD2D2]">
                        <div>
                            {singlePageIcon}
                        </div>
                        <h3 className="text-[#2F3131] text-lg font-medium leading-[27px]">Compliance & Documents</h3>
                    </div>
                    <div className="text-black leading-[24px] space-y-4">
                        <div>
                            <span className="font-semibold">Compliant | Expires: </span>
                            <span>{data?.compliance_docs?.exp}</span>
                        </div>
                        <div>
                            <span className="font-semibold">NMC PIN/SOE: </span>
                            <span>{data?.compliance_docs?.pin_soe}</span>
                        </div>
                        <div>
                            <span className="font-semibold">NVQ III: </span>
                            <span>{data?.compliance_docs?.nvq}</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-[14px]">
                    <div className="py-3 flex items-center gap-[6px] border-b border-[#CFD2D2]">
                        <div>
                            {singleAvatar}
                        </div>
                        <h3 className="text-[#2F3131] text-lg font-medium leading-[27px]">Employment & Restriction</h3>
                    </div>
                    <div className="text-black leading-[24px] space-y-4">
                        <div>
                            <span className="font-semibold">Current Role: </span>
                            <span>{data?.role}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Max Hours/Wk: </span>
                            <span>{data?.employment?.max_hours}h</span>
                        </div>
                        <div>
                            <span className="font-semibold">Passport Photo: </span>
                            <button type="button" className="text-[#1570EF] cursor-pointer" onClick={() => handleImageViewer(['/images/user.png'])}>View Photos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}