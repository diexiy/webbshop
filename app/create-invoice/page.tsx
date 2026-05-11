import InvoiceForm from "../components/InvoiceForm";

export default function CreateInvoicePage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Create Invoice
      </h1>

      <InvoiceForm />
    </main>
  );
}