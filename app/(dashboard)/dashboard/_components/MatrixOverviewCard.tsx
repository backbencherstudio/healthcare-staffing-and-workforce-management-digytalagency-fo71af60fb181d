
interface propType{
    data:{
        title: string;
        value: number;
    }
}


export default function MatrixOverviewCard({data}:propType){
    return(
        <div className="bg-white py-6 px-[18px] rounded-lg space-y-[6px]">
            <h3 className="text-[#2F3131] font-semibold leading-[24px]">Compliance Status</h3>
            <h4 className="text-[#A47D06] capitalize font-medium leading-[27px]">{data?.title}</h4>
            <p className="text-[#5B5F5F] capitalize text-sm leading-[22.4px]">New Applicants: {data?.value}</p>
        </div>
    )
}