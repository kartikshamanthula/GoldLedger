"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";


const SkeletonRow = ({ columns }) => (
    <TableRow>
        {columns.map((_, i) => (
            <TableCell key={i}>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            </TableCell>
        ))}
    </TableRow>
);

const data = [
    {
        id: 1,
        group: "Electronics",
        name: "Smartphone",
        type: "Product",
        hsn: "8517",
        gst: "18%",
        unit: "Piece",
        stock: "Yes",
        status: "Active",
    },
    {
        id: 2,
        group: "Services",
        name: "Software Maintenance",
        type: "Service",
        hsn: "9983",
        gst: "18%",
        unit: "Hour",
        stock: "No",
        status: "Active",
    },
    {
        id: 3,
        group: "Stationery",
        name: "Printer Ink",
        type: "Product",
        hsn: "3215",
        gst: "12%",
        unit: "Bottle",
        stock: "Yes",
        status: "Inactive",
    },
];

export const columns = [
    {
        accessorKey: "group",
        header: "Group",
        cell: ({ row }) => <span>{row.getValue("group")}</span>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span>{row.getValue("type")}</span>,
    },
    {
        accessorKey: "hsn",
        header: "HSN/SAC Code",
        cell: ({ row }) => <span>{row.getValue("hsn")}</span>,
    },
    {
        accessorKey: "gst",
        header: "GST",
        cell: ({ row }) => <span>{row.getValue("gst")}</span>,
    },
    {
        accessorKey: "unit",
        header: "Unit",
        cell: ({ row }) => <span>{row.getValue("unit")}</span>,
    },
    {
        accessorKey: "stock",
        header: "Want Stock",
        cell: ({ row }) => (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${row.getValue("stock") === "Yes"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
            >
                {row.getValue("stock")}
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            const color =
                status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700";
            return (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
                    {status}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 focus:ring-2 focus:ring-blue-200"
                    >
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-36 shadow-md border border-gray-100">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => console.log("Edit:", row.original)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 text-blue-600"
                    >
                        <Pencil className="w-4 h-4 text-blue-600" />
                        <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => console.log("Delete:", row.original)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-red-50 text-red-600"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export function DemoTable() {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // ⏳ Simulate data loading delay
        return () => clearTimeout(timer);
    }, []);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, columnVisibility, rowSelection },
    });

    return (
        <>
            <div className="overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm mt-6">
                <Table>
                    <TableHeader className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-gray-700 font-semibold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            Array.from({ length: 15 }).map((_, i) => (
                                <SkeletonRow key={i} columns={columns} />
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4">
                <div className="text-sm text-gray-600">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} selected
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-white hover:bg-blue-50"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="bg-white hover:bg-blue-50"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

export default DemoTable;
