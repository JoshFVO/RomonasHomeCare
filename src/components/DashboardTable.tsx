import * as React from "react";
import { useState} from "react";
import {
  ListFilter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import { Schema } from "amplify/data/resource";
import { Resident } from "@/lib/types";


export default function DashboardTable({
    residents,
    setSelectedResident,
    setAddResident,
    setUpdateInvoice
  }: {
    residents: Schema["Client"]["type"][];
    setSelectedResident: React.Dispatch<React.SetStateAction<Resident | null>>;
    setAddResident: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdateInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  }) {


  const [selectedStatuses, setSelectedStatuses] = useState(["Paid", "Pending", "Overdue"]);

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prevSelectedStatuses) =>
      prevSelectedStatuses.includes(status)
        ? prevSelectedStatuses.filter((s) => s !== status)
        : [...prevSelectedStatuses, status]
    );
  };

  // Filter residents based on selected statuses
  const filteredResidents = residents.filter((resident) =>
    selectedStatuses.includes(resident.status as string)
  );


  return (
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["Paid", "Pending", "Overdue"].map((status) => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={() => handleStatusChange(status)}
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                    <Button
                    onClick={() => setAddResident(true)}
                    variant="outline"
                    size="sm"
                    >
                    Add Resident
                    </Button>
                </div>
              </div>

              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Residents</CardTitle>
                    <CardDescription>Residents payment status.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Resident</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResidents.map((resident) => {


                          const statusClass =
                            resident.status === "Paid"
                              ? "bg-green-100"
                              : resident.status === "Pending"
                                ? "bg-yellow-100"
                                : resident.status === "Overdue"
                                  ? "bg-red-100"
                                  : "";

                          return (
                            <TableRow
                              key={resident.id}
                              onClick={() => {
                                if (resident.id) {
                                  setSelectedResident(resident as Resident); 
                                  setAddResident(false) // Use type assertion if fields meet the Resident type
                                  setUpdateInvoice(false)
                                } else {
                                  console.error("Resident object is missing required fields.");
                                }
                              }}
                              className="cursor-pointer"
                            >
                              <TableCell>
                                <div className="font-medium">{`${resident.first_name} ${resident.last_name}`}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {resident.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge
                                  className={`text-xs ${statusClass}`}
                                  variant="secondary"
                                >
                                  {resident.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {resident.due_date}
                              </TableCell>
                              <TableCell className="text-right">{`$${resident.amount_due}`}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
  );
}