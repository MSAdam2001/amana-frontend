'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  getMyBookings,
  updateBookingStatus,
  MyBooking,
} from '@/lib/api/bookings';

import { createReview } from '@/lib/api/reviews';

import {
  getMyArtisanProfile,
  updateMyArtisanProfile,
  uploadPhoto,
  ArtisanProfileDetail,
} from '@/lib/api/profiles';

/* =========================================================
   ICONS
========================================================= */

function Icon({
  name,
  size = 20,
}: {
  name:
    | 'home'
    | 'briefcase'
    | 'message'
    | 'user'
    | 'image'
    | 'star'
    | 'settings'
    | 'logout'
    | 'chevron'
    | 'menu'
    | 'close'
    | 'plus'
    | 'check'
    | 'clock'
    | 'location'
    | 'external'
    | 'edit'
    | 'trash'
    | 'upload'
    | 'eye'
    | 'bell'
    | 'shield'
    | 'help'
    | 'save'
    | 'arrow';
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      );

    case 'briefcase':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );

    case 'message':
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2v-5.5A7.5 7.5 0 1 1 20 11.5Z" />
        </svg>
      );

    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    case 'image':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9" r="1.5" />
          <path d="m21 15-4.5-4.5L8 19" />
        </svg>
      );

    case 'star':
      return (
        <svg {...common}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );

    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L9 6.6l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.1 1.4Z" />
        </svg>
      );

    case 'logout':
      return (
        <svg {...common}>
          <path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
          <path d="M14 8l4 4-4 4" />
          <path d="M18 12H9" />
        </svg>
      );

    case 'chevron':
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );

    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );

    case 'close':
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );

    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case 'location':
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case 'external':
      return (
        <svg {...common}>
          <path d="M14 4h6v6" />
          <path d="M20 4 10 14" />
          <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
        </svg>
      );

    case 'edit':
      return (
        <svg {...common}>
          <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
          <path d="m14.5 7.5 2 2" />
        </svg>
      );

    case 'trash':
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M10 11v5M14 11v5" />
          <path d="M6 7l1 14h10l1-14" />
          <path d="M9 7V4h6v3" />
        </svg>
      );

    case 'upload':
      return (
        <svg {...common}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );

    case 'eye':
      return (
        <svg {...common}>
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );

    case 'bell':
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case 'help':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1 .8-1.7 1.2-1.7 2.7" />
          <path d="M12 17h.01" />
        </svg>
      );

    case 'save':
      return (
        <svg {...common}>
          <path d="M5 3h11l3 3v15H5z" />
          <path d="M8 3v6h8V3" />
          <path d="M8 21v-7h8v7" />
        </svg>
      );

    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   TYPES
========================================================= */

type Section =
  | 'overview'
  | 'jobs'
  | 'messages'
  | 'profile'
  | 'portfolio'
  | 'reviews'
  | 'settings';

