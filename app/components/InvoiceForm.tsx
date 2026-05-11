"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function InvoiceForm() {
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [vatRate, setVatRate] = useState("21");

  const subtotal = Number(quantity) * Number(price);
  const vatAmount = subtotal * (Number(vatRate) / 100);
  const total = subtotal + vatAmount;

  const downloadPDF = async () => {
    const invoiceElement = document.getElementById("invoice");

    if (!invoiceElement) return;

    const canvas = await html2canvas(invoiceElement, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="space-y-4 max-w-xl">
      <input className="border p-2 w-full" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Company Logo" value={companyLogo} onChange={(e) => setCompanyLogo(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Invoice Number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
      <input className="border p-2 w-full" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input className="border p-2 w-full" placeholder="VAT %" type="number" value={vatRate} onChange={(e) => setVatRate(e.target.value)} />

      <div id="invoice" className="border p-8 mt-10 rounded bg-white shadow text-black">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Invoice</h2>
            <p>#{invoiceNumber}</p>
          </div>

          <div className="text-right">
            <p className="font-bold">{companyName}</p>
            <p>{companyLogo}</p>
          </div>
        </div>

        <div className="mb-8">
          <p>Bill To:</p>
          <p className="font-semibold">{customerName}</p>
          <p>Date: {invoiceDate}</p>
        </div>

        <table className="w-full border-collapse mb-8">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Service</th>
              <th className="text-center py-2">Qty</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">{service}</td>
              <td className="text-center py-3">{quantity}</td>
              <td className="text-right py-3">€{Number(price || 0).toFixed(2)}</td>
              <td className="text-right py-3">€{subtotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>VAT ({vatRate}%):</span>
              <span>€{vatAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t pt-2 font-bold text-lg">
              <span>Total:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
}