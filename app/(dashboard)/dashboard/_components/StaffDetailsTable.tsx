import DynamicTable from "@/helper/DynamicTable"
import { openEye } from "@/public/SVG/DashbaordSvg";
import { documentIcon } from "@/public/SVG/DashbaordSvg";


type certificatesType = {
    name: string;
    printDate: string;
    expiryDate: string;
    status: string;
}


export default function StaffDetailsTable({ data }: { data: certificatesType[] }) {
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
                    <button type="button" className="p-[10px] flex items-center justify-center leading-0 bg-[#FEB000] rounded-lg text-white cursor-pointer">
                        {openEye}
                    </button>
                </div>
            )
        },
    ]
    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 p-6 bg-[#F4F8FE] rounded-lg">
                <DynamicTable data={data} columns={columns} header={{ bg: "#E8F1FD", padding: '16px', text: "#687588" }} />
            </div>
            <div className="h-fit space-y-6">
                <div className="bg-[#F4F8FE] border border-[#1570ef52] rounded-lg p-4 space-y-[14px]">
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
                <div className="border border-[#CFD2D2] rounded-lg  px-4 py-6 space-y-[14px]">
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
            </div>
            <div className="pb-10"></div>
        </div>
    )
}