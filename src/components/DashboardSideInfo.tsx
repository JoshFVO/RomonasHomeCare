
import { useState } from "react";
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
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DashboardUpdateInvoice from "./DashboardUpdateInvoice";

const client = generateClient<Schema>();


export default function DashboardSideInfo({
    selectedResident,
    setSelectedResident,
    newStatus,
    setNewStatus,
    updateInvoice, 
    setUpdateInvoice
}: {
    selectedResident: Resident | null;
    setSelectedResident: React.Dispatch<React.SetStateAction<Resident | null>>;
    newStatus: boolean;
    setNewStatus: React.Dispatch<React.SetStateAction<boolean>>;
    updateInvoice: boolean
    setUpdateInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const { toast } = useToast()

    const [openAlert, setOpenAlert] = useState(false);

    const updateStatus = async (value: string) => {
        try {
            // Assuming 'client' is your database instance or ORM (e.g., Sequelize)

            const setStatusData = {
                id: selectedResident?.id,
                status: value,
            };


            await client.models.Client.update(setStatusData)
            setNewStatus(!newStatus)
            toast({
                title: "Successful!",
                description: "Resident payment status has been updated.",
            })

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    };


    const handleDeleteConfirmation = () => {
        setOpenAlert(true);
    };

    const handleUpdateInvoice = () => {
        setUpdateInvoice(!updateInvoice)
    }


    const deleteResident = async () => {
        try {
            // Assuming 'client' is your database instance or ORM (e.g., Sequelize)

            const toBeDeleted = {
                id: selectedResident?.id,
            };


            await client.models.Client.delete(toBeDeleted)
            setNewStatus(!newStatus)
            toast({
                title: "Successful!",
                description: "Resident has been deleted.",
            })

            setSelectedResident(null)

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    };

    if (selectedResident != null) {
        if (updateInvoice === false) {
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
                                    <DropdownMenuItem onClick={handleUpdateInvoice}> Update Invoice</DropdownMenuItem>
                                    <DropdownMenuItem>Send Email</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" onClick={handleDeleteConfirmation}>Delete Resident
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the resident's data.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteResident}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
                                    <dt className="text-muted-foreground">Address</dt>
                                    <dd>
                                        <a href="mailto:">{`${selectedResident?.address}`}</a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <Separator className="my-4" />
                        {selectedResident.latest_pdf_url != null && selectedResident.latest_pdf_url != 'N/A' ?
                            <iframe
                                className="w-full h-screen border-0"
                                src={selectedResident?.latest_pdf_url}
                            ></iframe>
                            :
                            <p></p>
                        }

                    </CardContent>
                </Card>
            </div>
        );
    } else {
        return (
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                 <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                {`${selectedResident?.first_name} ${selectedResident?.last_name}`}
                            </CardTitle>
                            <CardDescription>{`Due Date: ${selectedResident?.due_date}`}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                <DashboardUpdateInvoice
                    resident={selectedResident}
                    setUpdateInvoice={setUpdateInvoice}
                    />

                </CardContent>
            </Card>
        )
    }
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