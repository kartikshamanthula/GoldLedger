import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Funnel } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Addfilter() {
    return (
        <div>
            <div className="flex items-center gap-5">
                <Sheet>
                    <div className="flex items-center gap-3">


                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 border border-gray-300 bg-white
                                        text-black hover:text-white hover:bg-black"
                            >
                                <Funnel className="w-5 h-5" />
                                Show Filters
                            </Button>
                        </SheetTrigger>


                        <div className="flex items-center gap-2 border border-gray-300 bg-white p-2 rounded-md">
                            <input type="checkbox" id="stock" />
                            <label htmlFor="stock" className="cursor-pointer text-black">
                                Show only stock items
                            </label>
                        </div>
                    </div>


                    <SheetContent
                        side="left"
                        className="w-[250px] sm:w-[280px] p-3 
                                bg-white border-r shadow-xl 
                                fixed top-16 left-0 
                                mt-0 h-[calc(100vh-64px)]
                                overflow-hidden 
                                rounded-none"
                    >

                        <div className="flex items-center justify-between">
                            <SheetTitle className="flex items-center gap-2 text-2xl font-semibold">
                                <Funnel className="w-6 h-6" />
                                Filters
                            </SheetTitle>

                            <SheetTrigger asChild>
                                <button className="text-gray-600 hover:text-black text-sm">
                                    Hide
                                </button>
                            </SheetTrigger>
                        </div>


                        <div className="mt-6">
                            <p className="text-sm font-medium text-purple-600 mb-2">Search</p>
                            <input
                                type="text"
                                placeholder="Search designs..."
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>


                        <div className="mt-6">
                            <p className="text-sm font-medium text-purple-600 mb-2">Sort By</p>
                            <select className="w-full border rounded-lg px-3 py-2">
                                <option value="featured" selected>Featured</option>
                                <option value="newestfirst">Newest First</option>
                                <option value="oldestfirst">Oldest First</option>
                                <option value="lowtohigh">Weight: Low to High</option>
                                <option value="hightolow">Weight: High to Low</option>
                            </select>
                        </div>


                        <div className="mt-6">
                            <p className="text-sm font-medium text-purple-600 mb-2">Items</p>
                            <select className="w-full border rounded-lg px-3 py-2">
                                <option>Select item(s)</option>
                            </select>
                        </div>


                        <div className="mt-6">
                            <p className="text-sm font-medium text-purple-600 mb-2">Supplier</p>
                            <select className="w-full border rounded-lg px-3 py-2">
                                <option>Select supplier(s)</option>
                            </select>
                        </div>


                        <div className="mt-6">
                            <p className="text-sm font-medium text-purple-600 mb-2">
                                Weight Range
                            </p>

                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Min"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                                <span>—</span>
                                <input
                                    type="text"
                                    placeholder="Max"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>


                        <div className="flex items-center justify-between mt-8">
                            <Button variant="outline" className="w-[40%]">
                                Clear
                            </Button>

                            <Button className="w-[40%] bg-[#0F172A] text-white">
                                Apply
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default Addfilter