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
import { addItem, updateItem } from "../../Pages/Items/itemSlice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";


export default function Form({ open, onOpenChange, data }) {
    const isEditMode = Boolean(data);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [shortname, setShortname] = useState("")
    const [group, setGroup] = useState("");
    const [type, setType] = useState("");
    const [hsn, setHsn] = useState("");
    const [unit, setUnit] = useState("");
    const [quantity, setQuantity] = useState("");
    const [stock, setStock] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});
    const [photo, setPhoto] = useState(null);

    const itemGroups = useSelector((state) => state.itemGroup.data);
    const types = ["Goods", "Service", "Raw Material"];
    const itemUnits = useSelector((state) => state.itemUnit.data);
    const types = ["Goods", "Services"];
    const gstoptions = ["0%", "5%", "12%", "18%", "28%"];
    const stockoptions = ["Yes", "No"];
    const statuses = ["Active", "Inactive"];

    const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!shortname) newErrors.shortname = "Short Name is required";
        if (!group) newErrors.group = "Group is required";
        if (!type) newErrors.type = "Type is required";
        if (!hsn) newErrors.hsn = "HSN/SAC Code is required";
        if (!unit) newErrors.unit = "Unit is required";
        if (type === "Goods" && !stock) newErrors.stock = "Stock is required";
        if (type === "Goods" && !quantity) newErrors.quantity = "Quantity is required";
        if (!status) newErrors.status = "Status is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setShortname(data.shortname || "");
            setGroup(data.group || "");
            setType(data.type || "");
            setHsn(data.hsn || "");
            setUnit(data.unit || "");
            setQuantity(data.quantity || "");
            setStock(data.stock || "");
            setStatus(data.status || "");
            setPhoto(data.photo || null);
        } else {
            setName("");
            setShortname("");
            setGroup("");
            setType("");
            setHsn("");
            setUnit("");
            setQuantity("");
            setStock("");
            setStatus("");
            setPhoto(null);
        }
    }, [data, open]);


    useEffect(() => {
        if (type === "Services") {
            setStock("Yes");
        } else if (type === "Goods") {
            setStock("");
        }
    }, [type]);



    const handleSave = () => {
        if (!validateForm()) return;

        const formData = {
            id: isEditMode ? data.id : Date.now(),
            name,
            shortname,
            group,
            type,
            hsn,
            unit,
            group: typeof group === "object" ? group.name : group,
            type,
            hsn,
            gst,
            unit: typeof unit === "object" ? unit.name : unit,
            quantity,
            stock,
            status,
            photo,
        };

        if (isEditMode) {
            dispatch(updateItem({ id: data.id, updatedData: formData }));
        } else {
            dispatch(addItem(formData));
        }

        onOpenChange(false);
    };

    return (
        <Sheet onOpenChange={onOpenChange} open={open}>
            {!isEditMode && (
                <SheetTrigger asChild>
                    <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-500 py-2 px-4 text-white 
                    font-semibold rounded transition">
                        <Package className="w-5 h-5" />
                        Add Item
                    </Button>
                </SheetTrigger>
            )}
            <SheetContent className="sm:max-w-[350px] overflow-y-auto">
                <SheetHeader className="flex flex-col gap-1">
            <SheetContent className="sm:max-w-[480px] overflow-y-auto">
                <SheetHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            {isEditMode ? (
                                <Pencil className="w-8 h-8 text-blue-700" />
                            ) : (
                                <Package className="w-8 h-8 text-blue-700" />
                            )}
                            <div>
                                <SheetTitle>
                                    {isEditMode ? "Edit Item" : "Create New Item"}
                                </SheetTitle>
                                <SheetDescription>
                                    {isEditMode
                                        ? "Modify the details below to update the item."
                                        : "Fill in the details below to create a new item."}
                                </SheetDescription>
                            </div>
                        </div>
                        <Settings className="w-5 h-5 text-black mt-7 cursor-pointer" />
                    </div>
                </SheetHeader>


                <div className="mt-6 space-y-5 p-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">
                            Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="Enter item name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                    </div>
                <div className="mt-6 space-y-5">
                    <TextField
                        id="name"
                        label="Name"
                        value={name}
                        onChange={setName}
                        error={errors.name}
                    />

                    <div className="grid gap-2">
                        <Label htmlFor="shortname">
                            Short Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="shortname"
                            placeholder="Enter short name"
                            value={shortname}
                            onChange={(e) => setShortname(e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.shortname}</p>
                        )}
                    </div>

                    <Dropdown
                        label="Item Group"
                        value={group}
                        setValue={setGroup}
                        options={itemGroups}
                        error={errors.group}
                    />

                    <Dropdown
                        label="Type"
                        value={type}
                        setValue={setType}
                        options={types}
                        error={errors.type}
                    />

                    {type === "Goods" && (
                        <div className="grid gap-2">
                            <Label htmlFor="photo">Photo</Label>
                            <input
                                id="dropzone-file"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setPhoto(URL.createObjectURL(file));
                                    }
                                }}
                            />
                            
                                {!photo ? (
                                    <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-80 h-80 max-w-lg p-5 mx-auto mt-2 text-center bg-white 
                                border-2 border-gray-300 border-dashed cursor-pointer rounded relative overflow-hidden"
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
                                        <p className="mt-2 text-sm text-gray-500">Click to upload or drag & drop</p>
                                        <p className="text-xs text-gray-400">image/* up to 2MB</p>
                            </label>    
                                ) : (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="relative w-80 h-80 max-w-lg mx-auto cursor-pointer group overflow-hidden border
                                            border-white text-white">
                                                <img
                                                    src={photo}
                                                    alt="Preview"
                                                    className="absolute inset-0 w-full h-full object-cover rounded transition-transform duration-200 
                                                    group-hover:scale-105"
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPhoto(null);
                                                    }}
                                                    className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full bg-black shadow hover:bg-black
                                                    transition"
                                                >
                                                    <X className="h-5 w-5 text-white" />
                                                </Button>
                                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition" />
                                            </div>
                                        </DialogTrigger>
                                                    
                                        <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none flex items-center 
                                        justify-center">
                                            
                                            <img
                                                src={photo}
                                                alt="Full preview"
                                                className="rounded-lg object-contain max-h-[80vh]"
                                            />
                                        </DialogContent>
                                    </Dialog>
                                )}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="hsn">HSN/SAC Code</Label>
                        <Input
                            id="hsn"
                            placeholder="Enter HSN/SAC Code"
                            value={hsn}
                            onChange={(e) => setHsn(e.target.value)}
                        />
                    </div>
                        <>

                            <div className="grid gap-2">
                                <Label htmlFor="photo">Photo</Label>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const base64 = await convertToBase64(file);
                                            setPhoto(base64);
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-80 h-70 max-w-lg p-5 mx-auto mt-2 text-center
                                    bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded relative overflow-hidden"
                                >
                                    {photo ? (
                                        <img
                                            src={photo}
                                            alt="Preview"
                                            className="absolute inset-0 w-full h-full object-cover rounded"
                                        />
                                    ) : (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-8 h-8 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775
                                                    5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0
                                                    0118 19.5H6.75z"
                                                />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Click to upload or drag & drop
                                            </p>
                                            <p className="text-xs text-gray-400">image/* up to 2MB</p>
                                        </>
                                    )}
                                </label>
                            </div>
                        </>
                    )}

                    <TextField
                        id="hsn"
                        label="HSN/SAC Code"
                        value={hsn}
                        onChange={setHsn}
                        error={errors.hsn}
                    />
                    <Dropdown
                        label="Unit"
                        value={unit}
                        setValue={setUnit}
                        options={itemUnits}
                        error={errors.unit}
                        label="GST"
                        value={gst}
                        setValue={setGst}
                        options={gstoptions}
                        error={errors.gst}
                    />

                    {type === "Goods" && (
                        <>
                            <TextField
                                id="quantity"
                                label="Minimum Quantity"
                                value={quantity}
                                onChange={setQuantity}
                                error={errors.quantity}
                            />
                            {type === "Goods" ? (
                                <Dropdown
                                    label="Want Stock"
                                    value={stock}
                                    setValue={setStock}
                                    options={stockoptions}
                                    error={errors.stock}
                                />
                            ) : (
                                <div className="grid gap-2">
                                    <Label>Want Stock</Label>
                                    <Input value="Yes" disabled className="bg-gray-100 text-gray-600" />
                                </div>
                            )}
                        </>
                    )}


                    <Dropdown
                        label="Unit"
                        value={unit}
                        setValue={setUnit}
                        options={itemUnits}
                        error={errors.unit}
                    />
                    <Dropdown
                        label="Status"
                        value={status}
                        setValue={setStatus}
                        options={statuses}
                        error={errors.status}
                    />
                </div>

                <SheetFooter className="flex justify-end gap-3 mt-4">
                    <Button
                        onClick={handleSave}
                        className="bg-blue-700 hover:bg-blue-500 text-white"
                    >
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

/* 🔹 Reusable Components */
function TextField({ id, label, value, onChange, error }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>
                {label} <span className="text-red-500">*</span>
            </Label>
            <Input
                id={id}
                placeholder={`Enter ${label.toLowerCase()}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
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
                                    const displayValue = opt?.name || opt;
                                    const selected = value === displayValue;
                                    return (
                                        <CommandItem
                                            key={index}
                                            onSelect={() => {
                                                setValue(displayValue);
                                                setOpen(false);
                                            }}
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
