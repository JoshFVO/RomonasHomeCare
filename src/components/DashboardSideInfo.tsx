
import {
    MoreVertical,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Resident } from "@/lib/types";


export default function DashboardSideInfo({
    selectedResident,
}: {
    selectedResident: Resident | null;
}) {


    const updateStatus = async (newStatus: string) => {
        try {

            console.log('Status updated:', newStatus);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (selectedResident != null) {
        return (
            <div>
                <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                {`${selectedResident?.first_name} ${selectedResident?.last_name}`}
                            </CardTitle>
                            <CardDescription>{`Due Date: ${selectedResident?.due_date}`}</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                        <Select onValueChange={(value) => updateStatus(value)}>
                                            <SelectTrigger
                                                className={`h-8 ${selectedResident?.status === "Paid"
                                                    ? "bg-green-100"
                                                    : selectedResident?.status === "Pending"
                                                        ? "bg-yellow-100"
                                                        : selectedResident?.status === "Overdue"
                                                            ? "bg-red-100"
                                                            : ""
                                                    }`}
                                            >
                                                <SelectValue placeholder={selectedResident?.status} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="bg-green-100" value="Paid">
                                                    Paid
                                                </SelectItem>
                                                <SelectItem className="bg-yellow-100" value="Pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem className="bg-red-100" value="Overdue">
                                                    Overdue
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Export</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Trash</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="font-semibold">Resident Information</div>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Email</dt>
                                    <dd>
                                        <a href="mailto:">{`${selectedResident?.email}`}</a>
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Address</dt>
                                    <dd>
                                        <a href="mailto:">{`${selectedResident?.address}`}</a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <Separator className="my-4" />
                        {selectedResident.latest_pdf_url != null ?
                            <iframe
                            className="w-full h-screen border-0"
                            src={selectedResident?.latest_pdf_url}
                        ></iframe> 
                        :
                        <p></p>
                        }
            
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Updated{" "}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        );
    } else {
        return (
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                 <CardHeader className="flex flex-row items-left bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Please select a resident
                            </CardTitle>
                        </div>
    
                    </CardHeader>
            </Card>
        )
    }
}