'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { searchArtisans, ArtisanSearchResult } from '@/lib/api/search';

const CATEGORIES = [
  { label: 'Plumbing', value: 'plumber', image: 'plumbing-pipes', description: 'Leaks, pipes, bathrooms and water systems.' },
  { label: 'Electrical', value: 'electrician', image: 'electrical-wiring', description: 'Wiring, installations, repairs and maintenance.' },
  { label: 'Solar', value: 'solar technician', image: 'solar-panels', description: 'Solar panels, inverters, batteries and setup.' },
  { label: 'Carpentry', value: 'carpenter', image: 'carpentry-wood', description: 'Furniture, doors, cabinets and woodwork.' },
  { label: 'Tailoring', value: 'tailor', image: 'tailoring-fabric', description: 'Custom clothes, alterations and traditional wear.' },
  { label: 'Auto Repair', value: 'mechanic', image: 'auto-mechanic', description: 'Vehicle repairs, servicing and diagnostics.' },
  { label: 'Painting', value: 'painter', image: 'wall-painting', description: 'Interior, exterior and decorative painting.' },
  { label: 'Masonry', value: 'mason', image: 'masonry-brick', description: 'Building, blocks, plastering and renovations.' },
  { label: 'AC & Refrigeration', value: 'ac technician', image: 'ac-repair', description: 'Air conditioners, fridges and cooling systems.' },
  { label: 'Welding', value: 'welder', image: 'welding-metal', description: 'Metalwork, gates, frames and fabrication.' },
  { label: 'Cleaning', value: 'cleaner', image: 'home-cleaning', description: 'Home, office and commercial cleaning services.' },
  { label: 'Phone Repair', value: 'phone technician', image: 'phone-repair', description: 'Phone repairs, screens, batteries and software.' },
];

const HOW_IT_WORKS = [
  { number: '01', title: 'Choose a service', description: 'Tell Amana what kind of work you need. Start with a service instead of trying to guess an artisan.' },
  { number: '02', title: 'Find nearby artisans', description: 'Explore artisans around your area and compare their profiles, work, ratings and experience.' },
  { number: '03', title: 'Choose who to hire', description: 'Visit an artisan profile, look through their work and send a booking request when you are ready.' },
  { number: '04', title: 'Get the job done', description: 'Complete the job through Amana and share your experience with a review when it is finished.' },
];

const TRUST_POINTS = [
  { title: 'See the work first', description: 'Artisan profiles can showcase photos of their work so customers can understand their skills before contacting them.' },
  { title: 'Built around local discovery', description: 'Amana is designed to make finding skilled people nearby easier, starting with Kano.' },
  { title: 'A structured hiring flow', description: 'Customers can move from discovering an artisan to sending a booking request through a clear process.' },
  { title: 'Made for Northern Nigeria', description: 'Amana starts in Kano with the goal of making local skilled work easier to discover across Nigeria.' },
];

