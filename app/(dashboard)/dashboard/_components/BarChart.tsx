// components/BarChart.tsx
'use client';

import React from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export interface BarChartData {
    month: string;
    careProvider: number;
    agencyStaff: number;
}

export interface ChartProps {
    data?: BarChartData[];
}

const defaultData: BarChartData[] = [
    { month: 'Jan', careProvider: 45, agencyStaff: 32 },
    { month: 'Feb', careProvider: 52, agencyStaff: 38 },
    { month: 'Mar', careProvider: 48, agencyStaff: 41 },
    { month: 'Apr', careProvider: 61, agencyStaff: 45 },
    { month: 'May', careProvider: 55, agencyStaff: 48 },
    { month: 'Jun', careProvider: 58, agencyStaff: 52 },
    { month: 'Jul', careProvider: 65, agencyStaff: 55 },
    { month: 'Aug', careProvider: 62, agencyStaff: 58 },
    { month: 'Sep', careProvider: 70, agencyStaff: 62 },
    { month: 'Oct', careProvider: 68, agencyStaff: 59 }
];

// Custom gradient component
const GradientBar = ({ id, colors, ...props }: any) => {
    const gradientId = `gradient-${id}`;

    return (
        <>
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    {colors.map((color: string, index: number) => (
                        <stop
                            key={index}
                            offset={`${(index / (colors.length - 1)) * 100}%`}
                            stopColor={color}
                        />
                    ))}
                </linearGradient>
            </defs>
            <Bar
                fill={`url(#${gradientId})`}
                {...props}
            />
        </>
    );
};

const BarChart: React.FC<ChartProps> = ({ data = defaultData }) => {
    return (
        <div className="w-full h-full bg-[#F8F8FF] p-6 rounded-lg min-h-[300px]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#383E49] mb-2 sm:mb-0 leading-[30px]">
                    Care Provider & Agency Staff
                </h2>
            </div>

            {/* Chart */}
            <div className="h-full pb-10">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                        data={data}
                        margin={{ top: 20, bottom: 5,left: -25 }}
                        className='outline-none'
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="opacity-100"
                            horizontal={true}
                            vertical={false}
                            stroke='#D0D3D9'
                        />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value, name, props) => {
                                if (name === 'careProvider') {
                                    return [`${value} Care provider`, 'Count'];
                                } else if (name === 'agencyStaff') {
                                    return [`${value} Agency staff`, 'Count'];
                                }
                                return [`${value}`, name];
                            }}
                        />
                        <GradientBar
                            id="careProvider"
                            dataKey="careProvider"
                            name="Care Provider"
                            colors={['#79D0F1', '#74B0FA', '#817AF3']}
                            radius={[40, 40, 0, 0]}
                            className="hover:opacity-80 transition-opacity"
                            barSize={12}
                        />
                        <GradientBar
                            id="agencyStaff"
                            dataKey="agencyStaff"
                            name="Agency Staff"
                            colors={['#57DA65', '#51CC5D', '#46A46C']}
                            radius={[40, 40, 0, 0]}
                            className="hover:opacity-80 transition-opacity"
                            barSize={12}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            iconSize={15}
                            formatter={(value) => (
                                <span className="text-sm text-gray-600">{value}</span>
                            )}
                        />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChart;