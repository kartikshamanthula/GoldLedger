import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check, Package, Settings, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addDesign, updateDesign } from "../../Pages/Items/itemDesignSlice";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { isRowSelected } from "@tanstack/react-table";

export default function DesignForm({ open, onOpenChange, data }) {
    const isEditMode = Boolean(data);

    const [items, setItems] = useState("");
    const [itemgroup, setItemGroup] = useState(""); 
    const [suppliers, setSuppliers] = useState("");
    const [supplierdn, setSupplierdn] = useState("");
    const [grossweight, setGrossweight] = useState("");
    const [lessweight, setLessweight] = useState("");
    const [netweight, setNetweight] = useState("0.00");
    const [narration, setNarration] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});
    const [photo, setPhoto] = useState(null);
    const [design, setDesign] = useState("");

    const dispatch = useDispatch();
    const itemData = useSelector((state) => state.items?.data || []);
    const allDesigns = useSelector((state) => state.itemDesign?.data || []);
    const statuses = ["Active", "Inactive"];

    const generateDesignNo = (shortname) => {
        const prefix = shortname.toLowerCase();

        const existing = allDesigns.filter((d) => d.design?.startsWith(prefix));

        const netNum = (existing.length + 1).toString().padStart(4, "0");
        return `${prefix}${netNum}`;
    }

    const validateForm = () => {
        const newErrors = {};
        if (!items) newErrors.items = "Item is required";
        if (!suppliers) newErrors.suppliers = "Supplier is required";
        if (!supplierdn) newErrors.supplierdn = "Supplier Design No is required";
        if (!grossweight) newErrors.grossweight = "Gross Weight is required";
        if (!lessweight) newErrors.lessweight = "Less Weight is required";
        if (!narration) newErrors.narration = "Narration is required";
        if (!status) newErrors.status = "Status is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (data) {
            setItems(data.items || "");
            setSuppliers(data.suppliers || "");
            setSupplierdn(data.supplierdn || "");
            setGrossweight(data.grossweight || "");
            setLessweight(data.lessweight || "");
            setNetweight(data.netweight || "0.00");
            setNarration(data.narration || "");
            setStatus(data.status || "");
            setDesign(data.design || "");
            
        } else {
            setItems("");
            setSuppliers("");
            setSupplierdn("");
            setGrossweight("");
            setLessweight("");
            setNetweight("0.00");
            setNarration("");
            setStatus("");
            setDesign("");
        }
    }, [data, open]);

    const handleSave = () => {
        if (!validateForm()) return;

        const formData = {
            id: isEditMode ? data.id : Date.now(),
            items,
            design,
            suppliers,
            supplierdn,
            grossweight,
            lessweight,
            netweight,
            narration,
            status,
        };

        if (isEditMode) {
            dispatch(updateDesign({ id: formData.id, updatedData: formData }));
        } else {
            dispatch(addDesign(formData));
        }

        onOpenChange(false);
    };

    return (
        <Sheet onOpenChange={onOpenChange} open={open}>
            {!isEditMode && (
                <SheetTrigger asChild>
                    <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-500 py-2 px-4 text-white font-semibold rounded transition">
                        <Package className="w-5 h-5" />
                        Add Item Design
                    </Button>
                </SheetTrigger>
            )}
            <SheetContent className="sm:max-w-[350px] overflow-y-auto">
                <SheetHeader className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            {isEditMode ? (
                                <Pencil className="w-8 h-8 text-blue-700" />
                            ) : (
                                <Package className="w-8 h-8 text-blue-700" />
                            )}
                            <div>
                                <SheetTitle>
                                    {isEditMode ? "Edit Design" : "Create New Design"}
                                </SheetTitle>
                                <SheetDescription>
                                    {isEditMode
                                        ? "Modify the details below to update the Design."
                                        : "Fill in the details below to create a new Design."}
                                </SheetDescription>
                            </div>
                        </div>
                        <Settings className="w-5 h-5 text-black mt-7 cursor-pointer" />
                    </div>
                </SheetHeader>

                <div className="mt-6 space-y-5 p-2">
                    <Dropdown
                        label="Item"
                        value={items}
                        setValue={(selected) => {
                            setItems(selected);
                            const selectedItem = itemData.find(
                                (i) => i.name === selected
                            );
                            setItemGroup(selectedItem?.group || "");

                            const shortname = selectedItem?.shortname || selected?.name?.slice(0, 5).toLowerCase();
                            const designcode = generateDesignNo(shortname);
                            setDesign(designcode);

                        }}
                        options={itemData}
                        error={errors.items}
                    />

                    <div className="grid gap-2">
                        <Label htmlFor="suppliers">
                            Supplier <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="suppliers"
                            placeholder="Enter Supplier Name"
                            value={suppliers}
                            onChange={(e) => setSuppliers(e.target.value)}
                        />
                        {errors.suppliers && (
                            <p className="text-red-500 text-sm">{errors.suppliers}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="supplierdn">
                            Supplier Design Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="supplierdn"
                            placeholder="Enter Supplier Design Number"
                            value={supplierdn}
                            onChange={(e) => setSupplierdn(e.target.value)}
                        />
                        {errors.supplierdn && (
                            <p className="text-red-500 text-sm">{errors.supplierdn}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="grossweight">
                            Gross Weight <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="grossweight"
                            type="number"
                            step="0.01"
                            placeholder="Enter Gross Weight"
                            value={grossweight}
                            onChange={(e) => {
                                const value = e.target.value;
                                setGrossweight(value);
                                const gw = parseFloat(value) || 0;
                                const lw = parseFloat(lessweight) || 0;
                                setNetweight((gw - lw).toFixed(2));
                            }}
                        />
                        {errors.grossweight && (
                            <p className="text-red-500 text-sm">{errors.grossweight}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="lessweight">
                            Less Weight <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="lessweight"
                            type="number"
                            step="0.01"
                            placeholder="Enter Less Weight"
                            value={lessweight}
                            onChange={(e) => {
                                const value = e.target.value;
                                setLessweight(value);
                                const gw = parseFloat(grossweight) || 0;
                                const lw = parseFloat(value) || 0;
                                setNetweight((gw - lw).toFixed(2));
                            }}
                        />
                        {errors.lessweight && (
                            <p className="text-red-500 text-sm">{errors.lessweight}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="netweight">
                            Net Weight <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="netweight"
                            type="number"
                            step="0.01"
                            placeholder="Auto Calculated"
                            value={netweight}
                            readOnly
                            className="bg-gray-100 cursor-not-allowed"
                        />
                        {errors.netweight && (
                            <p className="text-red-500 text-sm">{errors.netweight}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="narration">
                            Narration <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="narration"
                            placeholder="Enter Narration"
                            value={narration}
                            onChange={(e) => setNarration(e.target.value)}
                            className="h-15"
                        />
                        {errors.narration && (
                            <p className="text-red-500 text-sm">{errors.narration}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="photo">Photo</Label>
                        <input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) setPhoto(URL.createObjectURL(file));
                            }}
                        />
                        {!photo ? (
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-80 h-80 max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded relative overflow-hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="square"
                                        strokeLinejoin="square"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 
                        5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 
                        0118 19.5H6.75z"
                                    />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">
                                    Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-gray-400">image/* up to 2MB</p>
                            </label>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="relative w-80 h-80 max-w-lg mx-auto cursor-pointer group overflow-hidden border border-white text-white">
                                        <img
                                            src={photo}
                                            alt="Preview"
                                            className="absolute inset-0 w-full h-full object-cover rounded transition-transform duration-200 group-hover:scale-105"
                                        />
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPhoto(null);
                                            }}
                                            className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full bg-black shadow hover:bg-black transition"
                                        >
                                            <X className="h-5 w-5 text-white" />
                                        </Button>
                                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition" />
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none flex items-center justify-center">
                                    <VisuallyHidden>
                                        <DialogTitle>Image preview</DialogTitle>
                                    </VisuallyHidden>
                                    <img
                                        src={photo}
                                        alt="Full preview"
                                        className="rounded-lg object-contain max-h-[80vh]"
                                    />
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                    <Dropdown
                        label="Status"
                        value={status}
                        setValue={setStatus}
                        options={statuses}
                        error={errors.status}
                    />
                </div>

                <SheetFooter className="flex justify-end gap-3 mt-4">
                    <Button onClick={handleSave} className="bg-blue-700 hover:bg-blue-500 text-white">
                        {isEditMode ? "💾 Update" : "✅ Save"}
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">❎ Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

function Dropdown({ label, value, setValue, options = [], error }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="grid gap-2">
            <Label>
                {label} <span className="text-red-500">*</span>
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        {value || `Select ${label}`}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                        <CommandList>
                            <CommandEmpty>No result found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((opt, index) => {
                                    const key = opt?.id || `${opt}-${index}`;
                                    const displayValue = opt?.name || opt;
                                    const selected = value === displayValue;

                                    return (
                                        <CommandItem
                                            key={key}
                                            onSelect={() => {
                                                setValue(displayValue);
                                                setOpen(false);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selected ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {displayValue}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
