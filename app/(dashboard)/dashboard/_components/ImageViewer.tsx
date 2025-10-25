'use client'

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

type propType={ 
    data: string[];
    onClose: ()=> void;
}


export default function ImageViewer({ data,onClose }: propType) {
    const [currentItem, setCurrentItem] = useState(0);
    const handleImageChange = (action: boolean) => {
        if (action) {
            setCurrentItem(prev => prev + 1);
        } else {
            setCurrentItem(prev => prev - 1);
        }
    }
    return (
        <div className="h-screen top-0 right-0 bg-[#0000002c] backdrop-blur-sm absolute flex items-center justify-center" style={{ width: 'calc(100vw - var(--imageMaxWidth)' }} onClick={onClose}>
            <div className=" bg-white flex flex-col rounded-lg aspect-square w-full p-4 space-y-6" style={{ maxHeight: 'calc(100vh - var(--imageHeight))', maxWidth: 'calc(100vw - var(--imageWidth))' }} onClick={(e)=>e.stopPropagation()}>
                <div className="flex justify-end" onClick={onClose}>
                    <button type="button" className="leading-0 px-2 py-3 rounded-full text-white cursor-pointer bg-red-500">x</button>
                </div>
                <div className="relative flex-1 rounded-lg w-full h-full">
                    <div className="w-full h-full flex items-center justify-center">

                        <Image src={data[currentItem]} alt={data[currentItem]} fill className="rounded-lg max-w-full object-contain" />

                    </div>
                    <button
                        type="button"
                        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 text-2xl bg-gray-100 rounded-lg ${0 === currentItem ? "opacity-55 cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => handleImageChange(false)}
                        disabled={currentItem === 0}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        type="button"
                        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 text-2xl bg-gray-100 rounded-lg ${data?.length - 1 === currentItem ? "opacity-55 cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => handleImageChange(true)}
                        disabled={currentItem === data?.length - 1}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}