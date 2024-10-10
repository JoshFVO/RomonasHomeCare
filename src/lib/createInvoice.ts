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
    const leftMargin = 10;
    const rightMargin = 10;
    const true_width = pageWidth - leftMargin - rightMargin;

    doc.setProperties({
        title: "Monthly Invoice",
        author: "Romona's Home Care",
    });

    doc.setFont("Times", "bold");
    doc.setFontSize(18);


    doc.setTextColor(62, 104, 150);

    doc.text("Romona's Home Care", 10, 20, { align: "left" });

    doc.setFont("Times", "bold");
    doc.setFontSize(24);

    doc.text("INVOICE", 200, 20, { align: "right" });

    doc.setFont("Times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text("1131 Parkwood Blvd", 10, 25, { align: "left" });
    doc.text("Schenectady, NY 12308", 10, 30, { align: "left" });
    doc.text("(718) 749-6412", 10, 35, { align: "left" });

    doc.text("", 10, 40);

    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    doc.rect(10, 45, true_width / 3, 5, "F");

    doc.text("BILL TO", 10 + 2, 49);

    doc.setTextColor(255, 255, 255);
    doc.setFillColor(255, 255, 255);

    doc.rect(10 + true_width / 3, 45, true_width / 3, 5, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    doc.rect(10 + 2 * (true_width / 3), 45, true_width / 6, 5, "F");

    doc.text("INVOICE #", 10 + 2 * (true_width / 3) + true_width / 6 / 2, 49, {
        align: "center",
    });

    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    doc.rect(10 + 2 * (true_width / 3) + true_width / 6, 45, true_width / 6, 5, "F");

    doc.text("DATE", 10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2, 49, {
        align: "center",
    });

    doc.setTextColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);

    doc.text(`${resident.first_name} ${resident.last_name}`, 10, 55);

    doc.setFillColor(255, 255, 255);
    doc.rect(10 + true_width / 3, 51, true_width / 3, 5, "F");

    doc.text("1", 10 + 2 * (true_width / 3) + true_width / 6 / 2, 55, {
        align: "center",
    });

    doc.text(values.date, 10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2, 55, {
        align: "center",
    });

    doc.rect(10, 105, (true_width / 3) * 2, 5, "F");
    const maxAddressWidth = (true_width / 3);
    const wrappedAddressText = doc.splitTextToSize(resident.address, maxAddressWidth);

    doc.text(wrappedAddressText, 10, 60);

    doc.setFillColor(255, 255, 255);
    doc.rect(10 + true_width / 3, 56, true_width / 3, 5, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    doc.setFillColor(62, 104, 150);
    doc.rect(10 + 2 * (true_width / 3), 56, true_width / 6, 5, "F"); // (71 - 15)
    doc.text("CUSTOMER ID", 10 + 2 * (true_width / 3) + true_width / 6 / 2, 60, {
        align: "center",
    });

    doc.setFillColor(62, 104, 150);
    doc.rect(10 + 2 * (true_width / 3) + true_width / 6, 56, true_width / 6, 5, "F"); // (71 - 15)
    doc.text("TERMS", 10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2, 60, {
        align: "center",
    });


    doc.setFillColor(255, 255, 255);
    doc.rect(10 + true_width / 3, 61, true_width / 3, 5, "F"); // (76 - 15)

    doc.setTextColor(0, 0, 0);
    doc.text(`${resident.id.split('-')[0]}`, 10 + 2 * (true_width / 3) + true_width / 6 / 2, 65, {
        align: "center",
    });

    doc.text("Due Upon Receipt", 10 + 2 * (true_width / 3) + true_width / 6 + true_width / 6 / 2, 65, {
        align: "center",
    });
    doc.text("", 10, 70);
    doc.text("", 10, 75);

    doc.setTextColor(255, 255, 255);
    doc.setFillColor(62, 104, 150);

    doc.rect(10, 80, (true_width / 3) * 2, 5, "F");
    doc.text("DESCRIPTION", 12, 84, { align: "left" });

    doc.setFillColor(62, 104, 150);
    doc.rect(10 + (true_width / 3) * 2, 80, true_width / 9, 5, "F");
    doc.text("HOURS", 10 + (true_width / 3) * 2 + true_width / 9 / 2, 84, {
        align: "center",
    });

    doc.setFillColor(62, 104, 150);
    doc.rect(
        10 + (true_width / 3) * 2 + true_width / 9,
        80,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        "RATE",
        10 + (true_width / 3) * 2 + true_width / 9 + true_width / 9 / 2,
        84,
        { align: "center" }
    );

    doc.setFillColor(62, 104, 150);
    doc.rect(
        10 + (true_width / 3) * 2 + 2 * (true_width / 9),
        80,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        "AMOUNT",
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        84,
        { align: "center" }
    );

    doc.setTextColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);

    const maxWidth = (true_width / 3) * 2; 
    const wrappedText = doc.splitTextToSize(values.description, maxWidth);

    const fontSize = doc.getFontSize();
    const lineHeight = fontSize * 1.15; // Estimate line height
    const textHeight = wrappedText.length * lineHeight;

    doc.setTextColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);

    doc.rect(10, 85, (true_width / 3) * 2, textHeight, "F");

    doc.text(wrappedText, 12, 89);


    doc.text(values.period_1, 12, 139, { align: "left" });
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + (true_width / 3) * 2, 135, true_width / 9, 5, "F");
    doc.text(
        `${values.hours_1}`,
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
        `$${values.rate_1}`,
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
        `$${Number(values.rate_1) * Number(values.hours_1)}`,
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        139,
        { align: "center" }
    );

    doc.text(values.period_2, 12, 144, { align: "left" });
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + (true_width / 3) * 2, 140, true_width / 9, 5, "F");
    doc.text(
        `${values.hours_2}`,
        10 + (true_width / 3) * 2 + true_width / 9 / 2,
        144,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + true_width / 9,
        140,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${values.rate_2}`,
        10 + (true_width / 3) * 2 + true_width / 9 + true_width / 9 / 2,
        144,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + 2 * (true_width / 9),
        140,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${Number(values.hours_2) * Number(values.rate_2)}`,
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        144,
        { align: "center" }
    );

    doc.text(values.period_3, 12, 149, { align: "left" });
    doc.setFillColor(255, 255, 255);
    doc.rect(10 + (true_width / 3) * 2, 145, true_width / 9, 5, "F");
    doc.text(
        `${values.hours_3}`,
        10 + (true_width / 3) * 2 + true_width / 9 / 2,
        149,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + true_width / 9,
        145,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${values.rate_3}`,
        10 + (true_width / 3) * 2 + true_width / 9 + true_width / 9 / 2,
        149,
        { align: "center" }
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(
        10 + (true_width / 3) * 2 + 2 * (true_width / 9),
        145,
        true_width / 9,
        5,
        "F"
    );
    doc.text(
        `$${Number(values.hours_3) * Number(values.rate_3)}`,
        10 + (true_width / 3) * 2 + 2 * (true_width / 9) + true_width / 9 / 2,
        149,
        { align: "center" }
    );

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