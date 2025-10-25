'use client'

import { UserService } from "@/userservice/user.service";
import { useEffect, useState } from "react";
import StaffTable from "../_components/staffManagement/StaffTable";
import Image from "next/image";
import { documentIcon } from "@/public/SVG/DashbaordSvg";
import { openEye } from "@/public/SVG/DashbaordSvg";
import { deleteIcon } from "@/public/SVG/DashbaordSvg";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";


type staffStatusType = {
    id: string;
    key: string;
    title: string;
    count: number;
}

export type staff = {
    id?: string;
    name?: string;
    mobile_number?: string;
    email?: string;
    primary_role?: string;
    right_to_work_status?: string;
    dob?: string;
    account_status?: string;
    image?: string;
    role?: string;
    createdAt?: string;
    rating?: string;
    compliance_docs?: {
        exp: string;
        pin_soe: string;
        nvq: string;
    },
    employment?: {
        max_hours: string;
        passport_photo: string;
    },
    type?: string;
}

const colors = {
    total: "#1570EF",
    pending: "#E19133",
    active: "#845EBC",
    suspended: "#F36960"
}

// Define the type for colors keys
type ColorKey = keyof typeof colors;

export default function Page() {
    const [staffStatus, setStaffStatus] = useState<staffStatusType[]>([]);
    const [staffData, setStaffData] = useState<staff[]>([]);
    const [selectedAccountStatus, setSelectedAccountStatus] = useState('');
    const handleAccountStatusChange = (value: string) => {
        setSelectedAccountStatus(value);
    }
    const router = useRouter();
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

    const columns = [
        {
            label: "Name",
            accessor: "name",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-base leading-[24px]'>
                        {row.name}
                    </span>
                </div>
            )
        },
        {
            label: "Image",
            accessor: "image",
            width: "80px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <Image src="/images/avatar.png" alt={row?.name} width={500} height={500} className="w-[48px] h-[48px] rounded-full object-cover" />
                </div>
            )
        },
        {
            label: "Mobile Number",
            accessor: "mobile_number",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-base font-normal leading-[24px]'>
                        {row.mobile_number}
                    </span>
                </div>
            )
        },
        {
            label: "Email",
            accessor: "email",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-base font-normal leading-[24px]'>
                        {row.email}
                    </span>
                </div>
            )
        },
        {
            label: "Primary Role",
            accessor: "primary_role",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-base font-normal leading-[24px]'>
                        {row.primary_role}
                    </span>
                </div>
            )
        },
        {
            label: "CV",
            accessor: "cv",
            width: "100px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <button type="button" className="cursor-pointer">
                        {documentIcon}
                    </button>
                    <h3 className="text-[#2F3131] font-medium">CV</h3>
                </div>
            )
        },
        {
            label: "Right to Work Status",
            accessor: "right_to_work_status",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-base font-normal leading-[24px]'>
                        {row.right_to_work_status}
                    </span>
                </div>
            )
        },
        {
            label: "Date of Birth",
            accessor: "dob",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-base font-normal leading-[24px]'>
                        {row.dob}
                    </span>
                </div>
            )
        },
        {
            label: "account_status",
            accessor: "account_status",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {/* <span className='text-[#111827] text-base font-normal leading-[24px]'>
                        {row.account_status}
                    </span> */}
                    <Select
                    // value={selectedAccountStatus}
                    // onValueChange={(value)=>handleAccountStatusChange(value)}
                    >
                        <SelectTrigger className={`w-[180px] shadow-none outline-none text-sm ${selectedAccountStatus === 'active' ? "text-[#147638]" : selectedAccountStatus === "pending" ? "text-[#A47D06]" : "text-[#EF4444]"}`}>
                            <SelectValue placeholder="Select account status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )
        },
        {
            label: "Action",
            accessor: "action",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center justify-end gap-2 p-4'>
                    <button type="button" onClick={() => router.push(`/dashboard/staff_management/staff-${row?.id}`)} className="p-[10px] flex items-center justify-center leading-0 bg-[#FEB000] rounded-lg text-white cursor-pointer">
                        {openEye}
                    </button>
                    <button type="button" className="p-[10px] flex items-center justify-center leading-0 bg-[#E03137] rounded-lg text-white cursor-pointer">
                        {deleteIcon}
                    </button>
                </div>
            )
        },
    ]

    return (
        <div className="bg-white w-full h-full p-6 space-y-6">
            <h3 className="text-[#383E49] font-semibold leading-[30px] text-xl">HCP Roster & Onboarding (4 Staff)</h3>
            <div className={`bg-[#F4F8FE] px-4 py-6 rounded-lg grid grid-cols-4`}>
                {staffStatus?.map(staff =>
                    <div
                        key={staff.id}
                        className={`${staff?.id !== "4" ? "border-r border-[#CFD2D2]" : ""} ${staff?.id !== "1" ? "px-[20px] xl:px-[55px]" : ""} space-y-3`}
                    >
                        <h3 className="font-medium leading-[24px]" style={{ color: colors[staff?.key as ColorKey] }}>{staff?.title}</h3>
                        <h2 className="text-[#5D6679] font-medium leading-[42px] text-[28px]">{staff?.count}</h2>
                    </div>
                )}
            </div>
            <div className="border border-[#CFD2D2] rounded-lg p-3">
                <StaffTable data={staffData} columns={columns} title="All staff" />
            </div>
            <div className="pb-[20px]">

            </div>
        </div>
    )
}