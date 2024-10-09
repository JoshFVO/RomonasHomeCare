
import { Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Schema } from "amplify/data/resource";


export default function DashboardCharts({ residents }: { residents: Schema["Client"]["type"][] }) {



    const paidResidents = residents.filter(
        (resident) => resident.status === "Paid"
    );

    const totalPaidAmount = paidResidents.reduce((acc, resident) => {
        // Convert amount_due to string if it's null
        const amount = parseFloat(`${resident.amount_due ?? 0}`);
        return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    const totalAmountDue = residents.reduce((total, resident) => {
        // Convert amount_due to string if it's null
        return total + parseFloat(`${resident.amount_due ?? 0}`);
    }, 0);


    const chartData = [
        { browser: "Unpaid", visitors: totalAmountDue - totalPaidAmount, fill: "var(--color-safari)" },
        { browser: "Paid", visitors: totalPaidAmount, fill: "var(--color-firefox)" },
    ]

    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        safari: {
            label: "Unpaid",
            color: "hsl(var(--chart-1))",
        },
        firefox: {
            label: "Paid",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    const countPendingOrOverdue = (residents: Schema["Client"]["type"][]): number => {
        return residents.filter(
            (resident) => resident.status === "Pending" || resident.status === "Overdue"
        ).length;
    };

    const pendingOrOverdueCount = countPendingOrOverdue(residents);






    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2 mt-8">
                    <CardDescription>Already Paid</CardDescription>
                    <CardTitle className="text-3xl">{`$${totalPaidAmount}`}</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2 mt-8">
                    <CardDescription>Total Due</CardDescription>
                    <CardTitle className="text-3xl">{`$${totalAmountDue}`}</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="pb-2 mt-8">
                    <CardDescription>Residents Unpaid</CardDescription>
                    <CardTitle className="text-2xl">{`${pendingOrOverdueCount} Residents`}</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card className="dashboard-05-chunk-4">
                <CardContent className="mt-4">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="visitors"
                                nameKey="browser"
                                innerRadius={30}
                                strokeWidth={1}
                            >
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
} 
