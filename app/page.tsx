export default function Home() {
  return (
    <main className="min-h-screen bg-sand-50">
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-4">
          Kano · Northern Nigeria
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-teal-900 leading-tight mb-6">
          Hire verified artisans<br />you can trust.
        </h1>
        <p className="font-body text-lg text-teal-800/80 max-w-xl mb-10">
          Amana connects you with skilled, verified local artisans — electricians,
          tailors, mechanics — built on real completed jobs, not empty claims.
        </p>
        <div className="flex gap-4">
          <button className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-6 py-3 rounded-sm transition-colors">
            Find an Artisan
          </button>
          <button className="font-body border border-teal-800/30 hover:border-teal-800 text-teal-900 px-6 py-3 rounded-sm transition-colors">
            I'm an Artisan
          </button>
        </div>
      </section>
    </main>
  );
}