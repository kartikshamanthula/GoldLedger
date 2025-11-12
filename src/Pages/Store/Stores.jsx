"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ShoppingCart, ArrowBigLeft, HeartPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function Stores() {
    const navigate = useNavigate();

    return (
        <>

            <Disclosure
                as="nav"
                className="relative bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200"
            >
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        <div className="flex items-center">
                            <div className="flex items-center justify-center bg-black text-white font-bold rounded-full h-10 w-10">
                                GS
                            </div>
                            <span className="ml-3 text-2xl font-bold text-black">
                                Gold Store
                            </span>
                        </div>


                        <div className="flex items-center space-x-4">
                            <button
                                type="button"
                                className="rounded-full p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                            >
                                <HeartPlus className="w-6 h-6" />
                            </button>

                            <Button
                                variant="default"
                                className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium rounded-md flex items-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" /> Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </Disclosure>


            <main className="bg-gray-50 min-h-screen py-10 px-6">
                <div className="flex justify-end mb-6">
                    <Button
                        variant="default"
                        className="flex items-center gap-2 border border-gray-300 bg-white
                        text-black hover:text-white hover:bg-black font-bold"
                        onClick={() => navigate("/dashboard")}
                    >
                        <ArrowBigLeft className="w-5 h-5" />
                        Back
                    </Button>
                </div>

                <div className="text-center text-gray-500 font-medium">
                        
                </div>
            </main>
        </>
    );
}

export default Stores;
