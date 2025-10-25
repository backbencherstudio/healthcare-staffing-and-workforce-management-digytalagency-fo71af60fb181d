'use client'

import Image from "next/image"
// import avatar from '@/public/images/user.png'
import { singlePageIcon } from "@/public/SVG/DashbaordSvg"
import { singleAvatar } from "@/public/SVG/DashbaordSvg"
import StaffDetailsTable from "./StaffDetailsTable"
import { useEffect, useState } from "react"
import { UserService } from "@/userservice/user.service"
import ImageViewer from "./ImageViewer"
import StaffDetailsCard from "./staffManagement/StaffDetailsCard"
import ClientDetailsCard from "./clientManagement/ClientDetailsCard"
import { staff } from "../staff_management/page"
import { client } from "../client_management/page"
import toast,{Toaster} from "react-hot-toast"

type certificatesType = {
    name: string;
    printDate: string;
    expiryDate: string;
    status: string;
    file: string;
}

export default function StaffDetails({ id }: { id: string }) {
    const [certificates, setCertificates] = useState<certificatesType[]>([]);
    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [imageViewerData, setImageViewerData] = useState<string[]>([])
    const [employeeType, setEmployeeType] = useState<string>('');
    const [employeeId, setEmployeeId] = useState<string>('')
    const [staffData, setStaffData] = useState<staff>()
    const [clientData, setClientData] = useState<client>();
    const [loading,setLoading] = useState(true);
    const [isUpdating,setIsUpdating] = useState(false);

    const fetchCertificates = async () => {
        try {
            const res = await UserService?.getCertificates({ id: "" });
            console.log("Certificates : ", res);
            if (res?.statusText === "OK") {
                setCertificates(res?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchStaffData = async () => {
        try {
            const res = await UserService?.getSingleStaffData({ id: employeeId });
            console.log("Certificates : ", res);
            if (res?.statusText === "OK") {
                setStaffData(res?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const fetchClientData = async () => {
        try {
            const res = await UserService?.getSingleClientData({ id: employeeId });
            console.log("Certificates : ", res);
            if (res?.statusText === "OK") {
                setClientData(res?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleImageViewer = (data: string[]) => {
        setOpenImageViewer(true);
        setImageViewerData(data);
    }


    useEffect(() => {
        fetchCertificates()
        setEmployeeType(id?.split('-')?.[0] || '');
        setEmployeeId(id?.split('-')?.[1] || '');
    }, [])

    useEffect(() => {
        if (employeeId) {
            if (employeeType === "staff")
                fetchStaffData()
            else {
                fetchClientData()
            }
        }
        setLoading(false);
    }, [employeeId])

    const handleAccountStatus = async (status: string) => {
        setIsUpdating(true);
        const data = {
            // "id": "1",
            // "name": "John Smith",
            // "mobile_number": "+1-555-0101",
            // "email": "john.smith@example.com",
            // "primary_role": "Nurse",
            // "right_to_work_status": "Verified",
            // "dob": "1985-03-15",
            "account_status": status,
            // "image": "/images/user.png",
            // "role": "Senior HCA / HCA / Carer",
            // "createdAt": "2025-10-12",
            // "rating": "4.5",
            // "compliance_docs": {
            //     "exp": "2026-03-15",
            //     "pin_soe": "A1234567",
            //     "nvq": "BSc Nursing"
            // },
            // "employment": {
            //     "max_hours": "48",
            //     "passport_photo": "/images/user.png"
            // },
            // "type": "staff"
        }
        try {
            if (employeeType === "client") {
                const res = await UserService?.updateSingleClientData({ id: employeeId, data });
                if(res?.statusText === "OK"){
                    toast.success("Account updated successfully.");
                    fetchClientData()
                }else{
                    toast.error("Faild to update account.");
                }
            } else {
                const res = await UserService?.updateSingleStaffData({ id: employeeId, data });
                if(res?.statusText === "OK"){
                    toast.success("Account updated successfully.");
                    fetchStaffData()
                }else{
                    toast.error("Faild to update account.");
                }
            }
        } catch (err) {
            console.log(err);
        }finally{
            setIsUpdating(false);
        }
    }

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B9BF4]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white w-full h-full p-6 space-y-6">
            <Toaster position="top-right"/>
            <div className="font-medium flex items-center justify-between">
                <h3 className="text-[#383E49] capitalize text-xl font-semibold leading-[30px]">Alice Johnson (RN) Profile (Nurse)</h3>
                {staffData?.account_status === "pending" || clientData?.account_status === "pending" && <div className="flex items-center gap-4">
                    <button type="button" className="bg-[#ff2e2e] text-white cursor-pointer px-5 py-[8px] rounded-lg" onClick={() => handleAccountStatus('rejected')}>{isUpdating?"Updating":"Reject Account"}</button>
                    <button type="button" className="cursor-pointer px-5 py-[8px] bg-[#1FB155] text-white rounded-lg" onClick={() => handleAccountStatus('active')}>{isUpdating?"Updating":"Approve Account"}</button>
                </div>}
                {staffData?.account_status === "active" || clientData?.account_status === "active" && <button type="button" className="bg-[#ff2e2e] text-white cursor-pointer px-5 py-[8px] rounded-lg" onClick={() => handleAccountStatus('suspended')}>{isUpdating?"Updating":"Suspend"}</button>}
                {staffData?.account_status === "suspended" || clientData?.account_status === "suspended" && <button type="button" className="cursor-pointer px-5 py-[8px] bg-[#1FB155] text-white rounded-lg" onClick={() => handleAccountStatus('active')}>{isUpdating?"Updating":"Active"}</button>}
            </div>
            {employeeType === "staff" ?
                <StaffDetailsCard handleImageViewer={handleImageViewer} data={staffData} />
                :
                <ClientDetailsCard handleImageViewer={handleImageViewer} data={clientData} />
            }
            <div>
                <StaffDetailsTable data={certificates} empType={employeeType} clientFinancialData={clientData} id={employeeId} handleImageViewer={handleImageViewer}/>
            </div>
            {openImageViewer && <ImageViewer data={imageViewerData} onClose={() => setOpenImageViewer(false)} />}
        </div>
    )
}