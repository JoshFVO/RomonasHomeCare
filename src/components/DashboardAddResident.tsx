import {
    Card,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


const formSchema = z.object({
    firstName: z.string().min(1, {
        message: "Please enter the resident's first name.",
    }),
    lastName: z.string().min(1, {
        message: "Please enter the resident's last name.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    address: z.string().min(1, {
        message: "Please enter the resident's address.",
    }),
})


export default function DashboardAddResident({
    setAddResident,
}: {
    setAddResident: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
      const newResident = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        address: values.address,
        status: 'Pending',
        amount_due: 0,
        latest_pdf_url: 'N/A',
        service_description: 'N/A',
      };

      await client.models.Client.create({
        ...newResident,
      });

      } catch (err) {
        console.error(err);
      } finally {
        setAddResident(false);
      }
    }

    return (
        <div>
            <Card className="overflow-hidden p-4" x-chunk="dashboard-05-chunk-4">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter first name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </Card>
        </div>
    )
}