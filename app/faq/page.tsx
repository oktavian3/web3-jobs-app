"use client";

import { useState, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/faq.json")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        Loading FAQs...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
        <p className="text-lg text-gray-400">
          Common questions about web3 careers and breaking in
        </p>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <button
            key={i}
            onClick={() =>
              setExpandedIndex(expandedIndex === i ? null : i)
            }
            className="w-full text-left p-6 rounded-lg border border-[#2a2a2a] hover:border-[#a855f7] hover:bg-[#1a1a1a] transition"
          >
            <div className="flex justify-between items-start gap-4">
              <span className="font-semibold text-lg">{faq.question}</span>
              <span className="text-[#a855f7] text-xl min-w-6 text-right">
                {expandedIndex === i ? "−" : "+"}
              </span>
            </div>

            {expandedIndex === i && (
              <div className="mt-4 pt-4 border-t border-[#2a2a2a] text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="mt-20 p-8 rounded-lg bg-gradient-to-r from-[#a855f7]/10 to-[#10b981]/10 border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-gray-400 mb-6">
          The best way to get answers is to jump into communities and ask. Most of web3
          is built by people who were curious and asked questions.
        </p>
        <div className="space-y-3">
          <p className="text-sm">
            <span className="font-semibold">Discord:</span> Join protocol Discord servers and
            ask in #introductions or #general
          </p>
          <p className="text-sm">
            <span className="font-semibold">Twitter/X:</span> Tag projects and builders,
            engage in conversations
          </p>
          <p className="text-sm">
            <span className="font-semibold">Reddit:</span> r/web3, r/cryptojobs, r/defi have
            active communities
          </p>
        </div>
      </div>
    </div>
  );
}