type SettingsState = {
  emailNotifications: boolean;
  bookingNotifications: boolean;
  messageNotifications: boolean;
  profileVisible: boolean;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function DashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<{
    userId: string;
    role: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('overview');

  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [myProfile, setMyProfile] =
    useState<ArtisanProfileDetail | null>(null);

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  const [bio, setBio] = useState('');
  const [yearsExperience, setYearsExperience] = useState(0);
  const [skillsText, setSkillsText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');

  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  const [settings, setSettings] = useState<SettingsState>({
    emailNotifications: true,
    bookingNotifications: true,
    messageNotifications: true,
    profileVisible: true,
  });

  /* =========================================================
     AUTH
  ========================================================= */

  useEffect(() => {
    const token = localStorage.getItem('amana_token');

    if (!token) {
      router.push('/login');
      return;
    }
fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
      .then((res) => {
        if (!res.ok) {
          throw new Error('Session expired');
        }

        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('amana_token');
        router.push('/login');
      });
  }, [router]);

  /* =========================================================
     LOAD BOOKINGS
  ========================================================= */

  useEffect(() => {
    if (!user) return;

    const role = user.role === 'artisan' ? 'artisan' : 'customer';

    setBookingsLoading(true);

    getMyBookings(role)
      .then((data) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setBookingsLoading(false));
  }, [user]);

  /* =========================================================
     LOAD ARTISAN PROFILE
  ========================================================= */

  useEffect(() => {
    if (!user || user.role !== 'artisan') {
      setProfileLoading(false);
      return;
    }

    getMyArtisanProfile()
      .then((profile) => {
        setMyProfile(profile);

        setBio(profile.bio || '');
        setYearsExperience(profile.yearsExperience || 0);
        setSkillsText(profile.skills?.join(', ') || '');
        setPhotos(profile.portfolioPhotos || []);
      })
      .catch(() => {})
      .finally(() => setProfileLoading(false));
  }, [user]);

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const isArtisan = user?.role === 'artisan';

  const statusCounts = useMemo(() => {
    return bookings.reduce<Record<string, number>>((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {});
  }, [bookings]);

  const profileCompletion = useMemo(() => {
    if (!myProfile) return 0;

    let completed = 0;
    const total = 6;

    if (bio.trim().length >= 30) completed++;
    if (yearsExperience > 0) completed++;
    if (skillsText.trim()) completed++;
    if (photos.length > 0) completed++;
    if (myProfile.isAvailable !== undefined) completed++;
    if (myProfile._id) completed++;

    return Math.round((completed / total) * 100);
  }, [myProfile, bio, yearsExperience, skillsText, photos]);

  const newRequests = statusCounts.requested || 0;

  const activeJobs =
    (statusCounts.accepted || 0) + (statusCounts.in_progress || 0);

  const completedJobs = statusCounts.completed || 0;

  /* =========================================================
     NAVIGATION
  ========================================================= */

  function navigateTo(section: Section) {
    setActiveSection(section);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /* =========================================================
     LOGOUT
  ========================================================= */

  function handleLogout() {
    localStorage.removeItem('amana_token');
    router.push('/login');
  }

  /* =========================================================
     AVAILABILITY
  ========================================================= */

  async function handleAvailabilityToggle() {
    if (!myProfile) return;

    const newValue = !myProfile.isAvailable;

    setAvailabilityLoading(true);
    setAvailabilityError('');

    try {
      const updated = await updateMyArtisanProfile({
        isAvailable: newValue,
      });

      setMyProfile(updated);
    } catch (err: any) {
      setAvailabilityError(
        err.message || 'Failed to update availability'
      );
    } finally {
      setAvailabilityLoading(false);
    }
  }

  /* =========================================================
     BOOKING STATUS
  ========================================================= */

  async function handleStatusChange(
    bookingId: string,
    newStatus: string
  ) {
    setActionError('');
    setUpdatingId(bookingId);

    try {
      await updateBookingStatus(bookingId, newStatus);

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: newStatus,
              }
            : booking
        )
      );
    } catch (err: any) {
      setActionError(
        err.message || 'Failed to update booking'
      );
    } finally {
      setUpdatingId(null);
    }
  }

  /* =========================================================
     PROFILE SAVE
  ========================================================= */

  async function handleProfileSave(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setProfileSaving(true);
    setProfileSaved(false);
    setProfileError('');

    const skills = skillsText
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    try {
      const updated = await updateMyArtisanProfile({
        bio,
        yearsExperience,
        skills,
        portfolioPhotos: photos,
      });

      setMyProfile(updated);

      setProfileSaved(true);

      setTimeout(() => {
        setProfileSaved(false);
      }, 3000);
    } catch (err: any) {
      setProfileError(
        err.message || 'Failed to save your profile.'
      );
    } finally {
      setProfileSaving(false);
    }
  }

  /* =========================================================
     PHOTO UPLOAD
  ========================================================= */

  async function handleFileSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image must be smaller than 10MB.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const url = await uploadPhoto(file);

      setPhotos((previous) => [...previous, url]);
    } catch (err: any) {
      setUploadError(
        err.message || 'Failed to upload photo.'
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  /* =========================================================
     REMOVE PHOTO
  ========================================================= */

  function removePhoto(index: number) {
    setPhotos((previous) =>
      previous.filter((_, i) => i !== index)
    );
  }

  /* =========================================================
     REVIEWS
  ========================================================= */

  function openReviewForm(bookingId: string) {
    setReviewingId(bookingId);
    setReviewRating(5);
    setReviewComment('');
    setReviewError('');
  }

  async function handleReviewSubmit(
    event: React.FormEvent,
    bookingId: string
  ) {
    event.preventDefault();

    setReviewSubmitting(true);
    setReviewError('');

    try {
      await createReview({
        bookingId,
        rating: reviewRating,
        comment: reviewComment || undefined,
      });

      setReviewedIds((previous) => [
        ...previous,
        bookingId,
      ]);

      setReviewingId(null);
    } catch (err: any) {
      setReviewError(
        err.message || 'Failed to submit review'
      );
    } finally {
      setReviewSubmitting(false);
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F3E8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-[#0F4C45]/20 border-t-[#C85A3F] animate-spin" />

          <p className="text-sm text-[#0F4C45]/70">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     NAV ITEMS
  ========================================================= */

  const navigation: {
    id: Section;
    label: string;
    icon: Parameters<typeof Icon>[0]['name'];
    badge?: number;
  }[] = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: 'home',
    },
    {
      id: 'jobs',
      label: 'Jobs',
      icon: 'briefcase',
      badge: newRequests || undefined,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'message',
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: 'user',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: 'image',
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: 'star',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
    },
  ];

  /* =========================================================
     SIDEBAR
  ========================================================= */

  const Sidebar = () => (
    <>
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#083A35]/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed z-50 left-0 top-0 bottom-0 w-[270px]
          bg-[#083A35] text-white
          flex flex-col
          transform transition-transform duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >
        {/* LOGO */}

        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          <button
            onClick={() => navigateTo('overview')}
            className="flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-xl bg-[#C85A3F] flex items-center justify-center">
              <span className="font-display text-xl">
                A
              </span>
            </div>

            <span className="font-display text-2xl">
              Amana
            </span>
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <Icon name="close" size={21} />
          </button>
        </div>

        {/* USER MINI CARD */}

        <div className="px-5 py-5">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-[#D5A63A] text-[#083A35] flex items-center justify-center font-semibold">
                A
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  Artisan Account
                </p>

                <p className="text-xs text-white/50 mt-0.5">
                  {isArtisan
                    ? 'Professional Artisan'
                    : 'Customer'}
                </p>
              </div>
            </div>

            {isArtisan && myProfile && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">
                    Profile strength
                  </span>

                  <span className="text-[#D5A63A] font-semibold">
                    {profileCompletion}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#D5A63A] rounded-full transition-all duration-700"
                    style={{
                      width: `${profileCompletion}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NAV */}

        <nav className="px-3 flex-1 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.18em] text-white/35">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const active =
                activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`
                    w-full flex items-center gap-3
                    px-3 py-3 rounded-xl
                    text-sm
                    transition-all duration-200
                    ${
                      active
                        ? 'bg-white text-[#083A35] shadow-lg'
                        : 'text-white/65 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon
                    name={item.icon}
                    size={18}
                  />

                  <span className="flex-1 text-left">
                    {item.label}
                  </span>

                  {item.badge ? (
                    <span
                      className={`
                        min-w-5 h-5 px-1.5
                        rounded-full
                        flex items-center justify-center
                        text-[10px] font-bold
                        ${
                          active
                            ? 'bg-[#C85A3F] text-white'
                            : 'bg-[#C85A3F] text-white'
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </nav>

        {/* BOTTOM */}

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/help"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <Icon name="help" size={18} />
            Help & Support
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <Icon name="logout" size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );

  /* =========================================================
     TOP BAR
  ========================================================= */

  const TopBar = () => (
    <header className="sticky top-0 z-30 h-20 bg-[#F8F3E8]/90 backdrop-blur-xl border-b border-[#0F4C45]/10">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-10 w-10 rounded-xl border border-[#0F4C45]/10 bg-white flex items-center justify-center text-[#0F4C45]"
          >
            <Icon name="menu" size={20} />
          </button>

          <div>
            <p className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-[#C85A3F] font-semibold">
              Amana workspace
            </p>

            <h1 className="font-display text-xl sm:text-2xl text-[#083A35]">
              {activeSection === 'overview'
                ? 'Dashboard'
                : activeSection === 'jobs'
                ? 'Jobs'
                : activeSection === 'messages'
                ? 'Messages'
                : activeSection === 'profile'
                ? 'My Profile'
                : activeSection === 'portfolio'
                ? 'Portfolio'
                : activeSection === 'reviews'
                ? 'Reviews'
                : 'Settings'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="h-10 w-10 rounded-xl border border-[#0F4C45]/10 bg-white text-[#0F4C45] flex items-center justify-center hover:border-[#0F4C45]/30 transition"
            title="Notifications"
          >
            <Icon name="bell" size={18} />
          </button>

          {isArtisan && myProfile && (
            <button
              onClick={() =>
                window.open(
                  `/artisan/${myProfile._id}`,
                  '_blank'
                )
              }
              className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-xl bg-[#0F4C45] text-white text-sm hover:bg-[#083A35] transition"
            >
              <Icon name="eye" size={16} />
              View profile
            </button>
          )}
        </div>
      </div>
    </header>
  );

  /* =========================================================
     OVERVIEW
  ========================================================= */

  function OverviewSection() {
    return (
      <div className="space-y-6 animate-page">
        {/* HERO */}

        <section className="relative overflow-hidden rounded-3xl bg-[#0F4C45] text-white p-6 sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute -right-8 -bottom-24 w-72 h-72 rounded-full border border-white/5" />

          <div className="relative max-w-2xl">
            <p className="text-[#D5A63A] text-xs uppercase tracking-[0.18em] font-semibold mb-3">
              Welcome to your workspace
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Build your reputation.
              <br />
              Grow your work.
            </h2>

            <p className="mt-4 text-white/65 max-w-xl text-sm sm:text-base leading-7">
              Manage your customer requests, showcase your
              work, update your profile and keep track of
              your jobs from one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('jobs')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C85A3F] hover:bg-[#A94632] text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                View jobs
                <Icon name="arrow" size={16} />
              </button>

              <button
  onClick={() => navigateTo('profile')}
  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-semibold transition"
>
  Edit profile
</button>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            label="New requests"
            value={newRequests}
            icon="briefcase"
            action={() => navigateTo('jobs')}
          />

          <StatCard
            label="Active jobs"
            value={activeJobs}
            icon="clock"
            action={() => navigateTo('jobs')}
          />

          <StatCard
            label="Completed"
            value={completedJobs}
            icon="check"
            action={() => navigateTo('jobs')}
          />

          <StatCard
            label="Rating"
            value={
              myProfile && myProfile.ratingCount > 0
                ? myProfile.ratingAvg.toFixed(1)
                : '—'
            }
            icon="star"
            suffix={
              myProfile && myProfile.ratingCount > 0
                ? `/${myProfile.ratingCount}`
                : ''
            }
            action={() => navigateTo('reviews')}
          />
        </section>

        {/* PROFILE COMPLETION */}

        {isArtisan && myProfile && (
          <section className="grid lg:grid-cols-[1.4fr_0.6fr] gap-5">
            <div className="bg-white rounded-3xl border border-[#0F4C45]/10 p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#C85A3F] font-semibold">
                    Profile strength
                  </p>

                  <h3 className="font-display text-2xl text-[#083A35] mt-2">
                    Complete your profile
                  </h3>

                  <p className="text-sm text-[#60736F] mt-2 max-w-xl leading-6">
                    A complete profile gives customers more
                    information before they decide to contact
                    you.
                  </p>
                </div>

                <div className="relative h-16 w-16 shrink-0">
                  <svg
                    viewBox="0 0 36 36"
                    className="h-full w-full -rotate-90"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-[#0F4C45]/10"
                    />

                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${profileCompletion}, 100`}
                      pathLength="100"
                      className="text-[#C85A3F]"
                    />
                  </svg>

                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#083A35]">
                    {profileCompletion}%
                  </span>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <CompletionItem
                  complete={bio.trim().length >= 30}
                  label="Professional description"
                />

                <CompletionItem
                  complete={yearsExperience > 0}
                  label="Years of experience"
                />

                <CompletionItem
                  complete={skillsText.trim().length > 0}
                  label="Skills and services"
                />

                <CompletionItem
                  complete={photos.length > 0}
                  label="Portfolio photos"
                />
              </div>

              <button
                onClick={() => navigateTo('profile')}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C85A3F] hover:text-[#A94632]"
              >
                Improve your profile
                <Icon name="arrow" size={15} />
              </button>
            </div>

            {/* AVAILABILITY */}

            <div className="bg-white rounded-3xl border border-[#0F4C45]/10 p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.16em] text-[#C85A3F] font-semibold">
                Availability
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${
                    myProfile.isAvailable
                      ? 'bg-[#3E9B6F] animate-pulse'
                      : 'bg-[#9AA9A5]'
                  }`}
                />

                <span className="font-semibold text-[#083A35]">
                  {myProfile.isAvailable
                    ? 'Available for work'
                    : 'Currently unavailable'}
                </span>
              </div>

              <p className="text-sm text-[#60736F] leading-6 mt-4">
                Let customers know whether you are currently
                accepting new work.
              </p>

              <button
                onClick={handleAvailabilityToggle}
                disabled={availabilityLoading}
                className={`
                  mt-6 w-full py-3 rounded-xl text-sm font-semibold transition
                  ${
                    myProfile.isAvailable
                      ? 'bg-[#0F4C45] text-white hover:bg-[#083A35]'
                      : 'border border-[#0F4C45]/20 text-[#083A35] hover:border-[#0F4C45]'
                  }
                `}
              >
                {availabilityLoading
                  ? 'Updating...'
                  : myProfile.isAvailable
                  ? 'Mark unavailable'
                  : 'Mark available'}
              </button>

              {availabilityError && (
                <p className="mt-3 text-xs text-red-600">
                  {availabilityError}
                </p>
              )}
            </div>
          </section>
        )}

        {/* RECENT JOBS */}

        <section className="bg-white rounded-3xl border border-[#0F4C45]/10 overflow-hidden">
          <div className="px-6 py-5 border-b border-[#0F4C45]/10 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#C85A3F] font-semibold">
                Recent activity
              </p>

              <h3 className="font-display text-2xl text-[#083A35] mt-1">
                Recent jobs
              </h3>
            </div>

            <button
              onClick={() => navigateTo('jobs')}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#C85A3F]"
            >
              View all
              <Icon name="chevron" size={15} />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {bookingsLoading ? (
              <LoadingBlock />
            ) : bookings.length === 0 ? (
              <EmptyState
                icon="briefcase"
                title={
                  isArtisan
                    ? 'No job requests yet'
                    : 'No bookings yet'
                }
                description={
                  isArtisan
                    ? 'When customers request your services, their requests will appear here.'
                    : 'Your requested services will appear here.'
                }
              />
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 4).map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    isArtisan={isArtisan}
                    updatingId={updatingId}
                    onStatusChange={handleStatusChange}
                    onReview={openReviewForm}
                    reviewedIds={reviewedIds}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================
     JOBS
  ========================================================= */

  function JobsSection() {
    return (
      <div className="space-y-6 animate-page">
        <SectionHeader
          eyebrow="Work management"
          title={
            isArtisan
              ? 'Manage your jobs'
              : 'Your bookings'
          }
          description={
            isArtisan
              ? 'Review customer requests, accept jobs and keep your work moving.'
              : 'Track the services you have requested.'
          }
        />

        {actionError && (
          <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {actionError}
          </div>
        )}

        {/* JOB FILTER SUMMARY */}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MiniStat
            label="Requested"
            value={statusCounts.requested || 0}
          />

          <MiniStat
            label="Accepted"
            value={statusCounts.accepted || 0}
          />

          <MiniStat
            label="In progress"
            value={statusCounts.in_progress || 0}
          />

          <MiniStat
            label="Completed"
            value={statusCounts.completed || 0}
          />
        </div>

        <section className="bg-white rounded-3xl border border-[#0F4C45]/10 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#0F4C45]/10">
            <h3 className="font-display text-2xl text-[#083A35]">
              {isArtisan
                ? 'Customer requests'
                : 'Booking history'}
            </h3>
          </div>

          <div className="p-4 sm:p-6">
            {bookingsLoading ? (
              <LoadingBlock />
            ) : bookings.length === 0 ? (
              <EmptyState
                icon="briefcase"
                title="Nothing here yet"
                description={
                  isArtisan
                    ? 'New customer requests will appear here.'
                    : 'Your booking activity will appear here.'
                }
              />
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    isArtisan={isArtisan}
                    updatingId={updatingId}
                    onStatusChange={handleStatusChange}
                    onReview={openReviewForm}
                    reviewedIds={reviewedIds}
                    reviewingId={reviewingId}
                    reviewRating={reviewRating}
                    setReviewRating={setReviewRating}
                    reviewComment={reviewComment}
                    setReviewComment={setReviewComment}
                    reviewSubmitting={reviewSubmitting}
                    reviewError={reviewError}
                    onSubmitReview={handleReviewSubmit}
                    onCancelReview={() =>
                      setReviewingId(null)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================
     MESSAGES
  ========================================================= */

  function MessagesSection() {
    return (
      <div className="space-y-6 animate-page">
        <SectionHeader
          eyebrow="Communication"
          title="Messages"
          description="Communicate with customers about their work and bookings."
        />

        <section className="bg-white rounded-3xl border border-[#0F4C45]/10 min-h-[500px] flex items-center justify-center p-8">
          <EmptyState
            icon="message"
            title="No conversations yet"
            description="Customer conversations will appear here when messaging is connected to your account."
            actionLabel="Go to jobs"
            onAction={() => navigateTo('jobs')}
          />
        </section>
      </div>
    );
  }

  /* =========================================================
     PROFILE
  ========================================================= */

  function ProfileSection() {
    if (!isArtisan) {
      return (
        <div className="space-y-6 animate-page">
          <SectionHeader
            eyebrow="Your account"
            title="My Profile"
            description="Your customer profile settings."
          />

          <section className="bg-white rounded-3xl border border-[#0F4C45]/10 p-8">
            <EmptyState
              icon="user"
              title="Customer profile"
              description="Your customer profile tools can be managed here."
            />
          </section>
        </div>
      );
    }

    if (profileLoading) {
      return <LoadingBlock />;
    }

    return (
      <div className="space-y-6 animate-page">
        <SectionHeader
          eyebrow="Public identity"
          title="Edit your profile"
          description="Tell customers who you are, what you do and why they should choose your work."
        />

        <form
          onSubmit={handleProfileSave}
          className="space-y-6"
        >
          {/* PROFILE PREVIEW */}

          <section className="bg-[#0F4C45] rounded-3xl p-6 sm:p-8 text-white overflow-hidden relative">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-[#D5A63A] text-[#083A35] flex items-center justify-center text-2xl font-display">
                  A
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">
                    Public profile
                  </p>

                  <h3 className="font-display text-2xl mt-1">
                    Your artisan profile
                  </h3>

                  <p className="text-sm text-white/60 mt-1">
                    Customers can view your work and contact you.
                  </p>
                </div>
              </div>

              {myProfile && (
                <Link
                  href={`/artisan/${myProfile._id}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-[#083A35] text-sm font-semibold hover:bg-[#F8F3E8] transition"
                >
                  <Icon name="external" size={16} />
                  View public profile
                </Link>
              )}
            </div>
          </section>

          {/* ABOUT */}

          <section className="bg-white rounded-3xl border border-[#0F4C45]/10 p-6 sm:p-8">
            <FormTitle
              title="Professional information"
              description="Give customers a clear picture of your experience and the work you provide."
            />

            <div className="mt-6 space-y-6">
              <div>
                <label className="form-label">
                  About your work
                </label>

                <textarea
                  value={bio}
                  onChange={(event) =>
                    setBio(event.target.value)
                  }
                  rows={7}
                  placeholder="Tell customers about your experience, the services you provide, the type of jobs you handle and what makes your work valuable."
                  className="form-input resize-y"
                />

                <div className="mt-2 flex justify-between text-xs text-[#60736F]">
                  <span>
                    Write naturally and be specific.
                  </span>

                  <span>{bio.length} characters</span>
                </div>
              </div>

              <div className="max-w-xs">
                <label className="form-label">
                  Years of experience
                </label>

                <input
                  type="number"
                  min={0}
                  max={100}
                  value={yearsExperience}
                  onChange={(event) =>
                    setYearsExperience(
                      parseInt(event.target.value) || 0
                    )
                  }
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">
                  Skills and services
                </label>

                <input
                  type="text"
                  value={skillsText}
                  onChange={(event) =>
                    setSkillsText(event.target.value)
                  }
                  placeholder="Pipe repair, Installation, Emergency callout, Water systems"
                  className="form-input"
                />

                <p className="mt-2 text-xs text-[#60736F]">
                  Separate each skill with a comma.
                </p>

                {skillsText && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skillsText
                      .split(',')
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="px-3 py-1.5 rounded-full bg-[#F8F3E8] text-[#0F4C45] text-xs font-medium border border-[#0F4C45]/10"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* PORTFOLIO */}

          <section className="bg-white rounded-3xl border border-[#0F4C45]/10 p-6 sm:p-8">
            <FormTitle
              title="Your portfolio"
              description="Upload real photos of your work. Choose clear photos that show the quality of what you do."
            />

            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
                {photos.map((url, index) => (
                  <div
                    key={`${url}-${index}`}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F8F3E8]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Work sample ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 h-8 w-8 rounded-lg bg-white/95 text-red-600 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                      title="Remove photo"
                    >
                      <Icon name="trash" size={15} />
                    </button>

                    <span className="absolute left-2 bottom-2 text-[10px] px-2 py-1 rounded-md bg-black/40 text-white opacity-0 group-hover:opacity-100 transition">
                      Work sample {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              onChange={handleFileSelected}
              className="hidden"
              id="dashboard-photo-upload"
            />

            <label
              htmlFor="dashboard-photo-upload"
              className="mt-5 min-h-32 border-2 border-dashed border-[#0F4C45]/15 hover:border-[#C85A3F]/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition bg-[#F8F3E8]/40 hover:bg-[#F8F3E8]"
            >
              <div className="h-11 w-11 rounded-xl bg-white border border-[#0F4C45]/10 flex items-center justify-center text-[#C85A3F]">
                <Icon name="upload" size={20} />
              </div>

              <p className="mt-3 text-sm font-semibold text-[#083A35]">
                {uploading
                  ? 'Uploading photo...'
                  : 'Add a work photo'}
              </p>

              <p className="mt-1 text-xs text-[#60736F]">
                JPG, PNG or WEBP up to 10MB
              </p>
            </label>

            {uploadError && (
              <p className="mt-3 text-sm text-red-600">
                {uploadError}
              </p>
            )}
          </section>

          {/* AVAILABILITY */}

          <section className="bg-white rounded-3xl border border-[#0F4C45]/10 p-6 sm:p-8">
            <FormTitle
              title="Work availability"
              description="Control whether customers can see you as available for new work."
            />

            <div className="mt-6 flex items-center justify-between gap-5 rounded-2xl bg-[#F8F3E8] p-5">
              <div>
                <p className="font-semibold text-[#083A35]">
                  Accepting new work
                </p>

                <p className="text-sm text-[#60736F] mt-1">
                  {myProfile?.isAvailable
                    ? 'Customers can see that you are available.'
                    : 'Customers will see that you are currently unavailable.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleAvailabilityToggle}
                disabled={availabilityLoading}
                className={`
                  relative w-14 h-8 rounded-full transition
                  ${
                    myProfile?.isAvailable
                      ? 'bg-[#0F4C45]'
                      : 'bg-[#B6C2BF]'
                  }
                `}
              >
                <span
                  className={`
                    absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform
                    ${
                      myProfile?.isAvailable
                        ? 'translate-x-7'
                        : 'translate-x-1'
                    }
                  `}
                />
              </button>
            </div>
          </section>

          {/* SAVE */}

          <div className="sticky bottom-4 z-20">
            <div className="bg-white/95 backdrop-blur-xl border border-[#0F4C45]/10 shadow-2xl rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-sm">
                {profileError && (
                  <p className="text-red-600">
                    {profileError}
                  </p>
                )}

                {profileSaved && (
                  <p className="text-[#0F4C45] font-medium flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-[#0F4C45] text-white flex items-center justify-center">
                      <Icon name="check" size={12} />
                    </span>
                    Profile updated successfully.
                  </p>
                )}

                {!profileError && !profileSaved && (
                  <p className="text-[#60736F]">
                    Remember to save your changes.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C85A3F] hover:bg-[#A94632] disabled:opacity-60 text-white text-sm font-semibold transition"
              >
                <Icon name="save" size={16} />

                {profileSaving
                  ? 'Saving changes...'
                  : 'Save profile'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  /* =========================================================
     PORTFOLIO
  ========================================================= */

  function PortfolioSection() {
    return (
      <div className="space-y-6 animate-page">
        <SectionHeader
          eyebrow="Show your work"
          title="Portfolio"
          description="Your portfolio is where customers see the quality of your actual work."
        />

        <section className="bg-white rounded-3xl border border-[#0F4C45]/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl text-[#083A35]">
                Work samples
              </h3>

              <p className="text-sm text-[#60736F] mt-1">
                {photos.length} photo
                {photos.length !== 1 ? 's' : ''} in your
                portfolio
              </p>
            </div>

            <label
              htmlFor="dashboard-photo-upload-portfolio"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C85A3F] text-white text-sm font-semibold cursor-pointer hover:bg-[#A94632] transition"
            >
              <Icon name="plus" size={17} />
              Add photo
            </label>
          </div>

          <input
            id="dashboard-photo-upload-portfolio"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            onChange={handleFileSelected}
            className="hidden"
          />

          {uploadError && (
            <p className="mt-4 text-sm text-red-600">
              {uploadError}
            </p>
          )}

          {photos.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                icon="image"
                title="Your portfolio is empty"
                description="Upload photos of completed work so customers can understand the quality and type of jobs you handle."
                actionLabel="Upload first photo"
                onAction={() =>
                  document
                    .getElementById(
                      'dashboard-photo-upload-portfolio'
                    )
                    ?.click()
                }
              />
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F8F3E8]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Portfolio work ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-3 right-3 h-9 w-9 rounded-xl bg-white text-red-600 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition shadow-lg"
                  >
                    <Icon name="trash" size={16} />
                  </button>

                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/45 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                    Work {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="bg-[#F8F3E8] border border-[#0F4C45]/10 rounded-3xl p-6 flex gap-4">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-white flex items-center justify-center text-[#0F4C45]">
            <Icon name="shield" size={19} />
          </div>

          <div>
            <h4 className="font-semibold text-[#083A35]">
              Make your portfolio useful
            </h4>

            <p className="text-sm text-[#60736F] mt-1 leading-6">
              Use clear photos that show your finished work,
              different project types and the quality of your
              craftsmanship.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     REVIEWS
  ========================================================= */

  function ReviewsSection() {
    const rating =
      myProfile && myProfile.ratingCount > 0
        ? myProfile.ratingAvg.toFixed(1)
        : '—';

    return (
      <div className="space-y-6 animate-page">
        <SectionHeader
          eyebrow="Customer feedback"
          title="Reviews"
          description="Your customer feedback helps people understand what it is like to work with you."
        />

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#0F4C45] text-white rounded-3xl p-6">
            <p className="text-white/50 text-xs uppercase tracking-wider">
              Average rating
            </p>

            <div className="flex items-end gap-2 mt-4">
              <span className="font-display text-5xl">
                {rating}
              </span>

              {rating !== '—' && (
                <Icon
                  name="star"
                  size={23}
                />
              )}
            </div>

            <p className="text-sm text-white/50 mt-2">
              {myProfile?.ratingCount || 0} review
              {(myProfile?.ratingCount || 0) !== 1
                ? 's'
                : ''}
            </p>
          </div>

          <div className="bg-white border border-[#0F4C45]/10 rounded-3xl p-6">
            <p className="text-[#60736F] text-xs uppercase tracking-wider">
              Reputation
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-[#F8F3E8] flex items-center justify-center text-[#C85A3F]">
                <Icon name="star" size={20} />
              </div>

              <div>
                <p className="font-semibold text-[#083A35]">
                  Keep delivering great work
                </p>

                <p className="text-xs text-[#60736F] mt-1">
                  Completed jobs can lead to customer reviews.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#0F4C45]/10 rounded-3xl p-6">
            <p className="text-[#60736F] text-xs uppercase tracking-wider">
              Completed work
            </p>

            <p className="font-display text-4xl text-[#083A35] mt-4">
              {completedJobs}
            </p>

            <p className="text-xs text-[#60736F] mt-2">
              Completed jobs recorded on Amana.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-[#0F4C45]/10 p-6 sm:p-8">
          <h3 className="font-display text-2xl text-[#083A35]">
            Customer reviews
          </h3>

          <div className="mt-8">
            <EmptyState
              icon="star"
              title="Reviews will appear here"
              description="When customers leave reviews for your completed jobs, their feedback will be displayed in this section."
            />
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================
     SETTINGS
  ========================================================= */

  function SettingsSection() {
    return (
      <div className="space-y-6 animate-page">
        <SectionHeader
          eyebrow="Account control"
          title="Settings"
          description="Manage notifications, visibility and your account preferences."
        />

        <section className="bg-white rounded-3xl border border-[#0F4C45]/10 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-[#0F4C45]/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#F8F3E8] text-[#0F4C45] flex items-center justify-center">
                <Icon name="bell" size={19} />
              </div>

              <div>
                <h3 className="font-display text-xl text-[#083A35]">
                  Notifications
                </h3>

                <p className="text-sm text-[#60736F] mt-1">
                  Choose which updates you want to receive.
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-[#0F4C45]/10">
              <SettingRow
                title="Booking notifications"
                description="Get notified when a customer requests or updates a job."
                enabled={settings.bookingNotifications}
                onChange={(value) =>
                  setSettings((previous) => ({
                    ...previous,
                    bookingNotifications: value,
                  }))
                }
              />

              <SettingRow
                title="Message notifications"
                description="Receive alerts when someone sends you a message."
                enabled={settings.messageNotifications}
                onChange={(value) =>
                  setSettings((previous) => ({
                    ...previous,
                    messageNotifications: value,
                  }))
                }
              />

              <SettingRow
                title="Email notifications"
                description="Receive important account updates by email."
                enabled={settings.emailNotifications}
                onChange={(value) =>
                  setSettings((previous) => ({
                    ...previous,
                    emailNotifications: value,
                  }))
                }
              />
            </div>
          </div>

          {/* PROFILE VISIBILITY */}

          <div className="p-6 sm:p-8 border-b border-[#0F4C45]/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#F8F3E8] text-[#0F4C45] flex items-center justify-center">
                <Icon name="eye" size={19} />
              </div>

              <div>
                <h3 className="font-display text-xl text-[#083A35]">
                  Profile visibility
                </h3>

                <p className="text-sm text-[#60736F] mt-1">
                  Control whether customers can discover your profile.
                </p>
              </div>
            </div>

            <SettingRow
              title="Show my public profile"
              description="Allow customers to discover your artisan profile."
              enabled={settings.profileVisible}
              onChange={(value) =>
                setSettings((previous) => ({
                  ...previous,
                  profileVisible: value,
                }))
              }
            />
          </div>

          {/* ACCOUNT */}

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#F8F3E8] text-[#0F4C45] flex items-center justify-center">
                <Icon name="shield" size={19} />
              </div>

              <div>
                <h3 className="font-display text-xl text-[#083A35]">
                  Account
                </h3>

                <p className="text-sm text-[#60736F] mt-1">
                  Your account information and security.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-[#F8F3E8] p-4">
                <p className="text-xs text-[#60736F]">
                  Account ID
                </p>

                <p className="text-sm text-[#083A35] font-medium mt-1 break-all">
                  {user?.userId}
                </p>
              </div>

              <div className="rounded-2xl bg-[#F8F3E8] p-4">
                <p className="text-xs text-[#60736F]">
                  Account role
                </p>

                <p className="text-sm text-[#083A35] font-medium mt-1 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition"
            >
              <Icon name="logout" size={17} />
              Logout
            </button>
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================
     SECTION RENDER
  ========================================================= */

  function renderSection() {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;

      case 'jobs':
        return <JobsSection />;

      case 'messages':
        return <MessagesSection />;

      case 'profile':
        return <ProfileSection />;

      case 'portfolio':
        return <PortfolioSection />;

      case 'reviews':
        return <ReviewsSection />;

      case 'settings':
        return <SettingsSection />;

      default:
        return <OverviewSection />;
    }
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <>
      <style jsx global>{`
        @keyframes pageEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes softFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        .animate-page {
          animation: pageEnter 0.45s ease-out both;
        }

        .animate-soft-float {
          animation: softFloat 4s ease-in-out infinite;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #083a35;
        }

        .form-input {
          width: 100%;
          border: 1px solid rgba(15, 76, 69, 0.14);
          background: #ffffff;
          border-radius: 0.85rem;
          padding: 0.8rem 0.9rem;
          font-size: 0.875rem;
          color: #083a35;
          outline: none;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .form-input::placeholder {
          color: rgba(96, 115, 111, 0.65);
        }

        .form-input:focus {
          border-color: #c85a3f;
          box-shadow: 0 0 0 4px rgba(200, 90, 63, 0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-page,
          .animate-soft-float {
            animation: none !important;
          }

          * {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#F8F3E8] text-[#083A35]">
        <Sidebar />

        <div className="lg:pl-[270px] min-h-screen">
          <TopBar />

          <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1500px] mx-auto">
            {renderSection()}
          </main>
        </div>

        {/* MOBILE BOTTOM NAV */}

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3">
          <div className="bg-[#083A35]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 grid grid-cols-5 gap-1">
            {[
              {
                id: 'overview' as Section,
                label: 'Home',
                icon: 'home' as const,
              },
              {
                id: 'jobs' as Section,
                label: 'Jobs',
                icon: 'briefcase' as const,
              },
              {
                id: 'messages' as Section,
                label: 'Messages',
                icon: 'message' as const,
              },
              {
                id: 'profile' as Section,
                label: 'Profile',
                icon: 'user' as const,
              },
              {
                id: 'settings' as Section,
                label: 'More',
                icon: 'settings' as const,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`
                  min-w-0 rounded-xl py-2
                  flex flex-col items-center justify-center gap-1
                  text-[10px]
                  transition
                  ${
                    activeSection === item.id
                      ? 'bg-white text-[#083A35]'
                      : 'text-white/55'
                  }
                `}
              >
                <Icon name={item.icon} size={17} />

                <span className="truncate max-w-full px-1">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  icon,
  suffix,
  action,
}: {
  label: string;
  value: string | number;
  icon: Parameters<typeof Icon>[0]['name'];
  suffix?: string;
  action?: () => void;
}) {
  return (
    <button
      onClick={action}
      className="text-left bg-white border border-[#0F4C45]/10 rounded-2xl p-4 sm:p-5 hover:border-[#0F4C45]/20 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="h-9 w-9 rounded-xl bg-[#F8F3E8] text-[#0F4C45] flex items-center justify-center">
          <Icon name={icon} size={17} />
        </div>

        <Icon
          name="chevron"
          size={15}
        />
      </div>

      <p className="font-display text-3xl sm:text-4xl text-[#083A35] mt-5">
        {value}
        {suffix && (
          <span className="font-body text-sm text-[#60736F]">
            {suffix}
          </span>
        )}
      </p>

      <p className="text-xs sm:text-sm text-[#60736F] mt-1">
        {label}
      </p>
    </button>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white border border-[#0F4C45]/10 rounded-2xl p-4">
      <p className="font-display text-2xl text-[#083A35]">
        {value}
      </p>

      <p className="text-xs text-[#60736F] mt-1">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-[#C85A3F] font-semibold">
        {eyebrow}
      </p>

      <h2 className="font-display text-3xl sm:text-4xl text-[#083A35] mt-2">
        {title}
      </h2>

      <p className="text-sm sm:text-base text-[#60736F] max-w-2xl mt-2 leading-7">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   FORM TITLE
========================================================= */

function FormTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="font-display text-2xl text-[#083A35]">
        {title}
      </h3>

      <p className="text-sm text-[#60736F] mt-1 max-w-2xl leading-6">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   COMPLETION ITEM
========================================================= */

function CompletionItem({
  complete,
  label,
}: {
  complete: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#F8F3E8] px-4 py-3">
      <span
        className={`
          h-6 w-6 rounded-full flex items-center justify-center shrink-0
          ${
            complete
              ? 'bg-[#0F4C45] text-white'
              : 'border border-[#0F4C45]/15 text-transparent'
          }
        `}
      >
        <Icon name="check" size={13} />
      </span>

      <span
        className={`text-sm ${
          complete
            ? 'text-[#083A35] font-medium'
            : 'text-[#60736F]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   BOOKING CARD
========================================================= */

function BookingCard({
  booking,
  isArtisan,
  updatingId,
  onStatusChange,
  onReview,
  reviewedIds,
  reviewingId,
  reviewRating,
  setReviewRating,
  reviewComment,
  setReviewComment,
  reviewSubmitting,
  reviewError,
  onSubmitReview,
  onCancelReview,
}: {
  booking: MyBooking;
  isArtisan: boolean;
  updatingId: string | null;
  onStatusChange: (
    bookingId: string,
    status: string
  ) => void;
  onReview: (bookingId: string) => void;
  reviewedIds: string[];
  reviewingId?: string | null;
  reviewRating?: number;
  setReviewRating?: (rating: number) => void;
  reviewComment?: string;
  setReviewComment?: (comment: string) => void;
  reviewSubmitting?: boolean;
  reviewError?: string;
  onSubmitReview?: (
    event: React.FormEvent,
    bookingId: string
  ) => void;
  onCancelReview?: () => void;
}) {
  const statusLabel = booking.status.replace(
    /_/g,
    ' '
  );

  const statusStyles: Record<string, string> = {
    requested:
      'bg-[#FFF3E8] text-[#A94632] border-[#C85A3F]/15',
    accepted:
      'bg-[#EDF7F4] text-[#0F4C45] border-[#0F4C45]/10',
    in_progress:
      'bg-[#EEF3F7] text-[#315A73] border-[#315A73]/10',
    completed:
      'bg-[#EDF7F4] text-[#0F4C45] border-[#0F4C45]/10',
    cancelled:
      'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className="border border-[#0F4C45]/10 rounded-2xl p-4 sm:p-5 hover:border-[#0F4C45]/20 transition">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-1.5
                px-2.5 py-1 rounded-full border
                text-[11px] font-semibold capitalize
                ${
                  statusStyles[booking.status] ||
                  'bg-gray-50 text-gray-600 border-gray-100'
                }
              `}
            >
              {statusLabel}
            </span>

            <span className="text-xs text-[#60736F]">
              {new Date(
                booking.createdAt
              ).toLocaleDateString()}
            </span>
          </div>

          <h4 className="font-semibold text-[#083A35] mt-3">
            Service request
          </h4>

          <p className="text-sm text-[#60736F] mt-1 leading-6">
            {booking.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          {isArtisan &&
            booking.status === 'requested' && (
              <>
                <button
                  onClick={() =>
                    onStatusChange(
                      booking._id,
                      'accepted'
                    )
                  }
                  disabled={
                    updatingId === booking._id
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#C85A3F] hover:bg-[#A94632] disabled:opacity-60 text-white text-xs font-semibold transition"
                >
                  {updatingId === booking._id
                    ? 'Updating...'
                    : 'Accept'}
                </button>

                <button
                  onClick={() =>
                    onStatusChange(
                      booking._id,
                      'cancelled'
                    )
                  }
                  disabled={
                    updatingId === booking._id
                  }
                  className="px-4 py-2.5 rounded-xl border border-[#0F4C45]/15 text-[#083A35] hover:border-[#0F4C45]/30 text-xs font-semibold transition"
                >
                  Decline
                </button>
              </>
            )}

          {isArtisan &&
            booking.status === 'accepted' && (
              <button
                onClick={() =>
                  onStatusChange(
                    booking._id,
                    'in_progress'
                  )
                }
                disabled={
                  updatingId === booking._id
                }
                className="px-4 py-2.5 rounded-xl bg-[#C85A3F] hover:bg-[#A94632] disabled:opacity-60 text-white text-xs font-semibold transition"
              >
                {updatingId === booking._id
                  ? 'Updating...'
                  : 'Start job'}
              </button>
            )}

          {isArtisan &&
            booking.status === 'in_progress' && (
              <button
                onClick={() =>
                  onStatusChange(
                    booking._id,
                    'completed'
                  )
                }
                disabled={
                  updatingId === booking._id
                }
                className="px-4 py-2.5 rounded-xl bg-[#0F4C45] hover:bg-[#083A35] disabled:opacity-60 text-white text-xs font-semibold transition"
              >
                {updatingId === booking._id
                  ? 'Updating...'
                  : 'Mark completed'}
              </button>
            )}
        </div>
      </div>

      {/* REVIEW */}

      {!isArtisan &&
        booking.status === 'completed' && (
          <div className="mt-5 pt-5 border-t border-[#0F4C45]/10">
            {reviewedIds.includes(booking._id) ? (
              <p className="text-sm text-[#0F4C45] font-medium flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-[#0F4C45] text-white flex items-center justify-center">
                  <Icon name="check" size={13} />
                </span>
                Review submitted. Thank you.
              </p>
            ) : reviewingId === booking._id ? (
              <form
                onSubmit={(event) =>
                  onSubmitReview?.(
                    event,
                    booking._id
                  )
                }
                className="space-y-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[#083A35]">
                    How was the job?
                  </p>

                  <div className="flex gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() =>
                            setReviewRating?.(
                              star
                            )
                          }
                          className={`h-9 w-9 rounded-lg flex items-center justify-center transition ${
                            star <=
                            (reviewRating || 5)
                              ? 'bg-[#FFF3E8] text-[#C85A3F]'
                              : 'bg-[#F8F3E8] text-[#60736F]/30'
                          }`}
                        >
                          <Icon
                            name="star"
                            size={17}
                          />
                        </button>
                      )
                    )}
                  </div>
                </div>

                <textarea
                  value={reviewComment || ''}
                  onChange={(event) =>
                    setReviewComment?.(
                      event.target.value
                    )
                  }
                  placeholder="Tell us about your experience. Your comment is optional."
                  rows={4}
                  className="form-input"
                />

                {reviewError && (
                  <p className="text-sm text-red-600">
                    {reviewError}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-4 py-2.5 rounded-xl bg-[#C85A3F] text-white text-xs font-semibold disabled:opacity-60"
                  >
                    {reviewSubmitting
                      ? 'Submitting...'
                      : 'Submit review'}
                  </button>

                  <button
                    type="button"
                    onClick={onCancelReview}
                    className="px-4 py-2.5 rounded-xl border border-[#0F4C45]/15 text-[#083A35] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() =>
                  onReview(booking._id)
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C85A3F]/30 text-[#C85A3F] hover:bg-[#FFF3E8] text-xs font-semibold transition"
              >
                <Icon name="star" size={14} />
                Leave a review
              </button>
            )}
          </div>
        )}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: Parameters<typeof Icon>[0]['name'];
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="text-center max-w-md mx-auto py-10">
      <div className="h-14 w-14 mx-auto rounded-2xl bg-[#F8F3E8] text-[#0F4C45] flex items-center justify-center">
        <Icon name={icon} size={24} />
      </div>

      <h3 className="font-display text-xl text-[#083A35] mt-5">
        {title}
      </h3>

      <p className="text-sm text-[#60736F] mt-2 leading-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C45] text-white text-xs font-semibold hover:bg-[#083A35] transition"
        >
          {actionLabel}
          <Icon name="arrow" size={14} />
        </button>
      )}
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingBlock() {
  return (
    <div className="py-12 flex flex-col items-center justify-center">
      <div className="h-9 w-9 rounded-full border-2 border-[#0F4C45]/15 border-t-[#C85A3F] animate-spin" />

      <p className="text-sm text-[#60736F] mt-4">
        Loading...
      </p>
    </div>
  );
}

/* =========================================================
   SETTING ROW
========================================================= */

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div>
        <p className="text-sm font-semibold text-[#083A35]">
          {title}
        </p>

        <p className="text-xs text-[#60736F] mt-1 leading-5 max-w-xl">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`
          relative w-12 h-7 shrink-0 rounded-full transition
          ${enabled ? 'bg-[#0F4C45]' : 'bg-[#B6C2BF]'}
        `}
      >
        <span
          className={`
            absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}