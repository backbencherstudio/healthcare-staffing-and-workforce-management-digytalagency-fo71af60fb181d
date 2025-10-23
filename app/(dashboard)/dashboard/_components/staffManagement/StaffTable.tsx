'use client'

import DynamicTable from "@/helper/DynamicTable";
import { useEffect, useState } from "react";
import avatar from '@/public/images/avatar.png';
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
} from "@/components/ui/select"

type staff = {
    id: string;
    name: string;
    mobile_number: string;
    email: string;
    primary_role: string;
    right_to_work_status: string;
    dob: string;
    account_status: string;
}


export default function StaffTable({ data }: { data: staff[] }) {
    const [selectedAccountStatus,setSelectedAccountStatus] = useState('');
    const handleAccountStatusChange=(value:string)=>{
        setSelectedAccountStatus(value);
    }
    const columns = [
        {
            label: "Name",
            accessor: "name",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] font-normal text-base leading-[24px]'>
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
                    <Image src={avatar} alt={row?.name} width={500} height={500} className="w-[48px] h-[48px] rounded-full object-cover" />
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
                        <SelectTrigger className={`w-[180px] shadow-none outline-none text-sm ${selectedAccountStatus === 'active'?"text-[#147638]": selectedAccountStatus === "pending"?"text-[#A47D06]":"text-[#EF4444]"}`}>
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
                    <button type="button" className="p-[10px] flex items-center justify-center leading-0 bg-[#FEB000] rounded-lg text-white cursor-pointer">
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
        <div className="space-y-6">
            <h3 className="text-[#383E49] font-medium leading-[30px] text-xl">All Staff</h3>
            <div>
                <DynamicTable data={data} columns={columns} header={{ bg: '#FAFAFA', padding: '16px', text: '#687588' }} tableMinWidth="100px" />
            </div>
        </div>
    )
}