


// // Mock data for testing
// export const mockClients = [
//     {
//       id: "1",
//       first_name: "John",
//       last_name: "Doe",
//       email: "john.doe@example.com",
//       address: "123 Main St, New York, NY",
//       emergency_contact: "Jane Doe - 123-456-7890",
//       due_date: new Date("2024-12-31").toISOString(),
//       date_of_birth: new Date("1990-01-01").toISOString(),
//       status: "active",
//       amount_due: 150.0,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//       latest_pdf_url: "https://example.com/invoices/1234.pdf",
//       service_description: "Monthly home care service",
//     },
//     {
//       id: "2",
//       first_name: "Alice",
//       last_name: "Smith",
//       email: "alice.smith@example.com",
//       address: "456 Oak St, San Francisco, CA",
//       emergency_contact: "Bob Smith - 123-456-7891",
//       due_date: new Date("2024-11-30").toISOString(),
//       date_of_birth: new Date("1985-05-15").toISOString(),
//       status: "inactive",
//       amount_due: 0.0,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//       latest_pdf_url: "https://example.com/invoices/5678.pdf",
//       service_description: "One-time consultation",
//     },
//     // Add more mock data as needed
//   ];

// async function addMockClients() {
//   try {
//     for (const client of mockClients) {
//       await API.graphql({
//         query: /* GraphQL mutation to create client */,
//         variables: {
//           input: client,
//         },
//       });
//       console.log(`Client ${client.first_name} ${client.last_name} added successfully`);
//     }
//   } catch (error) {
//     console.error("Error adding mock clients:", error);
//   }
// }

// addMockClients();