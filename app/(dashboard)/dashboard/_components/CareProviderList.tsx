'use client'

import DynamicTable from "@/helper/DynamicTable"

const tableData=[
    {
        provider_name: "Maple Haven (HCA/Carer)",
        location: "Flat 5, 10 Downing Street, London",
        reg_no: "ad4a6w4da65"
    },
    {
        provider_name: "Ocean View Retirement",
        location: "Flat 5, 10 Downing Street, London",
        reg_no: "ad4a6w4da65"
    },
    {
        provider_name: "Willow Creek Lodge",
        location: "Flat 5, 10 Downing Street, London",
        reg_no: "ad4a6w4da65"
    }
]


export default function CareProviderList() {
    const columns = [
        {
            label: "Provider Name",
            accessor: "provider_name",
            width: "160px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#070707] text-base font-light leading-[24px]'>
                        {row.provider_name}
                    </span>
                </div>
            )
        },
        {
            label: "Location",
            accessor: "location",
            width: "200px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#070707] text-base font-light leading-[24px]'>
                        {row.location}
                    </span>
                </div>
            )
        },
        {
            label: "Reg. No.",
            accessor: "reg_no",
            width: "100px",
            formatter: (_: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#070707] text-base font-light leading-[24px]'>
                        {row.reg_no}
                    </span>
                </div>
            )
        },
    ]
    return (
        <div className="p-4 bg-[#F4F8FE] rounded-lg flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3 className="text-[#16151C] capitalize text-xl font-semibold leading-[30px]">Care Provider List</h3>
                <button type="button" className="text-[#006EC4] cursor-pointer">View All</button>
            </div>
            {/* <div className="w-full h-px" style={{ backgroundColor: 'rgba(162, 161, 168, 0.20)' }}></div> */}
            <div className="h-full">
                <DynamicTable data={tableData} columns={columns} header={{bg:'white',padding:'16px'}}/>
            </div>
        </div>
    )
}