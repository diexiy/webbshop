import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        WabbShop
      </h1>

      <p className="mt-4">
        Create professional invoices in Arabic and Dutch and other langauges
      </p>

      <Link href="/create-invoice">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          go to pdf page
        </button>
      </Link>
    </main>
  );
}