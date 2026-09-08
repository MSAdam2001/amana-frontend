'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  getArtisanProfile,
  getReviewsForArtisan,
  ArtisanProfileDetail,
  ArtisanReview,
} from '@/lib/api/profiles';
import { createBooking } from '@/lib/api/bookings';

const CATEGORY_ICONS: Record<string, string> = {
  plumber: '🔧',
  electrician: '⚡',
  carpenter: '🪚',
  tailor: '🧵',
  mechanic: '🚗',
  'solar technician': '☀️',
  painter: '🎨',
  mason: '🧱',
  'ac technician': '❄️',
  welder: '🔥',
  cleaner: '🧹',
};

const CATEGORY_LABELS: Record<string, string> = {
  plumber: 'Plumber',
  electrician: 'Electrician',
  carpenter: 'Carpenter',
  tailor: 'Tailor',
  mechanic: 'Mechanic',
  'solar technician': 'Solar Technician',
  painter: 'Painter',
  mason: 'Mason',
  'ac technician': 'AC Technician',
  welder: 'Welder',
  cleaner: 'Cleaner',
};

function formatCategory(category?: string) {
  if (!category) return 'Artisan';

  return (
    CATEGORY_LABELS[category.toLowerCase()] ||
    category
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

function getSocialUrl(platform: string, value: string) {
  if (!value) return '#';

  if (
    value.startsWith('http://') ||
    value.startsWith('https://')
  ) {
    return value;
  }

  const cleanValue = value.replace(/^@/, '');

  switch (platform) {
    case 'instagram':
      return `https://instagram.com/${cleanValue}`;

    case 'facebook':
      return `https://facebook.com/${cleanValue}`;

    case 'tiktok':
      return `https://tiktok.com/@${cleanValue}`;

    case 'x':
      return `https://x.com/${cleanValue}`;

    default:
      return value;
  }
}

export default function ArtisanProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] =
    useState<ArtisanProfileDetail | null>(null);

  const [reviews, setReviews] = useState<ArtisanReview[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showBookingForm, setShowBookingForm] = useState(false);

  const [description, setDescription] = useState('');

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSent, setBookingSent] = useState(false);

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError('');

    getArtisanProfile(id)
      .then((data) => {
        setProfile(data);
      })
      .catch(() => {
        setError('This artisan profile could not be found.');
      })
      .finally(() => {
        setLoading(false);
      });

    getReviewsForArtisan(id)
      .then((data) => {
        setReviews(data);
      })
      .catch(() => {
        setReviews([]);
      });
  }, [id]);

  async function handleBookingSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!description.trim()) {
      setBookingError('Please describe the job.');
      return;
    }

    setBookingLoading(true);
    setBookingError('');

    try {
      await createBooking({
        artisanProfileId: id,
        description: description.trim(),
      });

      setBookingSent(true);
      setShowBookingForm(false);
      setDescription('');
    } catch (err: any) {
      setBookingError(
        err?.message || 'Failed to send booking request.'
      );
    } finally {
      setBookingLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-sand-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="h-5 w-32 bg-teal-900/10 rounded-full animate-pulse mb-8" />

          <div className="bg-white rounded-3xl border border-teal-900/10 p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-28 h-28 rounded-2xl bg-teal-900/10 animate-pulse" />

              <div className="flex-1 space-y-4">
                <div className="h-8 bg-teal-900/10 rounded-lg w-2/3 animate-pulse" />
                <div className="h-5 bg-teal-900/10 rounded-lg w-1/3 animate-pulse" />
                <div className="h-4 bg-teal-900/10 rounded-lg w-1/2 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-8">
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-40 bg-white rounded-2xl border border-teal-900/10 animate-pulse"
                />
              ))}
            </div>

            <div className="hidden lg:block h-72 bg-white rounded-2xl border border-teal-900/10 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center bg-white border border-teal-900/10 rounded-3xl p-10 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-terracotta-50 flex items-center justify-center text-3xl">
            😕
          </div>

          <h1 className="font-display text-2xl text-teal-900 mb-3">
            Artisan not found
          </h1>

          <p className="font-body text-teal-800/60 mb-7">
            {error || 'We could not find this artisan profile.'}
          </p>

          <Link
            href="/search"
            className="inline-flex items-center justify-center bg-terracotta-600 hover:bg-terracotta-700 text-white font-body font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
          >
            ← Browse artisans
          </Link>
        </div>
      </main>
    );
  }

  const icon =
    CATEGORY_ICONS[profile.tradeCategory?.toLowerCase()] || '🛠️';

  const categoryName = formatCategory(profile.tradeCategory);

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null;

  const rating =
    profile.ratingCount > 0
      ? profile.ratingAvg.toFixed(1)
      : null;

  const socials = [
    {
      key: 'instagram',
      label: 'Instagram',
      icon: '◎',
      handle: profile.socialMedia?.instagram,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: 'f',
      handle: profile.socialMedia?.facebook,
    },
    {
      key: 'tiktok',
      label: 'TikTok',
      icon: '♪',
      handle: profile.socialMedia?.tiktok,
    },
  ].filter((social) => social.handle);

  const portfolioPhotos = profile.portfolioPhotos || [];

  /*
   * Booking panel
   */
  const BookingPanel = ({
    mobile = false,
  }: {
    mobile?: boolean;
  }) => (
    <div
      className={`
        bg-white border border-teal-900/10
        ${mobile ? 'rounded-t-3xl' : 'rounded-3xl'}
        p-6 md:p-7 shadow-xl shadow-teal-900/5
      `}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-terracotta-600 font-semibold mb-2">
            Hire this artisan
          </p>

          <h3 className="font-display text-2xl text-teal-900">
            {categoryName}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-sand-50 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>

      {rating ? (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gold-500 text-lg">★</span>

          <span className="font-body font-semibold text-teal-900">
            {rating}
          </span>

          <span className="font-body text-sm text-teal-800/50">
            ({profile.ratingCount}{' '}
            {profile.ratingCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      ) : (
        <p className="font-body text-sm text-teal-800/50 mb-6">
          No reviews yet
        </p>
      )}

      {bookingSent ? (
        <div className="rounded-2xl bg-teal-900/5 border border-teal-900/10 p-5">
          <div className="w-10 h-10 rounded-full bg-teal-900 text-white flex items-center justify-center mb-3">
            ✓
          </div>

          <p className="font-body font-semibold text-teal-900 mb-1">
            Request sent successfully
          </p>

          <p className="font-body text-sm text-teal-800/60 leading-relaxed">
            Your booking request has been sent to this artisan.
          </p>
        </div>
      ) : showBookingForm ? (
        <form
          onSubmit={handleBookingSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="job-description"
              className="block font-body text-sm font-semibold text-teal-900 mb-2"
            >
              Tell the artisan about the job
            </label>

            <textarea
              id="job-description"
              required
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Example: I need help fixing a leaking pipe in my kitchen..."
              rows={5}
              className="
                w-full
                font-body
                text-sm
                text-teal-900
                placeholder:text-teal-800/35
                bg-sand-50
                border border-teal-900/10
                rounded-xl
                px-4 py-3
                resize-none
                focus:outline-none
                focus:border-terracotta-600
                focus:ring-4
                focus:ring-terracotta-600/10
                transition-all
              "
            />
          </div>

          {bookingError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="font-body text-sm text-red-600">
                {bookingError}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={bookingLoading}
              className="
                w-full
                bg-terracotta-600
                hover:bg-terracotta-700
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                font-body
                font-semibold
                px-5 py-3.5
                rounded-xl
                transition-all
                hover:-translate-y-0.5
                shadow-lg
                shadow-terracotta-600/15
              "
            >
              {bookingLoading
                ? 'Sending request...'
                : 'Send booking request'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowBookingForm(false);
                setBookingError('');
              }}
              className="
                w-full
                border border-teal-900/15
                hover:border-teal-900/30
                text-teal-900
                font-body
                font-medium
                px-5 py-3
                rounded-xl
                transition-colors
              "
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => setShowBookingForm(true)}
            className="
              w-full
              bg-terracotta-600
              hover:bg-terracotta-700
              text-white
              font-body
              font-semibold
              px-6 py-3.5
              rounded-xl
              transition-all
              hover:-translate-y-0.5
              shadow-lg
              shadow-terracotta-600/20
            "
          >
            Hire this artisan
          </button>

          <button
            type="button"
            className="
              w-full
              border border-teal-900/15
              hover:border-teal-900/30
              hover:bg-sand-50
              text-teal-900
              font-body
              font-semibold
              px-6 py-3.5
              rounded-xl
              transition-all
            "
          >
            Message artisan
          </button>

          <p className="font-body text-xs text-center text-teal-800/45 pt-2">
            You can discuss the job before confirming.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-sand-50 pb-24 lg:pb-0">

      {/* =========================================================
          TOP NAV / BREADCRUMB
      ========================================================= */}
      <div className="bg-white border-b border-teal-900/10">
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-4">
          <Link
            href="/search"
            className="
              inline-flex
              items-center
              gap-2
              font-body
              text-sm
              text-teal-800/55
              hover:text-terracotta-600
              transition-colors
            "
          >
            <span className="text-base">←</span>
            Back to artisans
          </Link>
        </div>
      </div>

      {/* =========================================================
          PROFILE HERO
      ========================================================= */}
      <section className="bg-white border-b border-teal-900/10">
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-8 md:py-12">

          <div className="flex flex-col lg:flex-row lg:items-center gap-7">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className="
                  w-28 h-28
                  md:w-36 md:h-36
                  rounded-3xl
                  bg-sand-50
                  border border-teal-900/10
                  flex items-center justify-center
                  text-5xl md:text-6xl
                  shadow-sm
                  overflow-hidden
                "
              >
                {icon}
              </div>

              {profile.isAvailable && (
                <span
                  className="
                    absolute
                    -bottom-2
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    bg-teal-900
                    text-white
                    font-body
                    text-xs
                    font-semibold
                    px-3
                    py-1.5
                    rounded-full
                    shadow-lg
                  "
                >
                  ● Available now
                </span>
              )}
            </div>

            {/* Main information */}
            <div className="flex-1 min-w-0">

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="
                    font-body
                    text-xs
                    uppercase
                    tracking-widest
                    font-semibold
                    text-terracotta-600
                  "
                >
                  {categoryName}
                </span>

                {profile.verificationStatus === 'verified' && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      bg-teal-900
                      text-white
                      font-body
                      text-xs
                      font-semibold
                      px-2.5
                      py-1
                      rounded-full
                    "
                  >
                    ✓ Verified
                  </span>
                )}
              </div>

              <h1
                className="
                  font-display
                  text-4xl
                  md:text-5xl
                  text-teal-900
                  leading-tight
                  mb-4
                "
              >
                {categoryName}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5">

                {rating ? (
                  <div className="inline-flex items-center gap-2">
                    <span className="text-gold-500 text-lg">
                      ★
                    </span>

                    <span className="font-body font-semibold text-teal-900">
                      {rating}
                    </span>

                    <span className="font-body text-sm text-teal-800/55">
                      {profile.ratingCount}{' '}
                      {profile.ratingCount === 1
                        ? 'review'
                        : 'reviews'}
                    </span>
                  </div>
                ) : (
                  <span className="font-body text-sm text-teal-800/50">
                    No reviews yet
                  </span>
                )}

                <span className="hidden sm:block w-1 h-1 rounded-full bg-teal-800/20" />

                <span className="font-body text-sm text-teal-800/60">
                  📍 Kano, Northern Nigeria
                </span>

                {memberSince && (
                  <>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-teal-800/20" />

                    <span className="font-body text-sm text-teal-800/60">
                      Member since {memberSince}
                    </span>
                  </>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 lg:hidden">
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="
                    bg-terracotta-600
                    hover:bg-terracotta-700
                    text-white
                    font-body
                    font-semibold
                    px-6 py-3
                    rounded-xl
                    transition-all
                    hover:-translate-y-0.5
                  "
                >
                  Hire this artisan
                </button>

                <button
                  type="button"
                  className="
                    border border-teal-900/15
                    hover:border-teal-900/30
                    text-teal-900
                    font-body
                    font-semibold
                    px-6 py-3
                    rounded-xl
                    transition-colors
                  "
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div
        className="
          max-w-6xl
          mx-auto
          px-5 md:px-6
          py-8 md:py-12
          grid
          grid-cols-1
          lg:grid-cols-[minmax(0,1fr)_360px]
          gap-8
          lg:gap-10
        "
      >

        {/* =====================================================
            LEFT COLUMN
        ===================================================== */}
        <div className="min-w-0 space-y-8">

          {/* ===================================================
              TRUST SUMMARY
          =================================================== */}
          <section>
            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4
                bg-white
                border
                border-teal-900/10
                rounded-2xl
                overflow-hidden
                shadow-sm
              "
            >

              <div className="p-5 border-r border-b md:border-b-0 border-teal-900/10">
                <p className="font-display text-2xl text-teal-900">
                  {rating || '—'}
                </p>

                <p className="font-body text-xs text-teal-800/50 mt-1">
                  Rating
                </p>
              </div>

              <div className="p-5 md:border-r border-b md:border-b-0 border-teal-900/10">
                <p className="font-display text-2xl text-teal-900">
                  {profile.ratingCount}
                </p>

                <p className="font-body text-xs text-teal-800/50 mt-1">
                  Reviews
                </p>
              </div>

              <div className="p-5 border-r border-teal-900/10">
                <p className="font-display text-2xl text-teal-900">
                  {profile.yearsExperience || '—'}
                </p>

                <p className="font-body text-xs text-teal-800/50 mt-1">
                  Years experience
                </p>
              </div>

              <div className="p-5">
                <p className="font-display text-2xl text-teal-900">
                  {profile.isAvailable ? 'Yes' : '—'}
                </p>

                <p className="font-body text-xs text-teal-800/50 mt-1">
                  Available now
                </p>
              </div>
            </div>
          </section>

          {/* ===================================================
              ABOUT
          =================================================== */}
          {profile.bio && (
            <section>
              <div className="mb-4">
                <p className="font-body text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1">
                  Get to know them
                </p>

                <h2 className="font-display text-3xl text-teal-900">
                  About
                </h2>
              </div>

              <div
                className="
                  bg-white
                  border border-teal-900/10
                  rounded-2xl
                  p-6 md:p-7
                  shadow-sm
                "
              >
                <p className="font-body text-teal-800/75 leading-8">
                  {profile.bio}
                </p>
              </div>
            </section>
          )}

          {/* ===================================================
              SERVICES
          =================================================== */}
          {profile.skills?.length > 0 && (
            <section>
              <div className="mb-4">
                <p className="font-body text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1">
                  What they do
                </p>

                <h2 className="font-display text-3xl text-teal-900">
                  Services offered
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.skills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="
                      group
                      bg-white
                      border border-teal-900/10
                      hover:border-terracotta-600/40
                      rounded-2xl
                      p-5
                      shadow-sm
                      hover:shadow-md
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          w-11 h-11
                          rounded-xl
                          bg-sand-50
                          flex items-center justify-center
                          text-xl
                          shrink-0
                          group-hover:scale-105
                          transition-transform
                        "
                      >
                        {icon}
                      </div>

                      <div>
                        <p className="font-body font-semibold text-teal-900">
                          {skill}
                        </p>

                        <p className="font-body text-xs text-teal-800/45 mt-1">
                          Professional service
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ===================================================
              EXPERIENCE
          =================================================== */}
          {profile.yearsExperience > 0 && (
            <section>
              <div className="mb-4">
                <p className="font-body text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1">
                  Experience
                </p>

                <h2 className="font-display text-3xl text-teal-900">
                  Professional experience
                </h2>
              </div>

              <div
                className="
                  bg-teal-900
                  rounded-2xl
                  p-6 md:p-8
                  relative
                  overflow-hidden
                "
              >
                <div
                  className="
                    absolute
                    -right-16
                    -top-16
                    w-48
                    h-48
                    rounded-full
                    bg-terracotta-600/10
                    blur-2xl
                  "
                />

                <div className="relative flex items-center gap-5">
                  <div
                    className="
                      w-16 h-16
                      rounded-2xl
                      bg-terracotta-600
                      text-white
                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <span className="font-display text-2xl">
                      {profile.yearsExperience}
                    </span>
                  </div>

                  <div>
                    <p className="font-display text-xl text-white">
                      Years of experience
                    </p>

                    <p className="font-body text-sm text-white/60 mt-1">
                      Experienced in {categoryName.toLowerCase()} and related work.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================
              PORTFOLIO
          =================================================== */}
          <section>
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <p className="font-body text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1">
                  Real work
                </p>

                <h2 className="font-display text-3xl text-teal-900">
                  Portfolio
                </h2>
              </div>

              {portfolioPhotos.length > 0 && (
                <span className="font-body text-xs text-teal-800/45">
                  {portfolioPhotos.length}{' '}
                  {portfolioPhotos.length === 1
                    ? 'project'
                    : 'projects'}
                </span>
              )}
            </div>

            {portfolioPhotos.length === 0 ? (
              <div
                className="
                  bg-white
                  border border-dashed border-teal-900/15
                  rounded-2xl
                  p-10
                  text-center
                "
              >
                <div className="text-4xl mb-3">📸</div>

                <p className="font-body font-semibold text-teal-900 mb-1">
                  No portfolio photos yet
                </p>

                <p className="font-body text-sm text-teal-800/50">
                  This artisan has not uploaded examples of their work yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                {portfolioPhotos.map((url, index) => (
                  <button
                    key={`${url}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(url)}
                    className="
                      group
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-2xl
                      bg-teal-900/5
                      border border-teal-900/10
                      shadow-sm
                      focus:outline-none
                      focus:ring-4
                      focus:ring-terracotta-600/20
                    "
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Work sample ${index + 1}`}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-teal-900/0
                        group-hover:bg-teal-900/25
                        transition-colors
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <span
                        className="
                          opacity-0
                          group-hover:opacity-100
                          bg-white
                          text-teal-900
                          font-body
                          text-xs
                          font-semibold
                          px-3
                          py-2
                          rounded-full
                          transition-opacity
                        "
                      >
                        View work
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* ===================================================
              REVIEWS
          =================================================== */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
              <div>
                <p className="font-body text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1">
                  Customer feedback
                </p>

                <h2 className="font-display text-3xl text-teal-900">
                  Reviews
                </h2>
              </div>

              {rating && (
                <div className="flex items-center gap-2">
                  <span className="text-gold-500 text-xl">
                    ★
                  </span>

                  <span className="font-body font-bold text-teal-900">
                    {rating}
                  </span>

                  <span className="font-body text-sm text-teal-800/50">
                    from {profile.ratingCount}{' '}
                    {profile.ratingCount === 1
                      ? 'review'
                      : 'reviews'}
                  </span>
                </div>
              )}
            </div>

            {reviews.length === 0 ? (
              <div
                className="
                  bg-white
                  border border-teal-900/10
                  rounded-2xl
                  p-8
                  text-center
                  shadow-sm
                "
              >
                <div className="text-4xl mb-3">⭐</div>

                <p className="font-body font-semibold text-teal-900 mb-1">
                  No reviews yet
                </p>

                <p className="font-body text-sm text-teal-800/50">
                  Be one of the first customers to leave a review.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <article
                    key={review._id}
                    className="
                      bg-white
                      border border-teal-900/10
                      rounded-2xl
                      p-5 md:p-6
                      shadow-sm
                      hover:shadow-md
                      transition-shadow
                    "
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            w-10 h-10
                            rounded-full
                            bg-sand-50
                            border border-teal-900/10
                            flex items-center justify-center
                            text-sm
                          "
                        >
                          👤
                        </div>

                        <div>
                          <p className="font-body text-sm font-semibold text-teal-900">
                            Amana customer
                          </p>

                          <p className="font-body text-xs text-teal-800/45">
                            Customer review
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          bg-gold-400/10
                          text-gold-500
                          font-body
                          text-sm
                          font-bold
                          px-3
                          py-1.5
                          rounded-full
                        "
                      >
                        ★ {review.rating}
                      </span>
                    </div>

                    {review.comment && (
                      <p className="font-body text-sm md:text-base text-teal-800/75 leading-7">
                        “{review.comment}”
                      </p>
                    )}

                    <p className="font-body text-xs text-teal-800/40 mt-4">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* ===================================================
              SOCIAL MEDIA
          =================================================== */}
          {socials.length > 0 && (
            <section>
              <div className="mb-4">
                <p className="font-body text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1">
                  More from this artisan
                </p>

                <h2 className="font-display text-3xl text-teal-900">
                  Follow their work
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.key}
                    href={getSocialUrl(
                      social.key,
                      social.handle!
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      bg-white
                      border border-teal-900/10
                      hover:border-terracotta-600/40
                      rounded-2xl
                      p-5
                      shadow-sm
                      hover:shadow-md
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          w-11 h-11
                          rounded-xl
                          bg-sand-50
                          text-teal-900
                          flex items-center justify-center
                          font-bold
                          text-xl
                          group-hover:bg-terracotta-600
                          group-hover:text-white
                          transition-colors
                        "
                      >
                        {social.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="font-body font-semibold text-teal-900">
                          {social.label}
                        </p>

                        <p className="font-body text-xs text-teal-800/45 truncate mt-1">
                          {social.handle}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* ===================================================
              LOCATION
          =================================================== */}
          <section>
            <div className="mb-4">
              <p className="font-body text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1">
                Service area
              </p>

              <h2 className="font-display text-3xl text-teal-900">
                Location
              </h2>
            </div>

            <div
              className="
                bg-white
                border border-teal-900/10
                rounded-2xl
                overflow-hidden
                shadow-sm
              "
            >
              {/* Map placeholder */}
              <div
                className="
                  h-52
                  md:h-64
                  bg-teal-900
                  relative
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    opacity-10
                    bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)]
                    bg-[length:24px_24px]
                  "
                />

                <div className="relative text-center">
                  <div
                    className="
                      w-14 h-14
                      mx-auto
                      rounded-full
                      bg-terracotta-600
                      text-white
                      flex
                      items-center
                      justify-center
                      text-2xl
                      shadow-xl
                      shadow-black/20
                      animate-pulse
                    "
                  >
                    📍
                  </div>

                  <p className="font-body font-semibold text-white mt-3">
                    Kano
                  </p>

                  <p className="font-body text-xs text-white/50 mt-1">
                    Approximate service area
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="font-body font-semibold text-teal-900 mb-1">
                  Kano, Northern Nigeria
                </p>

                <p className="font-body text-sm text-teal-800/55 leading-6">
                  This shows the artisan&apos;s general service area.
                  The exact job location should only be shared when
                  arranging a booking.
                </p>
              </div>
            </div>
          </section>

          {/* ===================================================
              SAFETY
          =================================================== */}
          <section>
            <div
              className="
                bg-terracotta-50
                border border-terracotta-600/15
                rounded-2xl
                p-6 md:p-7
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-white
                    flex items-center
                    justify-center
                    text-xl
                    shrink-0
                    border border-terracotta-600/10
                  "
                >
                  🛡️
                </div>

                <div>
                  <h2 className="font-display text-xl text-teal-900 mb-2">
                    Stay safe with Amana
                  </h2>

                  <p className="font-body text-sm text-teal-800/65 leading-6 mb-4">
                    Confirm the job details before work begins and
                    keep your booking information available. Never
                    share passwords or OTP codes with anyone.
                  </p>

                  <Link
                    href="/safety"
                    className="
                      inline-flex
                      font-body
                      text-sm
                      font-semibold
                      text-terracotta-600
                      hover:text-terracotta-700
                      transition-colors
                    "
                  >
                    Read Safety & Trust guide →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            RIGHT COLUMN — STICKY HIRE CARD
        ===================================================== */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <BookingPanel />

            {/* Small trust card */}
            <div
              className="
                mt-4
                bg-white
                border border-teal-900/10
                rounded-2xl
                p-5
              "
            >
              <p className="font-body text-xs uppercase tracking-widest text-teal-800/40 font-semibold mb-4">
                Why use Amana?
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-base">👤</span>

                  <div>
                    <p className="font-body text-sm font-semibold text-teal-900">
                      Artisan profiles
                    </p>

                    <p className="font-body text-xs text-teal-800/50 mt-1">
                      See skills and examples of work.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base">⭐</span>

                  <div>
                    <p className="font-body text-sm font-semibold text-teal-900">
                      Customer reviews
                    </p>

                    <p className="font-body text-xs text-teal-800/50 mt-1">
                      Learn from previous customer experiences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base">📍</span>

                  <div>
                    <p className="font-body text-sm font-semibold text-teal-900">
                      Local artisans
                    </p>

                    <p className="font-body text-xs text-teal-800/50 mt-1">
                      Find skilled people around your area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* =========================================================
          MOBILE BOTTOM BAR
      ========================================================= */}
      <div
        className="
          lg:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-40
          bg-white
          border-t border-teal-900/10
          p-3
          shadow-2xl
          shadow-teal-900/10
        "
      >
        {bookingSent ? (
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="w-7 h-7 rounded-full bg-teal-900 text-white flex items-center justify-center text-sm">
              ✓
            </span>

            <p className="font-body text-sm font-semibold text-teal-900">
              Booking request sent
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              className="
                flex-1
                border border-teal-900/15
                text-teal-900
                font-body
                font-semibold
                px-4 py-3
                rounded-xl
              "
            >
              Message
            </button>

            <button
              type="button"
              onClick={() => setShowBookingForm(true)}
              className="
                flex-[1.4]
                bg-terracotta-600
                hover:bg-terracotta-700
                text-white
                font-body
                font-semibold
                px-4 py-3
                rounded-xl
                transition-colors
              "
            >
              Hire artisan
            </button>
          </div>
        )}
      </div>

      {/* =========================================================
          MOBILE BOOKING SHEET
      ========================================================= */}
      {showBookingForm && (
        <div
          className="
            lg:hidden
            fixed
            inset-0
            z-50
            bg-teal-900/50
            backdrop-blur-sm
            flex
            items-end
          "
          onClick={() => {
            setShowBookingForm(false);
            setBookingError('');
          }}
        >
          <div
            className="w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <BookingPanel mobile />
          </div>
        </div>
      )}

      {/* =========================================================
          PORTFOLIO LIGHTBOX
      ========================================================= */}
      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-teal-900/90
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-5
          "
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="
              absolute
              top-5
              right-5
              w-11
              h-11
              rounded-full
              bg-white/10
              hover:bg-white/20
              text-white
              flex
              items-center
              justify-center
              text-xl
              transition-colors
            "
            aria-label="Close image"
          >
            ×
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage}
            alt="Artisan work"
            onClick={(e) => e.stopPropagation()}
            className="
              max-w-full
              max-h-[85vh]
              object-contain
              rounded-2xl
              shadow-2xl
            "
          />
        </div>
      )}
    </main>
  );
}