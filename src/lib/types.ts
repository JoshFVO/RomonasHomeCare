export type Resident = {
    id: string; // Make sure to include 'id' if you use it as a key
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    address: string | null;
    due_date: Date | null;
    status: string | null;
    amount_due: number | null;
    latest_pdf_url: string | null;
    service_description: string | null;
    // Include other fields as needed
  };