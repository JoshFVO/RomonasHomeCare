import { z } from "zod";

export type Resident = {
    id: string; // Make sure to include 'id' if you use it as a key
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    due_date: string;
    status: string;
    amount_due: number;
    latest_pdf_url: string;
    service_description: string;
    // Include other fields as needed
  };

  export const formSchema = z.object({
    description: z.string().min(1, {
      message: "Please enter the invoice description.",
    }),
    period_1: z.string().min(1, {
      message: "Please enter working period of service.",
    }),
    period_2: z.string().min(0, {
      message: "Please enter working period of service.",
    }),
    period_3: z.string().min(0, {
      message: "Please enter working period of service.",
    }),
    hours_1: z.string().min(1, {
      message: "Please enter valid hours worked for service period",
    }),
    hours_2: z.string().min(0, {
      message: "Please enter valid hours worked for service period",
    }),
    hours_3: z.string().min(0, {
      message: "Please enter valid hours worked for service period",
    }),
    rate_1: z.string().min(1, {
      message: "Please enter valid rate for service period",
    }),
    rate_2: z.string().min(0, {
      message: "Please enter valid rate for service period",
    }),
    rate_3: z.string().min(0, {
      message: "Please enter valid rate for service period",
    }),
    date: z.string().min(1, {
      message: "Please enter due date",
    }),
  });

  export type FormValues = {
    description: string;
    period_1: string;
    period_2: string;
    period_3: string;
    hours_1: string;
    hours_2: string;
    hours_3: string;
    rate_1: string;
    rate_2: string;
    rate_3: string;
    date: string;
}