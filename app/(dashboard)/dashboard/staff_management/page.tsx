'use client'

import { UserService } from "@/userservice/user.service";
import { useEffect, useState } from "react";
import StaffTable from "../_components/staffManagement/StaffTable";

type staffStatusType = {
    id: string;
    key: string;
    title: string;
    count: number;
}

type staff={
    id: string;
    name: string;
    mobile_number: string;
    email: string;
    primary_role: string;
    right_to_work_status: string;
    dob: string;
    account_status: string;
}

const colors = {
    total: "#1570EF",
    pending:"#E19133",
    active:"#845EBC",
    suspended:"#F36960"
}

// Define the type for colors keys
type ColorKey = keyof typeof colors;

export default function Page() {
    const [staffStatus, setStaffStatus] = useState<staffStatusType[]>([]);
    const [staffData,setStaffData] = useState<staff[]>([]);
    
    const fetchData = async () => {
        try {
            const res = await UserService?.getStaffStatus();
            console.log(res);
            if (res?.statusText === "OK") {
                setStaffStatus(res?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const fetchStaffData = async () => {
        try {
            const res = await UserService?.getStaffData();
            if (res?.statusText === "OK") {
                // console.log(res);
                setStaffData(res?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
        fetchStaffData();
    }, [])

    return (
        <div className="bg-white w-full h-full p-6 space-y-6">
            <h3 className="text-[#383E49] font-semibold leading-[30px] text-xl">HCP Roster & Onboarding (4 Staff)</h3>
            <div className={`bg-[#F4F8FE] px-4 py-6 rounded-lg grid grid-cols-4`}>
                {staffStatus?.map(staff =>
                    <div 
                        key={staff.id}
                        className={`${staff?.id !== "4"?"border-r border-[#CFD2D2]":""} ${staff?.id !== "1"?"px-[20px] xl:px-[55px]":""} space-y-3`}
                    >
                        <h3 className="font-medium leading-[24px]" style={{color: colors[staff?.key as ColorKey]}}>{staff?.title}</h3>
                        <h2 className="text-[#5D6679] font-medium leading-[42px] text-[28px]">{staff?.count}</h2>
                    </div>
                )}
            </div>
            <div className="border border-[#CFD2D2] rounded-lg p-3">
                <StaffTable data={staffData}/>
            </div>
            <div className="pb-[20px]">

            </div>
        </div>
    )
}