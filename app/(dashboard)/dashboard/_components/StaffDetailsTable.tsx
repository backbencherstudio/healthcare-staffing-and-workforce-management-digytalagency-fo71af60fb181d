'use client'

import DynamicTable from "@/helper/DynamicTable"
import { openEye } from "@/public/SVG/DashbaordSvg";
import { documentIcon, euro } from "@/public/SVG/DashbaordSvg";
import Link from "next/link";
import { FormEventHandler, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { client } from "../client_management/page";
import { UserService } from "@/userservice/user.service";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";


type certificatesType = {
    name: string;
    printDate: string;
    expiryDate: string;
    status: string;
    file: string;
}

type financialSettingsType = {
    rateStructure: string;
    margin: string;
}


type propType = {
    data: certificatesType[];
    empType: string;
    clientFinancialData?: client;
    id: string;
    handleImageViewer: (data: string[]) => void;
}


export default function StaffDetailsTable({ data, empType, clientFinancialData, id, handleImageViewer }: propType) {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<financialSettingsType>();
    const [bonus, setBonus] = useState<string>('')
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleViewFile = (file: string) => {
        const path = file?.split('.');
        if (path[path.length - 1] === 'pdf') {
            window.open(file, '_blank');
        }
        else {
            handleImageViewer([file])
        }
    }


    const columns = [
        {
            label: "Training Certificates",
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
            label: "Certificate Print Date / Expiry",
            accessor: "printDate",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] font-normal text-base leading-[24px]'>
                        {row.printDate} / {row.expiryDate}
                    </span>
                </div>
            )
        },
        {
            label: "Certificate Status",
            accessor: "status",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] font-normal text-base leading-[24px]'>
                        {row.status}
                    </span>
                </div>
            )
        },
        {
            label: "Action",
            accessor: "action",
            width: "40px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <button type="button" onClick={() => handleViewFile(row?.file)} className="p-[10px] flex items-center justify-center leading-0 bg-[#FEB000] rounded-lg text-white cursor-pointer">
                        {openEye}
                    </button>
                </div>
            )
        },
    ]


    const handleFinancialSettings = (data: financialSettingsType) => {
        console.log(data);
    }

    const handleUpdateBonus: FormEventHandler<HTMLFormElement> = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!bonus) {
            return;
        }
        try {
            const res = await UserService?.updateSingleClientData({ id, data: { bonus: bonus?.split(',') } });
            if (res?.statusText === "OK") {
                toast.success("Bonus updated successfully.");
            } else {
                toast.error("Faild to update bonus.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setBonus(clientFinancialData?.bonus?.join(',') || "");
    }, [clientFinancialData])

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            {empType === "client" && <div className="grid lg:grid-cols-2 gap-4">
                <div className="p-6 bg-[#EFF0FE] border border-[#6366f152] rounded-lg">
                    <div className="space-y-[14px]">
                        <div className="pb-[10px] text-[#6366F1] flex items-center text-[18px] font-medium leading-[27px] border-b border-[#CFD2D2] w-fit">
                            {euro}
                            <h3>Client Financial Settings (Rates/Margin)</h3>
                        </div>
                        <div>
                            <div>
                                <span className="text-[#A47D06] font-medium leading-[24px]">Geofence Status: </span>
                                <span className="text-[#147638] font-semibold leading-[27px]">PINNED</span>
                            </div>
                            <div className="space-x-1">
                                <span className="text-sm leading-[22.4px] text-black font-normal">Links: </span>
                                <Link href="" className="text-[#1570EF] text-sm">Map</Link>
                                <span className="">|</span>
                                <Link href="" className="text-[#1570EF] text-sm">Transport</Link>
                                <span className="text-sm">(Link for HCPs)</span>
                            </div>
                        </div>
                        <form action="" onSubmit={handleSubmit(handleFinancialSettings)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="clientId" className="text-sm leading-[22.4px]">Client Rate Structure</label>
                                    <div className="px-5 py-4 bg-[#F4F8FE] rounded-lg">
                                        <input
                                            type="text"
                                            id="clientId"
                                            placeholder="Add Client ID/Name to block"
                                            className="outline-none w-full text-sm"
                                            {...register('rateStructure', { required: true })}
                                        />
                                    </div>
                                    {errors?.rateStructure && <span className="text-sm text-red-300">Rate structure is required.</span>}
                                </div>
                                <div>
                                    <label htmlFor="agencyMargin" className="text-sm leading-[22.4px]">Agency Margin(%)</label>
                                    <div className="px-5 py-4 bg-[#F4F8FE] rounded-lg">
                                        <input
                                            type="text"
                                            id="agencyMargin"
                                            inputMode="numeric"
                                            placeholder="Agency margin"
                                            className="outline-none w-full text-sm"
                                            {...register('margin', {
                                                required: true,
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message: "Please enter numbers only"
                                                },
                                                onChange: (e) => {
                                                    // Remove non-numeric characters in real-time
                                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors?.rateStructure && <span className="text-sm text-red-300">Margin is required.</span>}
                                </div>
                            </div>
                            <button type="submit" className="bg-[#1570EF] text-white font-medium capitalize leading-[24px] w-full rounded-lg px-5 py-[10px] cursor-pointer">Save Financial settings</button>
                        </form>
                    </div>
                </div>
                <div className="p-6 bg-[#D6F5DA] border border-[#22c55e52] rounded-lg">
                    <div className="space-y-[14px]">
                        <div className="pb-[10px] text-[#147638] flex items-center text-[18px] font-medium leading-[27px] border-b border-[#CFD2D2] w-fit">
                            {euro}
                            <h3>Emergency Shift Bonus Settings</h3>
                        </div>
                        <div>
                            <p>Client can select from these increments to boost an urgent shift</p>
                            <p>£10 / £20 / £30 / £40 / £50</p>
                        </div>
                        <form action="" onSubmit={handleUpdateBonus} className="space-y-4">
                            <div>
                                <div>
                                    <div className="px-5 py-4 bg-[#F4F8FE] rounded-lg">
                                        <input
                                            type="text"
                                            id="bonus"
                                            value={bonus}
                                            onChange={(e) => setBonus(e.target.value)}
                                            placeholder="10, 20, 30, 40, 50"
                                            className="outline-none w-full text-sm"
                                        />
                                    </div>
                                    {/* {!bonus && <span className="text-sm text-red-300">Rate structure is required.</span>} */}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#1FB155] text-white font-medium capitalize leading-[24px] w-full rounded-lg px-5 py-[10px] cursor-pointer"
                            >
                                {loading ? "Updating" : "Update Bonus"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            }
            <div className={`grid ${empType === "staff" ? "xl:grid-cols-3" : ""} gap-6`}>
                <div className="xl:col-span-2 p-6 bg-[#F4F8FE] rounded-lg">
                    <DynamicTable data={data} columns={columns} header={{ bg: "#E8F1FD", padding: '16px', text: "#687588" }} />
                </div>
                {empType === "staff" && <div className="h-fit gap-6 grid sm:grid-cols-2 xl:grid-cols-1 w-full">
                    <div className="bg-[#F4F8FE] w-full h-full border border-[#1570ef52] rounded-lg p-4 space-y-[14px]">
                        <div className="text-[#1570EF] flex items-center gap-1">
                            {documentIcon}
                            <span className="text-[18px] font-medium">HCP Feedback (Admin Review)</span>
                        </div>
                        <div className="space-y-2">
                            <h3>Client: The Golden Manor <span>Pending Review</span></h3>
                            <p>"Lack of proper handover process on Ward B."</p>
                        </div>
                        <button type="button" className="text-white px-5 py-2 bg-[#1570EF] rounded-lg font-medium cursor-pointer">Approve & Publish</button>
                    </div>
                    <div className="border h-full w-full border-[#CFD2D2] rounded-lg  px-4 py-6 space-y-[14px]">
                        <div className="text-[#2F3131] flex items-center gap-1">
                            {documentIcon}
                            <span className="text-[18px] font-medium">Internal Admin Notes (Private)</span>
                        </div>
                        <div>
                            <textarea
                                className="p-3 resize-none bg-[#F4F8FE] w-full h-[172px] rounded-lg outline-none"
                                placeholder="[2024-09-01] Initial onboarding complete. Excellent references."
                            >

                            </textarea>
                        </div>
                        <button type="button" className="text-white px-5 py-2 bg-[#1570EF] rounded-lg font-medium cursor-pointer">Save Admin Notes</button>
                    </div>
                </div>}
                <div className="pb-10"></div>
            </div>
        </div>
    )
}