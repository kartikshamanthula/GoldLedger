import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { FunnelPlus, Check, SquareX } from "lucide-react";
import { cn } from "@/lib/utils";
import { setFilters, clearFilters } from "../../Pages/Items/itemSlice";

export function FilterForm() {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [group, setGroup] = useState("");
    const [type, setType] = useState("");
    const [gst, setGst] = useState("");
    const [unit, setUnit] = useState("");
    const [status, setStatus] = useState("");
    const [wantStock, setWantStock] = useState("");
    const [name, setName] = useState("");

    const itemGroups = useSelector((state) => state.itemGroup.data);
    const types = ["Goods", "Service"];
    const gstRates = ["0%", "5%", "12%", "18%", "28%"];
    const itemUnits = useSelector((state) => state.itemUnit.data);
    const statusOptions = ["Active", "Inactive"];
    const wantStockOptions = ["Yes", "No"];


    const handleApply = (e) => {
        e.preventDefault();

        const filterData = {
            name: name?.trim() || "",
            group: typeof group === "object" ? group.name : group,
            type: type || "",
            gst: gst || "",
            unit: typeof unit === "object" ? unit.name : unit,
            status: status || "",
            wantStock: wantStock || "",
        };

        dispatch(setFilters(filterData));
        setOpen(false);
    };



    const handleClear = () => {
        dispatch(clearFilters());
        setGroup("");
        setType("");
        setGst("");
        setUnit("");
        setStatus("");
        setWantStock("");
        setName("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-300 rounded py-2 px-4 text-black font-semibold transition">
                    <FunnelPlus className="w-5 h-5" />
                    Filter
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Item Filter</DialogTitle>
                    <DialogDescription>
                        Select your desired filters and click <strong>Apply</strong> to refine the item list.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-5" onSubmit={handleApply}>

                    {/* Name Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Search by item name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                        <Dropdown label="Group" value={group} setValue={setGroup} options={itemGroups} />
                        <Dropdown label="Type" value={type} setValue={setType} options={types} />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4">
                        <Dropdown label="GST Rate" value={gst} setValue={setGst} options={gstRates} />
                        <Dropdown label="Unit" value={unit} setValue={setUnit} options={itemUnits} />
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-2 gap-4">
                        <Dropdown label="Status" value={status} setValue={setStatus} options={statusOptions} />
                        <Dropdown
                            label="Want Stock"
                            value={wantStock}
                            setValue={setWantStock}
                            options={wantStockOptions}
                        />
                    </div>

                    {/* Buttons */}
                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={handleClear}
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-300 rounded py-2 px-4 text-black font-semibold transition"
                        >
                            <SquareX className="w-4 h-4" /> Clear
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-fuchsia-500 rounded py-2 px-4 text-white font-semibold transition"
                        >
                            ✨ Apply
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    );
}

function Dropdown({ label, value, setValue, options = [] }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        {value || `Select ${label.toLowerCase()}`}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                        <CommandList>
                            <CommandEmpty>No result found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((opt, index) => {
                                    const key = opt.id || `${opt}-${index}`;
                                    const displayValue = opt.name || opt;
                                    const isSelected = value === displayValue;

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
                                                    isSelected ? "opacity-100" : "opacity-0"
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
        </div>
    );
}


export default FilterForm;
