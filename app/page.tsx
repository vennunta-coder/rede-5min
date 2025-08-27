"use client";
import React, { useState } from "react";

export default function LandingPage() {
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = (e.currentTarget as HTMLFormElement).email.value.trim();

    if (!email) return;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setFeedback("Obrigado pelo cadastro! 🎉");
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        setFeedback("Erro ao enviar. Tente novamente.");
      }
    } catch {
      setFeedback("Erro de conexão. Tente novamente.");
    }
  }

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="text-orange-500">⏱️</span> Rede dos 5 Minutos
          </div>
          <a
            href="#form"
            className="bg-orange-500 text-neutral-950 font-semibold px-4 py-2 rounded-xl hover:bg-orange-400 transition"
          >
            Quero participar
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Conecte-se em apenas <span className="text-orange-500">5 minutos por dia</span>
        </h1>
        <p className="max-w-2xl mx-auto text-neutral-300 text-lg mb-8">
          Uma rede social minimalista: sem feeds infinitos, sem vício.
          Apenas um instante real de conexão diária.
        </p>
        <form id="form" onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="seuemail@exemplo.com"
            className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 px-5 py-3 rounded-2xl font-semibold text-neutral-950 shadow-[0_4px_0_#7c2d12] hover:translate-y-0.5 active:translate-y-1 transition"
          >
            Quero ser avisado
          </button>
        </form>
        {feedback && (
          <p className="text-sm mt-3 text-green-400">{feedback}</p>
        )}
      </section>

      {/* Sobre */}
      <section id="sobre" className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Sobre a Rede</h2>
        <p className="max-w-3xl mx-auto text-neutral-300">
          A Rede dos 5 Minutos nasceu da necessidade de desacelerar.
          Aqui, cada pessoa tem apenas cinco minutos por dia para se expressar
          e interagir. É uma pausa consciente em meio ao excesso de informação.
        </p>
      </section>

      {/* CTA final */}
      <section className="bg-orange-500 text-neutral-950 py-16 text-center">
        <h2 className="text-3xl font-black mb-4">
          Pronto para se conectar de forma saudável?
        </h2>
        <a
          href="#form"
          className="bg-neutral-950 text-orange-500 px-6 py-3 rounded-2xl font-semibold hover:bg-neutral-800 transition"
        >
          Quero participar
        </a>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-neutral-500 text-sm">
        <p>© 2025 Rede dos 5 Minutos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