export default function Home() {
  const [artisans, setArtisans] = useState<ArtisanSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchArtisans({ latitude: 12.0, longitude: 8.5167, radiusKm: 50 })
      .then((data) => setArtisans(data))
      .catch(() => setArtisans([]))
      .finally(() => setLoading(false));
  }, []);

  const workPhotos = artisans
    .flatMap((artisan) =>
      (artisan.portfolioPhotos || []).map((url) => ({
        url,
        artisanId: artisan._id,
        trade: artisan.tradeCategory,
      }))
    )
    .slice(0, 8);

  return (
    <main className="min-h-screen overflow-x-hidden bg-sand-50 text-teal-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-end select-none opacity-[0.03]"
          aria-hidden="true"
        >
          <p style={{ fontFamily: 'var(--font-display)' }} className="text-[26rem] font-bold leading-none text-teal-900 -mr-16">
            A
          </p>
        </div>

        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-terracotta-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-20 lg:grid-cols-2 lg:gap-20 lg:pb-28 lg:pt-28">
          <div className="animate-fade-in-up">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-terracotta-600/20 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-terracotta-600" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                Starting in Kano
              </span>
            </div>

            <h1 className="font-display max-w-3xl text-5xl leading-[1.05] text-teal-900 sm:text-6xl lg:text-7xl">
              Skilled people.
              <br />
              <span className="relative inline-block text-terracotta-600">Real work.</span>
              <br />
              Right where you need them.
            </h1>

            <p className="mt-7 max-w-2xl font-body text-lg leading-8 text-teal-800/70 sm:text-xl">
              Find local artisans for the work you need, from plumbing and
              electrical repairs to tailoring, carpentry, solar and more.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/search"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-terracotta-600 px-7 py-4 font-body font-bold text-white shadow-xl shadow-terracotta-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-terracotta-700 hover:shadow-2xl"
              >
                Find an Artisan
                <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
              </Link>

              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border-2 border-teal-900/10 bg-white px-7 py-4 font-body font-bold text-teal-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-900/20 hover:shadow-lg"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-teal-800/60">
              <div className="flex items-center gap-2">Browse before signing up</div>
              <div className="flex items-center gap-2">Local artisans</div>
              <div className="flex items-center gap-2">Service-first discovery</div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-2xl shadow-teal-900/10">
                <div className="relative h-[560px] overflow-hidden rounded-[1.5rem] bg-teal-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85"
                    alt="Skilled artisan working"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-900/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-gold-400">AMANA</p>
                    <h2 className="mt-2 font-display text-3xl text-white">Find the right person for the job.</h2>
                    <p className="mt-3 max-w-sm font-body text-sm leading-6 text-white/70">
                      Discover skilled professionals around Kano and explore the work they can do.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-12 bottom-14 hidden w-56 rounded-2xl border border-teal-900/5 bg-white p-5 shadow-2xl xl:block">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-teal-800/50">Popular</span>
                  <span className="rounded-full bg-gold-400/15 px-2 py-1 text-xs font-bold text-gold-500">Nearby</span>
                </div>
                <p className="font-body font-bold text-teal-900">Plumbing</p>
                <p className="font-body text-xs text-teal-800/50">Find local plumbers</p>
              </div>

              <div className="absolute -right-8 top-16 hidden rounded-2xl border border-teal-900/5 bg-white px-5 py-4 shadow-2xl xl:block">
                <p className="font-body text-xs text-teal-800/50">Starting location</p>
                <p className="font-body font-bold text-teal-900">Kano, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-2 shadow-xl">
              <div className="relative h-[380px] overflow-hidden rounded-[1.25rem] bg-teal-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                  alt="Skilled artisan working"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-gold-400">AMANA</p>
                  <h2 className="mt-2 font-display text-2xl text-white">Skilled people. Real work.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 border-y border-teal-900/5 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-terracotta-600/20 bg-terracotta-50 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-terracotta-600" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                  Explore services
                </span>
              </div>
              <h2 className="font-display text-4xl leading-tight text-teal-900 sm:text-5xl">
                What do you need help with?
              </h2>
              <p className="mt-5 font-body text-lg leading-8 text-teal-800/65">
                Start with the type of work you need. Amana helps you discover artisans who offer that service.
              </p>
            </div>
            <Link href="/search" className="group inline-flex items-center gap-2 font-body font-bold text-terracotta-600">
              View all services
              <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category, index) => (
              <Link
                key={category.value}
                href={`/search?category=${encodeURIComponent(category.value)}`}
                className="group relative overflow-hidden rounded-2xl border border-teal-900/8 bg-sand-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-terracotta-600/30 hover:bg-white hover:shadow-xl"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative -mx-6 -mt-6 mb-5 h-36 overflow-hidden rounded-t-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/amana-${category.image}/500/300`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                </div>

                <h3 className="font-display text-2xl text-teal-900">{category.label}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-teal-800/60">{category.description}</p>
                <div className="mt-5 font-body text-sm font-bold text-terracotta-600">
                  Find {category.label.toLowerCase()} artisans
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-terracotta-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY ARTISANS */}
      <section className="bg-sand-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-teal-900" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-teal-800">
                  Local discovery
                </span>
              </div>
              <h2 className="font-display text-4xl text-teal-900 sm:text-5xl">Artisans near Kano</h2>
              <p className="mt-4 max-w-xl font-body text-lg leading-8 text-teal-800/65">
                Explore artisans around Kano and choose someone whose skills match the work you need.
              </p>
            </div>
            <Link href="/search" className="group inline-flex items-center gap-2 font-body font-bold text-terracotta-600">
              Browse all artisans
              <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              {loading ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-96 animate-pulse rounded-2xl bg-white" />
                  ))}
                </div>
              ) : artisans.length === 0 ? (
                <div className="rounded-2xl border border-teal-900/10 bg-white p-10 text-center shadow-sm">
                  <h3 className="mt-5 font-display text-2xl text-teal-900">More artisans are coming</h3>
                  <p className="mx-auto mt-3 max-w-md font-body leading-7 text-teal-800/60">
                    We are growing the Amana artisan community. Check back soon or explore all available artisans.
                  </p>
                  <Link
                    href="/search"
                    className="mt-6 inline-flex rounded-xl bg-teal-900 px-6 py-3 font-body font-bold text-white transition hover:bg-teal-800"
                  >
                    Explore artisans
                  </Link>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {artisans.slice(0, 4).map((artisan) => (
                    <Link
                      key={artisan._id}
                      href={`/artisan/${artisan._id}`}
                      className="group overflow-hidden rounded-2xl border border-teal-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-terracotta-600/30 hover:shadow-xl"
                    >
                      <div className="relative h-52 overflow-hidden bg-sand-100">
                        {artisan.portfolioPhotos?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={artisan.portfolioPhotos[0]}
                            alt={artisan.tradeCategory}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-sand-100 via-white to-terracotta-50">
                            <span className="font-display text-3xl text-teal-900/30 capitalize">
                              {artisan.tradeCategory}
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-full bg-white/95 px-3 py-1.5 font-body text-xs font-bold capitalize text-teal-900 shadow-lg">
                            {artisan.tradeCategory}
                          </span>
                        </div>

                        {artisan.verificationStatus === 'verified' && (
                          <div className="absolute right-4 top-4 rounded-full bg-teal-900/95 px-3 py-1.5 font-body text-xs font-bold text-white">
                            Verified
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-display text-xl capitalize text-teal-900">{artisan.tradeCategory}</h3>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {artisan.ratingAvg ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gold-400/10 px-2.5 py-1 font-body text-sm font-bold text-gold-500">
                              {artisan.ratingAvg.toFixed(1)}
                              <span className="font-normal text-teal-800/50">({artisan.ratingCount})</span>
                            </span>
                          ) : (
                            <span className="font-body text-xs italic text-teal-800/45">No reviews yet</span>
                          )}
                          <span className="font-body text-xs text-teal-800/45">
                            {(artisan.distanceMeters / 1000).toFixed(1)} km away
                          </span>
                        </div>

                        <div className="mt-5 border-t border-teal-900/8 pt-4 font-body text-sm font-bold text-terracotta-600">
                          View artisan profile
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative min-h-[520px] overflow-hidden rounded-3xl bg-teal-900 shadow-xl flex items-center justify-center">
              <div className="relative text-center px-6">
                <p className="font-display text-2xl text-white mb-2">Map view</p>
                <p className="font-body text-sm text-white/60">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-teal-900 py-24">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-terracotta-600/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-gold-400" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                Simple by design
              </span>
            </div>
            <h2 className="font-display text-4xl text-white sm:text-5xl">How Amana works</h2>
            <p className="mt-5 font-body text-lg leading-8 text-white/60">
              Finding the right person for your job should feel simple.
            </p>
          </div>

          <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-white/10 lg:block" />
            {HOW_IT_WORKS.map((step) => (
              <div key={step.number} className="relative">
                <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-terracotta-600 font-display text-xl text-white shadow-xl shadow-terracotta-600/20">
                  {step.number}
                </div>
                <div className="mt-7">
                  <h3 className="font-display text-2xl text-white">{step.title}</h3>
                  <p className="mt-3 font-body leading-7 text-white/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK GALLERY */}
      {workPhotos.length > 0 && (
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-sand-50 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-teal-900" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-teal-800">
                    Artisan portfolio
                  </span>
                </div>
                <h2 className="font-display text-4xl text-teal-900 sm:text-5xl">See the work.</h2>
                <p className="mt-5 font-body text-lg leading-8 text-teal-800/65">
                  Explore work shared by artisans on Amana before you decide who to contact.
                </p>
              </div>
              <Link href="/search" className="group inline-flex items-center gap-2 font-body font-bold text-terracotta-600">
                Explore more
                <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {workPhotos.map((photo, index) => (
                <Link
                  key={`${photo.artisanId}-${index}`}
                  href={`/artisan/${photo.artisanId}`}
                  className={`group relative overflow-hidden rounded-2xl ${
                    index === 0 || index === 5 ? 'aspect-[4/5] md:row-span-2' : 'aspect-square'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.trade}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 font-body text-xs font-bold capitalize text-teal-900">
                      {photo.trade}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRUST */}
      <section className="bg-sand-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-white px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-terracotta-600" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-teal-800">
                Trust matters
              </span>
            </div>
            <h2 className="font-display text-4xl text-teal-900 sm:text-5xl">Built around confidence.</h2>
            <p className="mt-5 font-body text-lg leading-8 text-teal-800/65">
              The goal is simple: make it easier to discover local skills and make better hiring decisions.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {TRUST_POINTS.map((point, i) => (
              <div
                key={point.title}
                className="group rounded-2xl border border-teal-900/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-900 font-display text-lg text-white group-hover:bg-terracotta-600 transition-colors mb-5">
                  {i + 1}
                </div>
                <h3 className="font-display text-2xl text-teal-900">{point.title}</h3>
                <p className="mt-3 font-body leading-7 text-teal-800/60">{point.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/safety" className="font-body text-sm font-bold text-terracotta-600">
              Learn more about safety and trust
            </Link>
          </div>
        </div>
      </section>

      {/* FOR ARTISANS */}
      <section className="px-6 py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-teal-900 px-7 py-16 shadow-2xl sm:px-12 lg:px-20 lg:py-20">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-terracotta-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-gold-400" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                  For artisans
                </span>
              </div>

              <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
                Your skills deserve to be discovered.
              </h2>

              <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-white/65">
                Create your Amana profile, showcase the work you are proud of and make it
                easier for customers looking for your skills to find you.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-terracotta-600 px-7 py-4 font-body font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-terracotta-700"
                >
                  Join Amana
                </Link>
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-body font-bold text-white transition-all hover:bg-white/10"
                >
                  Learn how it works
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['Show your work', 'Be discovered locally', 'Connect with customers', 'Grow with Amana'].map((text) => (
                <div key={text} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-body text-sm font-bold text-white">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-teal-900/8 bg-white p-8 shadow-sm sm:p-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-terracotta-600/20 bg-terracotta-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-terracotta-600" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                Where we serve
              </span>
            </div>
            <h2 className="font-display text-4xl text-teal-900">Starting in Kano.</h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-8 text-teal-800/60">
              Amana is starting in Kano and is being built with a bigger vision: make trusted
              local skills easier to discover across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-terracotta-600 py-24">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-teal-900/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            Your next job starts here
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Need a skilled person for the job?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-8 text-white/75">
            Choose a service, explore artisans near you and find someone who fits the work you need.
          </p>
          <Link
            href="/search"
            className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-teal-900 px-8 py-4 font-body text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800"
          >
            Find an Artisan
            <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-teal-900">
        <div className="h-1 bg-gradient-to-r from-terracotta-600 via-gold-400 to-terracotta-600" />

        <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-600 shadow-lg shadow-terracotta-600/20">
                  <span className="font-display text-2xl font-bold text-white">A</span>
                </div>
                <span className="font-display text-3xl text-white">Amana</span>
              </Link>

              <p className="mt-5 max-w-sm font-body leading-7 text-white/50">
                A local marketplace connecting customers with skilled artisans and helping
                great work get discovered.
              </p>

              <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 font-body text-xs text-white/50">
                Starting in Kano, expanding across Nigeria.
              </div>
            </div>

            <div>
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-terracotta-400">Customers</h3>
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/search" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">Find Artisans</Link>
                <Link href="/#how-it-works" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">How It Works</Link>
                <Link href="/help" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">FAQs</Link>
              </div>
            </div>

            <div>
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-gold-400">Artisans</h3>
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/register" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">Become an Artisan</Link>
                <Link href="/edit-profile" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">Build Your Profile</Link>
                <Link href="/help" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">Artisan FAQs</Link>
              </div>
            </div>

            <div>
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-white/70">Support</h3>
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/help" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">Help Center</Link>
                <Link href="/safety" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">Safety and Trust</Link>
                <Link href="/search" className="font-body text-sm text-white/55 transition hover:translate-x-1 hover:text-white">Browse Services</Link>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-sm text-white/35">© 2026 Amana. All rights reserved.</p>

            <div className="flex items-center gap-3">
              {['Instagram', 'Facebook', 'TikTok', 'LinkedIn'].map((platform) => (
                <span
                  key={platform}
                  title={`${platform} coming soon`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 font-body text-xs font-bold text-white/35"
                >
                  {platform.charAt(0)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}