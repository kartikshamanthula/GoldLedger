import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { FunnelPlus, Check, SquareX } from "lucide-react"
import { cn } from "@/lib/utils"

export function FilterForm() {
    const [group, setGroup] = useState("")
    const [type, setType] = useState("")
    const [gst, setGst] = useState("")
    const [unit, setUnit] = useState("")
    const [status, setStatus] = useState("")
    const [wantStock, setWantStock] = useState("")

    const groups = ["Select Group", "Primary"]
    const types = ["Good", "Service"]
    const gstRates = ["0%", "5%", "12%", "18%", "28%"]
    const unitOptions = ["pcs"]
    const statusOptions = ["Active", "Inactive"]
    const wantStockOptions = ["Yes", "No"]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-300 rounded py-2 px-4 text-black font-semibold transition">
                    <FunnelPlus className="w-5 h-5" />
                    Filter
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Item Filter</DialogTitle>
                </DialogHeader>

                <form className="space-y-5">
                    
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Search by item name" />
                    </div>

                    
                    <div className="grid grid-cols-2 gap-4">
                        
                        <Dropdown
                            label="Group"
                            value={group}
                            setValue={setGroup}
                            options={groups}
                        />

                        
                        <Dropdown
                            label="Type"
                            value={type}
                            setValue={setType}
                            options={types}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        
                        <Dropdown
                            label="GST Rate"
                            value={gst}
                            setValue={setGst}
                            options={gstRates}
                        />

                        
                        <Dropdown
                            label="Unit"
                            value={unit}
                            setValue={setUnit}
                            options={unitOptions}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        
                        <Dropdown
                            label="Status"
                            value={status}
                            setValue={setStatus}
                            options={statusOptions}
                        />

                        
                        <Dropdown
                            label="Want Stock"
                            value={wantStock}
                            setValue={setWantStock}
                            options={wantStockOptions}
                        />
                    </div>

                    
                    <DialogFooter>
                        <DialogClose 
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-300 rounded py-2 px-4 text-black font-semibold transition">
                            <SquareX className="w-4 h-4" />Clear
                        </DialogClose>
                        <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-fuchsia-500 rounded py-2 px-4 text-white font-semibold transition">
                            ✨ Apply
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


function Dropdown({ label, value, setValue, options }) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Popover>
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
                                {options.map((opt) => (
                                    <CommandItem key={opt} onSelect={() => setValue(opt)}>
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === opt ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {opt}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default FilterForm
