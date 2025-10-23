import MatrixOverviewCard from "./MatrixOverviewCard"
import { Roboto } from "next/font/google"

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})

const data = [
    {
        title: `${1} Documents expiring soon`,
        value: 0
    },
    {
        title: `${0} Open shifts today`,
        value: 0
    },
    {
        title: `${1} Staff below 3 star rating`,
        value: 0
    },
]

export default function MetricsOverview() {
    return (
        <div className="bg-[#F4F8FE] py-6 px-[18px] space-y-[27px] rounded-lg">
            <h3 className={`capitalize text-black font-semibold leading-[30px] text-xl ${roboto?.variable} font-sans`}>Key Metrics Overview</h3>
            <div className="xl:grid grid-cols-3 flex flex-col gap-4">
                {data?.map(item =>
                    <MatrixOverviewCard data={item} />
                )}
            </div>
        </div>
    )
}