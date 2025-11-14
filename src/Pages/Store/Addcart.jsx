"use client";

import React from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
    clearCart,
    increaseQty,
    decreaseQty,
    removeFromCart
} from "../../Pages/Store/CartSlice";

export function Addcart() {

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const totalPieces = cartItems.reduce((sum, i) => sum + i.pieces, 0);
    const uniqueDesigns = cartItems.length;
    const totalNetWeight = cartItems.reduce(
        (sum, i) => sum + Number(i.netweight) * i.pieces,
        0
    );

    return (
        <div>
            <Sheet>
                
                <SheetTrigger
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-md p-2 flex items-center gap-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                </SheetTrigger>

                
                <SheetContent
                    className="
                        w-full
                        sm:w-[700px]
                        bg-white
                        shadow-xl
                        border-none
                        h-screen
                        flex flex-col
                        overflow-hidden
                    "
                    side="right"
                >
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">

                        
                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                            <p className="font-medium">
                                Total Pieces:
                                <span className="font-normal ml-1">{totalPieces}</span>
                            </p>

                            <p className="font-medium">
                                Unique Designs:
                                <span className="font-normal ml-1">{uniqueDesigns}</span>
                            </p>

                            <p className="mt-4 text-lg font-semibold">
                                Total Net Weight:
                                <span className="text-[#0F172A] ml-2">
                                    {totalNetWeight.toFixed(2)} g
                                </span>
                            </p>
                        </div>


                        
                        <div className="border rounded-lg p-4">
                            <p className="text-lg font-semibold mb-4">Order Details</p>

                            <div className="space-y-3">

                                <div>
                                    <label className="text-sm font-medium">Date</label>
                                    <input
                                        type="date"
                                        className="w-full border rounded-lg px-3 py-2 mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">From Ledger</label>
                                    <select className="w-full border rounded-lg px-3 py-2 mt-1">
                                        <option>Select from ledger</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Touch ID</label>
                                        <select className="w-full border rounded-lg px-3 py-2 mt-1">
                                            <option>Select touch ID</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Order Type</label>
                                        <select className="w-full border rounded-lg px-3 py-2 mt-1">
                                            <option>Select order type</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Delivery Date</label>
                                    <input
                                        type="date"
                                        className="w-full border rounded-lg px-3 py-2 mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Narration (Optional)</label>
                                    <textarea
                                        className="w-full border rounded-lg px-3 py-2 mt-1"
                                        placeholder="Add any special instructions..."
                                    ></textarea>
                                </div>

                            </div>
                        </div>


                        
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-semibold">Items in Cart</h2>

                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Clear All
                                </button>
                            </div>

                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-center py-10">
                                    Cart is empty.
                                </p>
                            ) : (
                                cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 border rounded-xl p-4 shadow-sm mb-3"
                                    >
                                        
                                        <img
                                            src={item.photo}
                                            alt={item.items}
                                            className="w-20 h-20 rounded-md object-cover"
                                        />

                                        
                                        <div className="flex-1">
                                            <p className="font-semibold text-lg">{item.design}</p>
                                            <p className="text-sm text-gray-500">{item.items}</p>

                                            <div className="flex items-center gap-2 mt-1 text-sm">
                                                <p className="font-medium">{item.netweight}g each</p>
                                                <span className="text-gray-400">•</span>
                                                <p className="font-medium">
                                                    {(item.netweight * item.pieces).toFixed(2)}g total
                                                </p>
                                            </div>

                                            
                                            <div className="flex items-center gap-3 mt-2 bg-gray-100 p-2 rounded-lg w-fit">
                                                <button
                                                    onClick={() => dispatch(decreaseQty(item.id))}
                                                    className="p-1 bg-white rounded-md shadow hover:bg-gray-200"
                                                >
                                                    <Minus size={14} />
                                                </button>

                                                <span className="font-semibold">{item.pieces}</span>

                                                <button
                                                    onClick={() => dispatch(increaseQty(item.id))}
                                                    className="p-1 bg-white rounded-md shadow hover:bg-gray-200"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>

                    
                    <div className="p-6 border-t flex justify-between gap-4">
                        <Button variant="outline" className="flex-1">
                            Continue Shopping
                        </Button>
                        <Button className="flex-1 bg-[#0F172A] text-white">
                            Save & Exit
                        </Button>
                    </div>
                </SheetContent>

            </Sheet>
        </div>
    );
}

export default Addcart;
