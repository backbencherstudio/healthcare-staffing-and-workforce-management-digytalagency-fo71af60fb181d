'use client'

import Image from "next/image"
// import avatar from '@/public/images/user.png'
import { singlePageIcon } from "@/public/SVG/DashbaordSvg"
import { singleAvatar } from "@/public/SVG/DashbaordSvg"
import StaffDetailsTable from "./StaffDetailsTable"
import { useEffect, useState } from "react"
import { UserService } from "@/userservice/user.service"

type certificatesType={
    name: string;
    printDate: string;
    expiryDate: string;
    status: string;
}

export default function StaffDetails({ id }: { id: string }) {
    const [certificates,setCertificates] = useState<certificatesType[]>([]);
    const fetchCertificates= async()=>{
        try{
            const res = await UserService?.getCertificates({id:""});
            console.log("Certificates : ",res);
            if(res?.statusText === "OK"){
                setCertificates(res?.data);
            }
        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        fetchCertificates()
    },[])

    return (
        <div className="bg-white w-full h-full p-6 space-y-6">
            <div className="font-medium flex items-center justify-between">
                <h3 className="text-[#383E49] capitalize text-xl font-semibold leading-[30px]">Alice Johnson (RN) Profile (Nurse)</h3>
                <button type="button" className="cursor-pointer px-5 py-[8px] bg-[#1FB155] text-white rounded-lg">Approve Account</button>
                {/* <button type="button">Approve Account</button> */}
            </div>
            <div className="p-4 rounded-lg border border-[#CFD2D2] grid grid-cols-3 gap-4">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <Image src="/images/user.png" alt="User avatar" width={500} height={500} className="w-[172px] aspect-square rounded-lg object-cover" />
                        <div className="text-[#2F3131]">
                                <h3 className="text-2xl capitalize font-semibold leading-[36px]">Jone Doe</h3>
                            <div>
                                <span className="font-medium leading-[25.6px]">Role: </span>
                                <span>{"Senior HCA / HCA / Carer"}</span>
                            </div>
                            <div>
                                <span className="font-medium leading-[25.6px]">Birthdate: </span>
                                <span>{"2025-10-23"}</span>
                            </div>
                            <div>
                                <span className="font-medium leading-[25.6px]">Member since: </span>
                                <span>{"2025-10-07"}</span>
                            </div>
                            <div>
                                <span className="font-medium leading-[25.6px]">Rating: </span>
                                <span>{"4.8"}/5.0</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm text-[#147638] ">DBS Update Service: Yes</h3>
                        <h3 className="text-sm text-[#147638] ">(Last Check: 12/10/2025)</h3>
                    </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-[48px]">
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
                                <span>2026-03-15</span>
                            </div>
                            <div>
                                <span className="font-semibold">NMC PIN/SOE: </span>
                                <span>A1234567</span>
                            </div>
                            <div>
                                <span className="font-semibold">NVQ III: </span>
                                <span>BSc Nursing</span>
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
                                <span>Senior HCA / HCA/Carer</span>
                            </div>
                            <div>
                                <span className="font-semibold">Max Hours/Wk: </span>
                                <span>48h</span>
                            </div>
                            <div>
                                <span className="font-semibold">Passport Photo: </span>
                                    <button type="button" className="text-[#1570EF] cursor-pointer">View Photos</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <StaffDetailsTable data={certificates}/>
            </div>
        </div>
    )
}