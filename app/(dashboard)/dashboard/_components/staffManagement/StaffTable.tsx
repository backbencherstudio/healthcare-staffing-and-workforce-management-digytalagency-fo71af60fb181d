

import DynamicTable from "@/helper/DynamicTable";
import { ReactElement } from "react";
import { filterIcon } from "@/public/SVG/DashbaordSvg";

type staff = {
    id?: string;
    name?: string;
    mobile_number?: string;
    email?: string;
    account_status?: string;
    primary_role?: string;
    right_to_work_status?: string;
    dob?: string;
    main_service_type?: string;
    license_paper?: string;
    registration_number?: string;
    vat_taxid?: string;
}

type columnType = {
    label: string;
    accessor: string;
    width: string;
    formatter: (_: any, row: any) => ReactElement;
}


type propType = {
    data: staff[];
    columns: columnType[];
    title: string;
}


export default function StaffTable({ data, columns, title }: propType) {



    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-[#383E49] font-medium leading-[30px] text-xl">{title}</h3>
                <button type="button" className="border-2 border-[#1018280d] text-[#35D6679] flex items-center gap-2 px-4 py-[10px]  rounded-lg cursor-pointer">
                    {filterIcon}
                    <span>Filters</span>
                </button>
            </div>
            <div>
                <DynamicTable data={data} columns={columns} header={{ bg: '#FAFAFA', padding: '16px', text: '#687588' }} tableMinWidth="100px" />
            </div>
        </div>
    )
}