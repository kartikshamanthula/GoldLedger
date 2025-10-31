import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { Deleteuser } from "../store/userReducer";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function Tableuser() {
    const userData = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const recordsPerPage = 2;

    const filteredUsers = (userData || []).filter((user) =>
        (user?.name || "").toLowerCase().includes(filterText.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) =>
        sortOrder === "asc" ? a.id - b.id : b.id - a.id
    );

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = sortedUsers.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(sortedUsers.length / recordsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(Deleteuser({ id }));
        }
    };

    const handleSort = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    return (
        <div className="p-6">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
                Product List
            </h2>

            {/* Search + Add Product */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filterText}
                    onChange={(e) => {
                        setFilterText(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <Link
                    to="/create"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200"
                >
                    Add Product
                </Link>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                <Table>
                    <TableCaption className="text-gray-500 text-sm">
                        A list of your products
                    </TableCaption>

                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead
                                className="cursor-pointer select-none text-gray-700 font-semibold"
                                onClick={handleSort}
                            >
                                ID{" "}
                                <span className="text-gray-400 text-sm">
                                    {sortOrder === "asc" ? "▲" : "▼"}
                                </span>
                            </TableHead>
                            <TableHead className="text-gray-700 font-semibold">Name</TableHead>
                            <TableHead className="text-gray-700 font-semibold">
                                Description
                            </TableHead>
                            <TableHead className="text-gray-700 font-semibold">Image</TableHead>
                            <TableHead className="text-gray-700 font-semibold text-center">
                                Product Info
                            </TableHead>
                            <TableHead className="text-gray-700 font-semibold text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentRecords.length > 0 ? (
                            currentRecords.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.description}</TableCell>
                                    <TableCell>
                                        <img
                                            src={user.image || "/placeholder.png"}
                                            alt={user.name}
                                            className="w-20 h-24 object-cover rounded-md border border-gray-200"
                                        />
                                    </TableCell>

                                    {/* Product combinations */}
                                    <TableCell>
                                        {user.combinations && user.combinations.length > 0 ? (
                                            <Table className="text-sm">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Color</TableHead>
                                                        <TableHead>Size</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead>Qty</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {user.combinations.map((combo, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{combo.color}</TableCell>
                                                            <TableCell>{combo.size}</TableCell>
                                                            <TableCell>{combo.price} ₹</TableCell>
                                                            <TableCell>{combo.stock}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        ) : (
                                            <span className="text-gray-400 italic text-sm">
                                                No combinations
                                            </span>
                                        )}
                                    </TableCell>

                                    {/* Action buttons */}
                                    <TableCell className="text-center">
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            <Link
                                                to={`/edit/${user.id}`}
                                                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                                            >
                                                <FiEdit /> Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                                            >
                                                <MdDelete /> Delete
                                            </button>

                                            <Link
                                                to={`/viewuser/${user.id}`}
                                                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                                            >
                                                <FaEye /> View
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {sortedUsers.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
                    <p className="text-sm text-gray-600 mb-3 sm:mb-0">
                        Showing{" "}
                        <span className="font-medium">{firstIndex + 1}</span>–
                        <span className="font-medium">
                            {Math.min(lastIndex, sortedUsers.length)}
                        </span>{" "}
                        of <span className="font-medium">{sortedUsers.length}</span> results
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-md border border-gray-300 ${currentPage === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => goToPage(i + 1)}
                                className={`px-3 py-2 rounded-md border text-sm font-semibold ${currentPage === i + 1
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "text-gray-700 hover:bg-gray-100 border-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-md border border-gray-300 ${currentPage === totalPages
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tableuser;
