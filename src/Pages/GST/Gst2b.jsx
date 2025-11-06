import React from 'react'
import { TriangleAlert } from "lucide-react"

function Gst2b() {
    return (
        <div className="flex justify-center items-center">
                <TriangleAlert className="text-amber-300 h-20 w-20" />
                <p className="text-amber-300 text-2xl font-semibold">GST-2B reports are available only for businesses registered as Regular under GST.</p>
        </div>
    )
}

export default Gst2b