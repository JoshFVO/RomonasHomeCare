import { Resident } from "./types";
import { z } from "zod";
import { formSchema } from "./types";
import { jsPDF } from "jspdf";

export const UpdateInvoice = ({
    resident,
    values,
}: {
    resident: Resident;
    values: z.infer<typeof formSchema>;
}) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 10; // Default left margin in jsPDF
    const rightMargin = 10; // Default right margin in jsPDF
    const true_width = pageWidth - leftMargin - rightMargin;

    doc.setProperties({
        title: "Monthly Invoice",
        author: "Romona's Home Care",
    });

    doc.setFont("Times", "bold");
    doc.setFontSize(18);

    // Set text color to RGB (62, 104, 150)
    doc.setTextColor(62, 104, 150);

    // Add "Romona's Home Care" text at position (x: 10, y: 10) with left alignment
    doc.text("Romona's Home Care", 10, 20, { align: "left" });

    // Set font to "Times", bold, and size 24
    doc.setFont("Times", "bold");
    doc.setFontSize(24);

    // Add "INVOICE" text at the right of the page with position (x: 200, y: 20) and right alignment
    doc.text("INVOICE", 200, 20, { align: "right" });

    // Add billing address details
    doc.setFont("Times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Add address details with left alignment
    doc.text("1131 Parkwood Blvd", 10, 25, { align: "left" });
    doc.text("Schenectady, NY 12308", 10, 30, { align: "left" });
    doc.text("(718) 749-6412", 10, 35, { align: "left" });

    // Add an empty line to create some space
    doc.text("", 10, 55);

    // Set text color to white and fill color to RGB (62, 104, 150) for the "BILL TO" cell
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    // Draw filled rectangle for the "BILL TO" cell background
    doc.rect(10, 60, true_width / 3, 5, "F"); // 'F' stands for fill

    // Add "BILL TO" text with left alignment
    doc.text("BILL TO", 10 + 2, 64); // Adjust x and y positions for padding inside the rectangle

    // Set text color to white (for the empty cell)
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(255, 255, 255);

    // Draw empty cell (rectangle)
    doc.rect(10 + true_width / 3, 60, true_width / 3, 5, "F");

    // Set text color to white and fill color to RGB (62, 104, 150) for the "INVOICE #" cell
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    // Draw filled rectangle for the "INVOICE #" cell background
    doc.rect(10 + 2 * (true_width / 3), 60, true_width / 6, 5, "F");

    // Add "INVOICE #" text with center alignment
    doc.text("INVOICE #", 10 + 2 * (true_width / 3) + true_width / 6 / 2, 64, {
        align: "center",
    });

    // Set text color and fill for "DATE" cell
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    // Draw filled rectangle for the "DATE" cell background
    doc.rect(
        10 + 2 * (true_width / 3) + true_width / 6,
        60,
        true_width / 6,
        5,
        "F"
    );

    // Add "DATE" text with center alignment
    doc.text(
        "DATE",
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2,
        64,
        { align: "center" }
    );

    // Set text color to black and fill color to white for the first row
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);

    // Add client name cell with left alignment
    doc.text(`${resident.first_name} ${resident.last_name}`, 10, 70); // Adjust y-coordinate as needed

    // Draw an empty cell to create space
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + true_width / 3, 66, true_width / 3, 5, "F");

    // Add invoice number cell with center alignment
    doc.text("1", 10 + 2 * (true_width / 3) + true_width / 6 / 2, 70, {
        align: "center",
    });

    // Add due date cell with center alignment and line break
    doc.text(
        values.date,
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2,
        70,
        { align: "center" }
    );

    // Move to the next line for the next row (adjust y-coordinate accordingly)

    // Add street address cell with left alignment
    doc.text(resident.address, 10, 75);

    // Draw an empty cell to create space
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + true_width / 3, 71, true_width / 3, 5, "F");

    // Set text color to white and fill color to RGB (62, 104, 150) for the next two cells
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    // Add "CUSTOMER ID" cell with center alignment
    doc.setFillColor(62, 104, 150);
    doc.rect(10 + 2 * (true_width / 3), 71, true_width / 6, 5, "F");
    doc.text("CUSTOMER ID", 10 + 2 * (true_width / 3) + true_width / 6 / 2, 75, {
        align: "center",
    });

    // Add "TERMS" cell with center alignment and line break
    doc.setFillColor(62, 104, 150);
    doc.rect(
        10 + 2 * (true_width / 3) + true_width / 6,
        71,
        true_width / 6,
        5,
        "F"
    );
    doc.text(
        "TERMS",
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2,
        75,
        { align: "center" }
    );

    // Move to the next line for the next row (adjust y-coordinate accordingly)

    // Reset text color to black and fill color to white for the next row
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);

    // Add city address cell with left alignment
    doc.text("XXXXXX", 10, 80);

    // Draw an empty cell to create space
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + true_width / 3, 76, true_width / 3, 5, "F");

    // Add customer ID cell with center alignment
    doc.text(
        `${resident.id.split('-')[0]}`,
        10 + 2 * (true_width / 3) + true_width / 6 / 2,
        80,
        { align: "center" }
    );

    // Add "Due Upon Receipt" cell with center alignment and line break
    doc.text(
        "Due Upon Receipt",
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2,
        80,
        { align: "center" }
    );

    // Move to the next lines to add blank spaces
    doc.text("", 10, 85);
    doc.text("", 10, 90);
    doc.text("", 10, 95);

    // Set text color to white and fill color to RGB (62, 104, 150) for header row
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    // Draw the "DESCRIPTION" cell with left alignment and filled background
    doc.rect(10, 100, (true_width / 3) * 2, 5, "F");
    doc.text("DESCRIPTION", 12, 104, { align: "left" });

    // Draw the "HOURS" cell with center alignment and filled background
    doc.setFillColor(62, 104, 150);
    doc.rect(10 + (true_width / 3) * 2, 100, true_width / 9, 5, "F");
    doc.text("HOURS", 10 + (true_width / 3) * 2 + true_width / 9 / 2, 104, {
        align: "center",
    });

    // Draw the "RATE" cell with center alignment and filled background
    doc.setFillColor(62, 104, 150);
    doc.rect(
        10 + (true_width / 3) * 2 + true_width / 9,
        100,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        "RATE",
        10 + (true_width / 3) * 2 + true_width / 9 + true_width / 9 / 2,
        104,
        { align: "center" }
    );

    // Draw the "AMOUNT" cell with center alignment and filled background
    doc.setFillColor(62, 104, 150);
    doc.rect(
        10 + (true_width / 3) * 2 + 2 * (true_width / 9),
        100,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        "AMOUNT",
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        104,
        { align: "center" }
    );

    // Set text color to black and fill color to white for content rows
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);

    // Add service description using multi-line text
    doc.rect(10, 105, (true_width / 3) * 2, 5, "F");
    // Define the maximum width for the text to wrap within
    const maxWidth = (true_width / 3) * 2; // Adjust this value to the width you want for the wrapped text
    // Split the long text into multiple lines that fit within the specified width
    const wrappedText = doc.splitTextToSize(values.description, maxWidth);
    // Add the wrapped text to the document at the specified position
    doc.text(wrappedText, 12, 109);

    // Add empty lines for spacing
    doc.text("", 10, 114);
    doc.text("", 10, 119);
    doc.text("", 10, 124);

    // Add first period data
    doc.text(values.period_1, 10, 129, { align: "left" });
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + (true_width / 3) * 2, 125, true_width / 9, 5, "F");
    doc.text(
        `${values.hours_1}`,
        10 + (true_width / 3) * 2 + true_width / 9 / 2,
        129,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + true_width / 9,
        125,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${values.rate_1}`,
        10 + (true_width / 3) * 2 + true_width / 9 + true_width / 9 / 2,
        129,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + 2 * (true_width / 9),
        125,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${Number(values.rate_1) * Number(values.hours_1)}`,
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        129,
        { align: "center" }
    );

    // Add second period data
    doc.text(values.period_2, 10, 134, { align: "left" });
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + (true_width / 3) * 2, 130, true_width / 9, 5, "F");
    doc.text(
        `${values.hours_2}`,
        10 + (true_width / 3) * 2 + true_width / 9 / 2,
        134,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + true_width / 9,
        130,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${values.rate_2}`,
        10 + (true_width / 3) * 2 + true_width / 9 + true_width / 9 / 2,
        134,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + 2 * (true_width / 9),
        130,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${Number(values.hours_2) * Number(values.rate_2)}`,
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        134,
        { align: "center" }
    );

    // Add third period data
    doc.text(values.period_3, 10, 139, { align: "left" });
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + (true_width / 3) * 2, 135, true_width / 9, 5, "F");
    doc.text(
        `${values.hours_3}`,
        10 + (true_width / 3) * 2 + true_width / 9 / 2,
        139,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + true_width / 9,
        135,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${values.rate_3}`,
        10 + (true_width / 3) * 2 + true_width / 9 + true_width / 9 / 2,
        139,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + 2 * (true_width / 9),
        135,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${Number(values.hours_3) * Number(values.rate_3)}`,
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        139,
        { align: "center" }
    );

    // Add empty lines for final spacing
    doc.text("", 10, 144);
    doc.text("", 10, 149);
    doc.text("", 10, 154);

    ///////////////////////////////////////////////////////////////

    // Set text color and fill color for "Thank you for your business!" message
    doc.setTextColor(62, 104, 150);
    doc.setFillColor(217, 231, 245);
    doc.setFont("Times", "italic");
    doc.setFontSize(12);

    // Draw "Thank you for your business!" cell
    doc.rect(10, 160, (true_width / 3) * 2, 5, "F");
    doc.text(
        "Thank you for your business!",
        10 + ((true_width / 3) * 2) / 2,
        164,
        { align: "center" }
    );

    // Set text color and fill color for "SUBTOTAL"
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(181, 208, 235);
    doc.setFont("Times", "normal");
    doc.setFontSize(12);

    // Draw "SUBTOTAL" cell
    doc.rect(10 + 2 * (true_width / 3), 160, true_width / 6, 5, "F");
    doc.text("SUBTOTAL", 12 + 2 * (true_width / 3), 164, { align: "left" });

    // Draw "Amount Due" cell
    doc.setFillColor(217, 231, 245);
    doc.rect(
        10 + 2 * (true_width / 3) + true_width / 6,
        160,
        true_width / 6,
        5,
        "F"
    );
    doc.text(
        `${Number(values.hours_1) * Number(values.rate_1) +
        Number(values.hours_2) * Number(values.rate_2) +
        Number(values.hours_3) * Number(values.rate_3)
        }`,
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 - 2, // Correct x position for right alignment
        164, // Y position should be in the middle of the rectangle height
        { align: "right" }
    );

    // Draw empty cell for spacing
    doc.setFillColor(255, 255, 255);
    doc.setFont("Times", "italic");
    doc.rect(10, 165, (true_width / 3) * 2, 5, "F");

    // Set text color and fill color for "TAX RATE"
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(181, 208, 235);
    doc.setFont("Times", "normal");
    doc.setFontSize(12);

    // Draw "TAX RATE" cell
    doc.rect(10 + 2 * (true_width / 3), 165, true_width / 6, 5, "F");
    doc.text("TAX RATE", 12 + 2 * (true_width / 3), 169, { align: "left" });

    // Draw "0.000%" cell
    doc.setFillColor(217, 231, 245);
    doc.rect(
        10 + 2 * (true_width / 3) + true_width / 6,
        165,
        true_width / 6,
        5,
        "F"
    );
    doc.text(
        "0.000%",
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 - 2,
        169,
        { align: "right" }
    );

    // Draw another empty cell for spacing
    doc.setFillColor(255, 255, 255);
    doc.setFont("Times", "italic");
    doc.rect(10, 180, (true_width / 3) * 2, 5, "F");

    // Set text color and fill color for "TAX"
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(181, 208, 235);
    doc.setFont("Times", "normal");

    // Draw "TAX" cell
    doc.rect(10 + 2 * (true_width / 3), 170, true_width / 6, 5, "F");
    doc.text("TAX", 12 + 2 * (true_width / 3), 174, { align: "left" });

    // Draw "0" cell
    doc.setFillColor(217, 231, 245);
    doc.rect(
        10 + 2 * (true_width / 3) + true_width / 6,
        170,
        true_width / 6,
        5,
        "F"
    );
    doc.text(
        "0",
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 - 2,
        174,
        { align: "right" }
    );

    // Draw another empty cell for spacing
    doc.setFillColor(255, 255, 255);
    doc.setFont("Times", "italic");
    doc.rect(10, 190, (true_width / 3) * 2, 5, "F");

    // Set text color and fill color for "TOTAL"
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(181, 208, 235);
    doc.setFont("Times", "normal");

    // Draw "TOTAL" cell
    doc.rect(10 + 2 * (true_width / 3), 175, true_width / 6, 5, "F");
    doc.text("TOTAL", 12 + 2 * (true_width / 3), 179, { align: "left" });

    // Draw "Amount Due" in bold
    doc.setFillColor(217, 231, 245);
    doc.setFont("Times", "bold");
    doc.rect(
        10 + 2 * (true_width / 3) + true_width / 6,
        175,
        true_width / 6,
        5,
        "F"
    );
    doc.text(
        `${Number(values.hours_1) * Number(values.rate_1) +
        Number(values.hours_2) * Number(values.rate_2) +
        Number(values.hours_3) * Number(values.rate_3)
        }`,
        10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 - 2,
        179,
        { align: "right" }
    );

    // Draw final spacing and contact information
    doc.setFillColor(255, 255, 255);
    doc.setFont("Times", "italic");
    doc.setTextColor(0, 0, 0);

    // Center-align "If you have any questions..." text
    doc.text(
        "If you have any questions about this invoice, please contact",
        pageWidth / 2,
        209,
        { align: "center" }
    );

    // Center-align contact name
    doc.setFont("Times", "normal");
    doc.text("Romona Mahabir", pageWidth / 2, 214, { align: "center" });

    // Center-align contact phone number
    doc.text("(718) 807-6139", pageWidth / 2, 219, { align: "center" });

    const pdfDataUrl = doc.output("dataurlstring");

    return pdfDataUrl;
};