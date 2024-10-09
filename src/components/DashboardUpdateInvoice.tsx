import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Resident } from "@/lib/types";
import { UpdateInvoice } from "@/lib/createInvoice";
import { formSchema } from "@/lib/types";
import { useEffect } from "react";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


export default function DashboardUpdateInvoice({

  resident,
  setUpdateInvoice,

}: {

  resident: Resident,
  setUpdateInvoice: React.Dispatch<React.SetStateAction<boolean>>,

}) {

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: resident.service_description,
      period_1: "",
      period_2: "",
      period_3: "",
      hours_1: "",
      hours_2: "",
      hours_3: "",
      rate_1: "",
      rate_2: "",
      rate_3: "",
      date: "",
    },
  });

  useEffect(() => {
    form.reset({
      description: resident.service_description,
      period_1: "",
      period_2: "",
      period_3: "",
      hours_1: "",
      hours_2: "",
      hours_3: "",
      rate_1: "",
      rate_2: "",
      rate_3: "",
      date: "",
    });
  }, [resident, form]);


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        // Assuming 'client' is your database instance or ORM (e.g., Sequelize)

        const setInvoiceData = {
            id: resident?.id,
            latest_pdf_url: UpdateInvoice({ resident, values }),
            status: 'Pending',
            due_date: values.date,
            service_description: values.description,
            amount_due: Number(values.hours_1) * Number(values.rate_1) + Number(values.hours_2) * Number(values.rate_2) + Number(values.hours_3) * Number(values.rate_3)

        }


        await client.models.Client.update(setInvoiceData)
        setUpdateInvoice(false)
        toast({
            title: "Successful!",
            description: "Resident invoice has been updated.",
        })

    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        })
    }
};


  return (
          <div className="grid gap-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Description Box */}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full h-40 p-2 border rounded-md"
                          placeholder="Enter description of service provided"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Carousel className="w-[85%] p-4 ml-11 mr-11"> 
                  <CarouselContent>
                    <CarouselItem>
                      <FormField
                        control={form.control}
                        name="period_1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Period:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter the details of the first working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hours_1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hours:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter the hours worked for the first working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rate_1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter the rate for the first working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <FormField
                        control={form.control}
                        name="period_2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Period:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optionally enter the details of the second working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hours_2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hours:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optionally enter the hours worked for the second working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rate_2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optionally enter the rate for the second working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CarouselItem>

                    <CarouselItem>
                      <FormField
                        control={form.control}
                        name="period_3"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Period:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optionally enter the details of the third working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hours_3"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hours:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optionally enter the hours worked for the third working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rate_3"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optionally enter the rate for the third working period"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full max-w-sm">
                      <FormLabel>Due Date</FormLabel>

                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <Button type="submit">Submit</Button>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
  )
}