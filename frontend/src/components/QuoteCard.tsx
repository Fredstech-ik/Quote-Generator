import { useEffect, useState } from "react";

interface Quote {
  quote: string;
  author: string;
}

export default function QuoteCard() {
  const [quote, setQuote] = useState<Quote | null>(null);

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://YOUR-VERCEL-APP.vercel.app/api/quote");
      const data = await res.json();
      const q = Array.isArray(data) ? data[0] : data;
      setQuote({ quote: q.quote || q.text, author: q.author || "Unknown" });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <p className="text-xl font-semibold text-gray-800 mb-4">
        "{quote?.quote || "Loading..."}"
      </p>
      <p className="text-right text-gray-500">— {quote?.author}</p>
      <button
        onClick={fetchQuote}
        className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        New Quote
      </button>
    </div>
  );
}
