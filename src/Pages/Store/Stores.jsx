"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ArrowBigLeft, HeartPlus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSelector, useDispatch } from "react-redux";

import { updateDesign } from "../../Pages/Items/itemDesignSlice";
import { Addcart } from "./Addcart";
import { Addfilter } from "./Addfilter";

// ✅ Correct cartSlice import
import { addToCart } from "../../Pages/Store/CartSlice";

export function Stores() {

    const designs = useSelector((state) =>
        state.itemDesign.data.filter((d) => d.status === "Active")
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleFavorite = (id) => {
        const item = designs.find((d) => d.id === id);
        const currentFav = item?.isFavorite || false;

        dispatch(
            updateDesign({
                id,
                updatedData: { isFavorite: !currentFav }
            })
        );
    };

    const updatePieces = (id, newPieces) => {
        if (newPieces < 1) return;
        dispatch(updateDesign({ id, updatedData: { pieces: newPieces } }));
    };

    const favoriteItems = designs.filter((d) => d.isFavorite);

    return (
        <>
            {/* NAVBAR */}
            <Disclosure
                as="nav"
                className="relative bg-white shadow-sm border-b border-gray-200"
            >
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* LOGO */}
                        <div className="flex items-center">
                            <div className="flex items-center justify-center bg-black text-white font-bold rounded-full h-10 w-10">
                                GS
                            </div>
                            <span className="ml-3 text-2xl font-bold text-black">
                                Gold Store
                            </span>
                        </div>

                        {/* RIGHT SIDE BUTTONS */}
                        <div className="flex items-center space-x-4">

                            {/* ❤️ WISHLIST POPOVER */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="relative rounded-full p-2 text-gray-700 hover:text-red-500 hover:bg-gray-100 transition-all duration-200">
                                        <HeartPlus className="w-6 h-6" />

                                        {/* BADGE */}
                                        {favoriteItems.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-px rounded-full font-bold">
                                                {favoriteItems.length}
                                            </span>
                                        )}
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="end"
                                    className="w-80 p-4 bg-white shadow-xl rounded-xl border"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold">Wishlist</h3>

                                        <button
                                            onClick={() =>
                                                favoriteItems.forEach((item) =>
                                                    toggleFavorite(item.id)
                                                )
                                            }
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    {favoriteItems.length === 0 ? (
                                        <p className="text-gray-500 text-center text-sm">
                                            No favorite items yet.
                                        </p>
                                    ) : (
                                        <div className="max-h-80 overflow-y-auto space-y-4">

                                            {/* FAVORITE ITEMS */}
                                            {favoriteItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-3 border rounded-lg p-2 shadow-sm bg-gray-50"
                                                >
                                                    <img
                                                        src={item.photo}
                                                        alt={item.items}
                                                        className="w-14 h-14 rounded-md object-cover"
                                                    />

                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">{item.design}</p>
                                                        <p className="text-xs text-gray-600">{item.items}</p>
                                                        <p className="text-xs text-gray-500">{item.netweight}g</p>
                                                    </div>

                                                    <button
                                                        onClick={() => toggleFavorite(item.id)}
                                                        className="text-red-500 text-xs hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}

                                            {/* ADD ALL TO CART */}
                                            <Button
                                                onClick={() => {
                                                    favoriteItems.forEach((item) =>
                                                        dispatch(addToCart(item))
                                                    );
                                                }}
                                                className="w-full mt-3 bg-[#0F172A] hover:bg-[#1E293B] text-white"
                                            >
                                                Add All to Cart
                                            </Button>

                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>

                            <Addcart />
                        </div>
                    </div>
                </div>
            </Disclosure>

            {/* MAIN PAGE */}
            <main className="bg-gray-50 min-h-screen py-10 px-6">

                {/* TOP FILTER ROW */}
                <div className="flex justify-between items-center mb-6">
                    <Addfilter />

                    <div className="flex items-center gap-3">
                        <select className="border border-gray-300 rounded-lg px-2 py-0.5 bg-white text-black hover:bg-black hover:text-white font-bold">
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>

                        <Button
                            variant="default"
                            className="flex items-center gap-2 border border-gray-300 bg-white text-black hover:bg-black hover:text-white font-bold"
                            onClick={() => navigate("/dashboard")}
                        >
                            <ArrowBigLeft className="w-5 h-5" />
                            Back
                        </Button>
                    </div>
                </div>

                {/* PRODUCT LIST */}
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">

                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                            {designs.length === 0 && (
                                <p className="text-gray-500 text-center col-span-full">
                                    No designs added yet.
                                </p>
                            )}

                            {designs.map((design) => (
                                <div
                                    key={design.id}
                                    className="group relative border rounded-xl p-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                                >

                                    {/* ❤️ Favorite Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(design.id);
                                        }}
                                        className="absolute top-3 right-3 z-50 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow hover:scale-110 transition"
                                    >
                                        {design.isFavorite ? (
                                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                                        ) : (
                                            <Heart className="w-5 h-5 text-gray-600" />
                                        )}
                                    </button>

                                    {/* IMAGE WITH ZOOM */}
                                    <div className="mt-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <img
                                                    src={design.photo}
                                                    alt={design.items}
                                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover cursor-pointer group-hover:opacity-75"
                                                />
                                            </DialogTrigger>

                                            <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none flex items-center justify-center">
                                                <img
                                                    src={design.photo}
                                                    alt="Zoomed preview"
                                                    className="rounded-lg object-contain max-h-[90vh]"
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    {/* TEXT DETAILS */}
                                    <div className="mt-3">
                                        <h3 className="text-sm font-bold text-black">{design.design}</h3>
                                        <p className="text-sm text-gray-700 mt-0.5">
                                            {design.items} ({design.netweight}g)
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Supplier: {design.suppliers}
                                        </p>
                                        <p className="text-xs text-gray-800 mt-1">
                                            Design No: {design.supplierdn}
                                        </p>

                                        {/* PIECE COUNTER */}
                                        <div className="mt-4 flex items-center justify-between bg-gray-100 rounded-lg p-2">
                                            <button
                                                onClick={() => updatePieces(design.id, design.pieces - 1)}
                                                className="px-3 py-1 bg-white rounded-md shadow hover:bg-gray-200"
                                            >
                                                -
                                            </button>

                                            <span className="font-semibold">
                                                {design.pieces || 1}
                                            </span>

                                            <button
                                                onClick={() => updatePieces(design.id, (design.pieces || 1) + 1)}
                                                className="px-3 py-1 bg-white rounded-md shadow hover:bg-gray-200"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* ADD TO CART BUTTON */}
                                        <Button
                                            onClick={() => dispatch(addToCart(design))}
                                            className="w-full mt-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-1.5 rounded-lg"
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}

export default Stores;
