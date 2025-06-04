import { Badge } from "@/components/ui/badge";




export default function StatusBadge ( { status } : { status : string } ) {
    let display
    switch(status)
    {
        case "Reorder req'd":
            display = "bg-red-500 text-white font-bold shadow-lg"
        break;

        case "Sufficient":
            display = "bg-blue-500 text-white font-bold shadow-lg"
        break;

        case "Reorder":
            display = "bg-orange-500 text-white font-bold shadow-lg"
        break;
    }



    return <Badge className={display} >{status}</Badge>

} 