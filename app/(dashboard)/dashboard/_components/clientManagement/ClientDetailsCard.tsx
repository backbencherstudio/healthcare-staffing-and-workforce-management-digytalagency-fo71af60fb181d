import { singleAvatar, singlePageIcon, locationIcon } from "@/public/SVG/DashbaordSvg";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../client_management/page";

type propType = {
    handleImageViewer: (data: string[]) => void;
    data?: client;
}


export default function ClientDetailsCard({ handleImageViewer,data }: propType) {
    return (
        <div className="p-4 rounded-lg border border-[#CFD2D2] grid min-[1700px]:grid-cols-3 gap-4">
            <div className="space-y-4">
                <div className="flex gap-4">
                    <Image src={data?.image || ""}alt="User avatar" width={500} height={500} className="w-[172px] aspect-square rounded-lg object-cover" />
                    <div className="text-[#2F3131]">
                        <h3 className="text-2xl capitalize font-semibold leading-[36px]">{data?.name}</h3>
                        <div>
                            <span className="font-medium leading-[25.6px]">Registration Number: </span>
                            <span>{data?.registration_number}</span>
                        </div>
                        <div>
                            <span className="font-medium leading-[25.6px]">VAT/Tax ID:  </span>
                            <span>{data?.vat_taxid}</span>
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
                        <h3 className="text-[#2F3131] text-lg font-medium leading-[27px]">Primary Contacts & Details</h3>
                    </div>
                    <div className="text-black leading-[24px] space-y-4">
                        <div>
                            <span className="font-semibold">Manager: </span>
                            <span>{data?.primary_contact?.manager}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Deputy: </span>
                            <span>{data?.primary_contact?.deputy}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Contact: </span>
                            <span>{data?.primary_contact?.contact}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Postcode: </span>
                            <span>{data?.primary_contact?.postcode}</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-[14px]">
                    <div className="py-[14px] flex text-[#A47D06] items-center gap-[6px] border-b border-[#CFD2D2]">
                        <div>
                            {locationIcon}
                        </div>
                        <h3 className="text-lg font-medium leading-[27px]">Employment & Restriction</h3>
                    </div>
                    <div className="text-black leading-[24px] space-y-4">
                        <div>
                            <span className="text-[#A47D06] font-medium">Geofence Status: </span>
                            <span className="uppercase text-[#147638] font-semibold">{data?.employment?.status}</span>
                        </div>
                        <div className="space-x-1">
                            <span className="text-sm leading-[22.4px] text-black font-normal">Links: </span>
                            <Link href={`${data?.employment?.map}`} className="text-[#1570EF] text-sm">Map</Link>
                            <span className="">|</span>
                            <Link href={`${data?.employment?.transport}`} className="text-[#1570EF] text-sm">Transport</Link>
                            <span className="text-sm">(Link for HCPs)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}