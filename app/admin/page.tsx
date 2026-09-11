"use client";

import { useEffect, useMemo, useState } from "react";

type AdminSection =
  | "overview"
  | "customers"
  | "artisans"
  | "admins"
  | "bookings"
  | "services"
  | "locations"
  | "verification"
  | "reports"
  | "reviews"
  | "analytics"
  | "settings"
  | "help";

type ArtisanStatus = "Active" | "Pending" | "Suspended";
type BookingStatus = "Requested" | "Accepted" | "In Progress" | "Completed";

interface Customer {
  id: number;
  name: string;
  phone: string;
  location: string;
  joined: string;
  bookings: number;
  status: "Active" | "Suspended";
}

interface Artisan {
  id: number;
  name: string;
  service: string;
  location: string;
  rating: number;
  reviews: number;
  status: ArtisanStatus;
  joined: string;
}

interface Booking {
  id: string;
  customer: string;
  artisan: string;
  service: string;
  location: string;
  date: string;
  status: BookingStatus;
}

interface Report {
  id: string;
  reporter: string;
  target: string;
  reason: string;
  date: string;
  status: "Open" | "Investigating" | "Resolved";
}

interface Review {
  id: number;
  customer: string;
  artisan: string;
  rating: number;
  comment: string;
  date: string;
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Abdullahi Musa",
    phone: "0803 123 4567",
    location: "Kano Municipal",
    joined: "2 days ago",
    bookings: 4,
    status: "Active",
  },
  {
    id: 2,
    name: "Aisha Ibrahim",
    phone: "0812 456 7890",
    location: "Nassarawa",
    joined: "5 days ago",
    bookings: 7,
    status: "Active",
  },
  {
    id: 3,
    name: "Muhammad Sani",
    phone: "0705 321 9876",
    location: "Tarauni",
    joined: "1 week ago",
    bookings: 2,
    status: "Active",
  },
  {
    id: 4,
    name: "Fatima Bello",
    phone: "0902 456 1234",
    location: "Fagge",
    joined: "2 weeks ago",
    bookings: 5,
    status: "Active",
  },
];

const artisans: Artisan[] = [
  {
    id: 1,
    name: "Musa Electrical Services",
    service: "Electrician",
    location: "Kano Municipal",
    rating: 4.9,
    reviews: 38,
    status: "Active",
    joined: "3 days ago",
  },
  {
    id: 2,
    name: "Northern Solar Works",
    service: "Solar Technician",
    location: "Nassarawa",
    rating: 4.8,
    reviews: 27,
    status: "Active",
    joined: "1 week ago",
  },
  {
    id: 3,
    name: "Aminu Plumbing Services",
    service: "Plumber",
    location: "Tarauni",
    rating: 4.7,
    reviews: 19,
    status: "Pending",
    joined: "Today",
  },
  {
    id: 4,
    name: "Kano Master Tailors",
    service: "Tailor",
    location: "Fagge",
    rating: 4.6,
    reviews: 31,
    status: "Pending",
    joined: "Yesterday",
  },
  {
    id: 5,
    name: "Sani Auto Care",
    service: "Mechanic",
    location: "Kumbotso",
    rating: 4.5,
    reviews: 16,
    status: "Suspended",
    joined: "3 weeks ago",
  },
];

const bookings: Booking[] = [
  {
    id: "#AMN-1024",
    customer: "Abdullahi Musa",
    artisan: "Musa Electrical Services",
    service: "Electrical",
    location: "Kano Municipal",
    date: "Today, 10:30 AM",
    status: "Accepted",
  },
  {
    id: "#AMN-1023",
    customer: "Aisha Ibrahim",
    artisan: "Northern Solar Works",
    service: "Solar",
    location: "Nassarawa",
    date: "Today, 1:00 PM",
    status: "In Progress",
  },
  {
    id: "#AMN-1022",
    customer: "Muhammad Sani",
    artisan: "Aminu Plumbing Services",
    service: "Plumbing",
    location: "Tarauni",
    date: "Yesterday",
    status: "Requested",
  },
  {
    id: "#AMN-1021",
    customer: "Fatima Bello",
    artisan: "Kano Master Tailors",
    service: "Tailoring",
    location: "Fagge",
    date: "Yesterday",
    status: "Completed",
  },
];

const reports: Report[] = [
  {
    id: "#REP-001",
    reporter: "Aisha Ibrahim",
    target: "Sani Auto Care",
    reason: "Incorrect service information",
    date: "Today",
    status: "Open",
  },
  {
    id: "#REP-002",
    reporter: "Abdullahi Musa",
    target: "Another user",
    reason: "Inappropriate message",
    date: "Yesterday",
    status: "Investigating",
  },
  {
    id: "#REP-003",
    reporter: "Fatima Bello",
    target: "Kano Master Tailors",
    reason: "Booking disagreement",
    date: "2 days ago",
    status: "Resolved",
  },
];

const reviews: Review[] = [
  {
    id: 1,
    customer: "Abdullahi Musa",
    artisan: "Musa Electrical Services",
    rating: 5,
    comment: "Excellent work and arrived on time.",
    date: "Today",
  },
  {
    id: 2,
    customer: "Aisha Ibrahim",
    artisan: "Northern Solar Works",
    rating: 5,
    comment: "Very professional and explained everything clearly.",
    date: "Yesterday",
  },
  {
    id: 3,
    customer: "Muhammad Sani",
    artisan: "Aminu Plumbing Services",
    rating: 4,
    comment: "Good service. The issue was fixed quickly.",
    date: "3 days ago",
  },
];

const services = [
  { name: "Plumbing", artisans: 42, bookings: 126 },
  { name: "Electrical", artisans: 57, bookings: 183 },
  { name: "Solar", artisans: 31, bookings: 94 },
  { name: "Carpentry", artisans: 28, bookings: 61 },
  { name: "Tailoring", artisans: 46, bookings: 142 },
  { name: "Mechanics", artisans: 39, bookings: 108 },
  { name: "Painting", artisans: 19, bookings: 47 },
  { name: "Masonry", artisans: 24, bookings: 55 },
];

const locations = [
  { name: "Kano Municipal", artisans: 86, customers: 412 },
  { name: "Nassarawa", artisans: 61, customers: 287 },
  { name: "Tarauni", artisans: 49, customers: 231 },
  { name: "Fagge", artisans: 43, customers: 194 },
  { name: "Kumbotso", artisans: 31, customers: 142 },
];

function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 4c4-3 7 3 14 0v10c-7 3-10-3-14 0" />
      </>
    ),
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z" />
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h17" />
        <path d="m7 15 4-4 3 2 6-7" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.5 1.5-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2v-.4a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.5-1.5.1-.1A1.7 1.7 0 0 0 9.1 15a1.7 1.7 0 0 0-1.5-1H7v-2h.6a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.5-1.5.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V6h2v.4a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.5 1.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.4v2h-.4a1.7 1.7 0 0 0-1.5 1z" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.6 2.6 0 1 1 4.2 2c-1 .7-1.7 1.2-1.7 2.5" />
        <path d="M12 17h.01" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    filter: (
      <>
        <path d="M4 6h16M7 12h10M10 18h4" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function StatusBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = String(children);

  let classes =
    "bg-slate-100 text-slate-700 border-slate-200";

  if (
    ["Active", "Completed", "Resolved", "Accepted"].includes(value)
  ) {
    classes = "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (
    ["Pending", "Requested", "Open", "Investigating"].includes(value)
  ) {
    classes = "bg-amber-50 text-amber-700 border-amber-200";
  }

  if (
    ["Suspended"].includes(value)
  ) {
    classes = "bg-red-50 text-red-700 border-red-200";
  }

  if (value === "In Progress") {
    classes = "bg-blue-50 text-blue-700 border-blue-200";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      {children}
    </span>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: string;
  trend?: string;
}) {
  return (
    <div className="group rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F3E8] text-[#0F4C45]">
          <Icon name={icon} size={21} />
        </div>

        {trend && (
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-[#60736F]">{title}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-[#123D38]">
          {value}
        </p>
        <p className="mt-1 text-xs text-[#60736F]">{description}</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeSection, setActiveSection] =
    useState<AdminSection>("overview");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [adminName] = useState("Admin");

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get(
      "section"
    );

    const validSections: AdminSection[] = [
      "overview",
      "customers",
      "artisans",
      "admins",
      "bookings",
      "services",
      "locations",
      "verification",
      "reports",
      "reviews",
      "analytics",
      "settings",
      "help",
    ];

    if (
      section &&
      validSections.includes(section as AdminSection)
    ) {
      setActiveSection(section as AdminSection);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (activeSection === "overview") {
      url.searchParams.delete("section");
    } else {
      url.searchParams.set("section", activeSection);
    }

    window.history.replaceState({}, "", url.toString());
  }, [activeSection]);

  const navigateTo = (section: AdminSection) => {
    setActiveSection(section);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pageTitle = useMemo(() => {
    const titles: Record<AdminSection, string> = {
      overview: "Overview",
      customers: "Customers",
      artisans: "Artisans",
      admins: "Administrators",
      bookings: "Bookings",
      services: "Services",
      locations: "Locations",
      verification: "Verification",
      reports: "Reports",
      reviews: "Reviews",
      analytics: "Analytics",
      settings: "Settings",
      help: "Help & Support",
    };

    return titles[activeSection];
  }, [activeSection]);

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.phone} ${customer.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredArtisans = artisans.filter((artisan) =>
    `${artisan.name} ${artisan.service} ${artisan.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#123D38]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          aria-label="Close admin navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#083A35]/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ADMIN SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-white/10 bg-[#083A35] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* BRAND */}
        <div className="flex h-[76px] items-center border-b border-white/10 px-6">
          <button
            onClick={() => navigateTo("overview")}
            className="text-left"
          >
            <div className="text-xl font-black tracking-[0.18em]">
              AMANA
            </div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
              Admin Console
            </div>
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <AdminNavButton
            label="Overview"
            icon="grid"
            active={activeSection === "overview"}
            onClick={() => navigateTo("overview")}
          />

          <NavGroup label="People">
            <AdminNavButton
              label="Customers"
              icon="user"
              active={activeSection === "customers"}
              onClick={() => navigateTo("customers")}
            />

            <AdminNavButton
              label="Artisans"
              icon="briefcase"
              active={activeSection === "artisans"}
              onClick={() => navigateTo("artisans")}
              badge="5"
            />

            <AdminNavButton
              label="Administrators"
              icon="users"
              active={activeSection === "admins"}
              onClick={() => navigateTo("admins")}
            />
          </NavGroup>

          <NavGroup label="Marketplace">
            <AdminNavButton
              label="Bookings"
              icon="calendar"
              active={activeSection === "bookings"}
              onClick={() => navigateTo("bookings")}
            />

            <AdminNavButton
              label="Services"
              icon="briefcase"
              active={activeSection === "services"}
              onClick={() => navigateTo("services")}
            />

            <AdminNavButton
              label="Locations"
              icon="location"
              active={activeSection === "locations"}
              onClick={() => navigateTo("locations")}
            />
          </NavGroup>

          <NavGroup label="Trust & Safety">
            <AdminNavButton
              label="Verification"
              icon="shield"
              active={activeSection === "verification"}
              onClick={() => navigateTo("verification")}
              badge="2"
            />

            <AdminNavButton
              label="Reports"
              icon="flag"
              active={activeSection === "reports"}
              onClick={() => navigateTo("reports")}
              badge="2"
            />

            <AdminNavButton
              label="Reviews"
              icon="star"
              active={activeSection === "reviews"}
              onClick={() => navigateTo("reviews")}
            />
          </NavGroup>

          <NavGroup label="Insights">
            <AdminNavButton
              label="Analytics"
              icon="chart"
              active={activeSection === "analytics"}
              onClick={() => navigateTo("analytics")}
            />
          </NavGroup>

          <NavGroup label="System">
            <AdminNavButton
              label="Settings"
              icon="settings"
              active={activeSection === "settings"}
              onClick={() => navigateTo("settings")}
            />

            <AdminNavButton
              label="Help & Support"
              icon="help"
              active={activeSection === "help"}
              onClick={() => navigateTo("help")}
            />
          </NavGroup>
        </nav>

        {/* ADMIN ACCOUNT */}
        <div className="border-t border-white/10 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C85A3F] text-sm font-bold">
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {adminName}
              </p>
              <p className="truncate text-xs text-white/45">
                Platform Administrator
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              // Connect logout API here later.
              window.location.href = "/login";
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <Icon name="logout" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="min-h-screen lg:pl-[270px]">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 border-b border-[#DCE5E1] bg-white/95 backdrop-blur">
          <div className="flex h-[76px] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-[#DCE5E1] p-2.5 text-[#0F4C45] hover:bg-[#F8F3E8] lg:hidden"
            >
              <Icon name="menu" size={20} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="hidden text-xs font-semibold uppercase tracking-[0.15em] text-[#60736F] sm:block">
                Amana Admin
              </p>

              <h1 className="truncate text-xl font-bold text-[#123D38]">
                {pageTitle}
              </h1>
            </div>

            {/* SEARCH */}
            <div className="hidden w-[280px] items-center rounded-xl border border-[#DCE5E1] bg-[#F7F8F6] px-3 md:flex">
              <Icon name="search" size={18} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent px-2.5 py-2.5 text-sm outline-none placeholder:text-[#8A9A96]"
              />
            </div>

            {/* NOTIFICATION */}
            <button className="relative rounded-xl border border-[#DCE5E1] bg-white p-2.5 text-[#0F4C45] transition hover:bg-[#F8F3E8]">
              <Icon name="bell" size={19} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#C85A3F]" />
            </button>

            {/* ADMIN AVATAR */}
            <button className="hidden items-center gap-2 rounded-xl border border-[#DCE5E1] bg-white px-2 py-1.5 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F4C45] text-xs font-bold text-white">
                A
              </div>
              <span className="text-sm font-semibold">
                Admin
              </span>
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {activeSection === "overview" && (
            <OverviewSection
              navigateTo={navigateTo}
            />
          )}

          {activeSection === "customers" && (
            <CustomersSection
              customers={filteredCustomers}
            />
          )}

          {activeSection === "artisans" && (
            <ArtisansSection
              artisans={filteredArtisans}
              navigateTo={navigateTo}
            />
          )}

          {activeSection === "admins" && (
            <AdminsSection />
          )}

          {activeSection === "bookings" && (
            <BookingsSection />
          )}

          {activeSection === "services" && (
            <ServicesSection />
          )}

          {activeSection === "locations" && (
            <LocationsSection />
          )}

          {activeSection === "verification" && (
            <VerificationSection
              navigateTo={navigateTo}
            />
          )}

          {activeSection === "reports" && (
            <ReportsSection />
          )}

          {activeSection === "reviews" && (
            <ReviewsSection />
          )}

          {activeSection === "analytics" && (
            <AnalyticsSection />
          )}

          {activeSection === "settings" && (
            <SettingsSection />
          )}

          {activeSection === "help" && (
            <HelpSection />
          )}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR COMPONENTS
========================================================= */

function NavGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <div className="space-y-1">{children}</div>
    </div>
  );
}

function AdminNavButton({
  label,
  icon,
  active,
  onClick,
  badge,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${
        active
          ? "bg-white text-[#083A35] shadow-sm"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span
        className={`transition ${
          active
            ? "text-[#C85A3F]"
            : "text-white/45 group-hover:text-white"
        }`}
      >
        <Icon name={icon} size={18} />
      </span>

      <span className="flex-1 text-left">{label}</span>

      {badge && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            active
              ? "bg-[#F8F3E8] text-[#C85A3F]"
              : "bg-white/10 text-white/60"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function OverviewSection({
  navigateTo,
}: {
  navigateTo: (section: AdminSection) => void;
}) {
  return (
    <div className="space-y-8 animate-[fadeUp_.45s_ease-out]">
      <section>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-[#C85A3F]">
              Platform overview
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, Admin.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#60736F]">
              Monitor Amana, manage users, review activity, and keep
              the marketplace healthy.
            </p>
          </div>

          <button
            onClick={() => navigateTo("artisans")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C85A3F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#A94632] hover:shadow-md"
          >
            Manage Artisans
            <Icon name="arrow" size={17} />
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Customers"
          value="1,264"
          description="Registered customers"
          icon="users"
          trend="+12.4%"
        />

        <StatCard
          title="Total Artisans"
          value="318"
          description="Artisans on Amana"
          icon="briefcase"
          trend="+8.7%"
        />

        <StatCard
          title="Active Bookings"
          value="86"
          description="Currently active"
          icon="calendar"
          trend="+5.2%"
        />

        <StatCard
          title="Platform Rating"
          value="4.8"
          description="Average marketplace rating"
          icon="star"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Marketplace activity</h3>
              <p className="mt-1 text-xs text-[#60736F]">
                Booking activity over the last 7 days
              </p>
            </div>

            <button
              onClick={() => navigateTo("analytics")}
              className="text-sm font-semibold text-[#C85A3F] hover:underline"
            >
              View analytics
            </button>
          </div>

          <div className="mt-7 flex h-[230px] items-end gap-3 sm:gap-5">
            {[42, 58, 47, 73, 61, 89, 76].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col justify-end"
                >
                  <div
                    className="rounded-t-lg bg-[#0F4C45] transition duration-300 hover:bg-[#C85A3F]"
                    style={{ height: `${height}%` }}
                  />

                  <span className="mt-3 text-center text-[10px] font-medium text-[#60736F]">
                    {
                      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                        index
                      ]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Needs attention</h3>
              <p className="mt-1 text-xs text-[#60736F]">
                Items requiring admin action
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <AttentionItem
              title="Pending artisan reviews"
              value="2"
              icon="shield"
              onClick={() => navigateTo("verification")}
            />

            <AttentionItem
              title="Open reports"
              value="2"
              icon="flag"
              onClick={() => navigateTo("reports")}
            />

            <AttentionItem
              title="Requested bookings"
              value="12"
              icon="calendar"
              onClick={() => navigateTo("bookings")}
            />

            <AttentionItem
              title="Recent reviews"
              value="18"
              icon="star"
              onClick={() => navigateTo("reviews")}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#DCE5E1] bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-[#DCE5E1] p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h3 className="font-bold">Recent bookings</h3>
            <p className="mt-1 text-xs text-[#60736F]">
              Latest marketplace activity
            </p>
          </div>

          <button
            onClick={() => navigateTo("bookings")}
            className="text-left text-sm font-semibold text-[#C85A3F] hover:underline sm:text-right"
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-[#F7F8F6] text-xs uppercase tracking-wide text-[#60736F]">
              <tr>
                <th className="px-6 py-4">Booking</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Artisan</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.slice(0, 4).map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t border-[#DCE5E1] text-sm"
                >
                  <td className="px-6 py-4 font-semibold">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4">
                    {booking.artisan}
                  </td>
                  <td className="px-6 py-4">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge>{booking.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AttentionItem({
  title,
  value,
  icon,
  onClick,
}: {
  title: string;
  value: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-[#DCE5E1] p-3 text-left transition hover:-translate-y-0.5 hover:border-[#0F4C45] hover:shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F8F3E8] text-[#0F4C45]">
        <Icon name={icon} size={18} />
      </div>

      <span className="flex-1 text-sm font-medium">
        {title}
      </span>

      <span className="rounded-full bg-[#083A35] px-2.5 py-1 text-xs font-bold text-white">
        {value}
      </span>
    </button>
  );
}

/* =========================================================
   CUSTOMERS
========================================================= */

function CustomersSection({
  customers,
}: {
  customers: Customer[];
}) {
  return (
    <PageSection
      eyebrow="People"
      title="Customers"
      description="View and manage people using Amana to find local artisans."
      action="Add Customer"
    >
      <div className="overflow-hidden rounded-2xl border border-[#DCE5E1] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-[#F7F8F6] text-xs uppercase tracking-wide text-[#60736F]">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Bookings</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-[#DCE5E1] text-sm hover:bg-[#FBFCFA]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={customer.name}
                        color="teal"
                      />
                      <span className="font-semibold">
                        {customer.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[#60736F]">
                    {customer.phone}
                  </td>

                  <td className="px-6 py-4">
                    {customer.location}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {customer.bookings}
                  </td>

                  <td className="px-6 py-4 text-[#60736F]">
                    {customer.joined}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge>{customer.status}</StatusBadge>
                  </td>

                  <td className="px-6 py-4">
                    <button className="rounded-lg p-2 text-[#60736F] hover:bg-[#F8F3E8] hover:text-[#0F4C45]">
                      <Icon name="more" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {customers.length === 0 && (
          <EmptyState
            title="No customers found"
            description="Try changing your search."
          />
        )}
      </div>
    </PageSection>
  );
}

/* =========================================================
   ARTISANS
========================================================= */

function ArtisansSection({
  artisans,
  navigateTo,
}: {
  artisans: Artisan[];
  navigateTo: (section: AdminSection) => void;
}) {
  return (
    <PageSection
      eyebrow="People"
      title="Artisans"
      description="Manage artisans, profiles, services, and marketplace activity."
      action="Review Pending"
      onAction={() => navigateTo("verification")}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar
                  name={artisan.name}
                  color="terracotta"
                />

                <div>
                  <h3 className="text-sm font-bold">
                    {artisan.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#60736F]">
                    {artisan.service}
                  </p>
                </div>
              </div>

              <StatusBadge>{artisan.status}</StatusBadge>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-[#60736F]">
                <Icon name="location" size={16} />
                {artisan.location}
              </div>

              <div className="flex items-center gap-2">
                <Icon
                  name="star"
                  size={16}
                />
                <span className="font-semibold">
                  {artisan.rating}
                </span>
                <span className="text-[#60736F]">
                  ({artisan.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-[#DCE5E1] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#60736F]">
                  Joined {artisan.joined}
                </span>

                <button
                  onClick={() => navigateTo("verification")}
                  className="text-sm font-semibold text-[#C85A3F] hover:underline"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {artisans.length === 0 && (
        <div className="rounded-2xl border border-[#DCE5E1] bg-white">
          <EmptyState
            title="No artisans found"
            description="Try changing your search."
          />
        </div>
      )}
    </PageSection>
  );
}

/* =========================================================
   ADMINS
========================================================= */

function AdminsSection() {
  return (
    <PageSection
      eyebrow="People"
      title="Administrators"
      description="Manage the people who have access to the Amana admin console."
      action="Add Administrator"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Platform Admin", "admin@amana.ng", "Super Admin"],
          ["Operations Admin", "operations@amana.ng", "Operations"],
          ["Support Admin", "support@amana.ng", "Support"],
        ].map(([name, email, role]) => (
          <div
            key={email}
            className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Avatar name={name} color="teal" />

              <div>
                <h3 className="font-bold">{name}</h3>
                <p className="mt-1 text-xs text-[#60736F]">
                  {email}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#DCE5E1] pt-4">
              <StatusBadge>{role}</StatusBadge>

              <button className="rounded-lg p-2 text-[#60736F] hover:bg-[#F8F3E8]">
                <Icon name="more" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

/* =========================================================
   BOOKINGS
========================================================= */

function BookingsSection() {
  return (
    <PageSection
      eyebrow="Marketplace"
      title="Bookings"
      description="Monitor booking requests and jobs across Amana."
      action="Export"
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {[
          "All",
          "Requested",
          "Accepted",
          "In Progress",
          "Completed",
        ].map((filter) => (
          <button
            key={filter}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              filter === "All"
                ? "border-[#0F4C45] bg-[#0F4C45] text-white"
                : "border-[#DCE5E1] bg-white text-[#60736F] hover:border-[#0F4C45] hover:text-[#0F4C45]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#DCE5E1] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-[#F7F8F6] text-xs uppercase tracking-wide text-[#60736F]">
              <tr>
                <th className="px-6 py-4">Booking</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Artisan</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t border-[#DCE5E1] text-sm hover:bg-[#FBFCFA]"
                >
                  <td className="px-6 py-4 font-bold">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4">
                    {booking.artisan}
                  </td>
                  <td className="px-6 py-4">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4">
                    {booking.location}
                  </td>
                  <td className="px-6 py-4 text-[#60736F]">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge>{booking.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageSection>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function ServicesSection() {
  return (
    <PageSection
      eyebrow="Marketplace"
      title="Services"
      description="Manage the service categories customers use to discover artisans."
      action="Add Service"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F3E8] text-[#0F4C45]">
              <Icon name="briefcase" size={20} />
            </div>

            <h3 className="mt-5 font-bold">{service.name}</h3>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#60736F]">
                  Artisans
                </p>
                <p className="mt-1 text-lg font-bold">
                  {service.artisans}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#60736F]">
                  Bookings
                </p>
                <p className="mt-1 text-lg font-bold">
                  {service.bookings}
                </p>
              </div>
            </div>

            <button className="mt-5 w-full rounded-lg border border-[#DCE5E1] py-2.5 text-sm font-semibold text-[#0F4C45] hover:bg-[#F8F3E8]">
              Manage Service
            </button>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

/* =========================================================
   LOCATIONS
========================================================= */

function LocationsSection() {
  return (
    <PageSection
      eyebrow="Marketplace"
      title="Locations"
      description="Monitor where customers and artisans are using Amana."
      action="Add Location"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {locations.map((location) => (
          <div
            key={location.name}
            className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F3E8] text-[#0F4C45]">
                <Icon name="location" size={20} />
              </div>

              <div>
                <h3 className="font-bold">
                  {location.name}
                </h3>
                <p className="mt-1 text-xs text-[#60736F]">
                  Kano
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric
                label="Artisans"
                value={location.artisans}
              />
              <Metric
                label="Customers"
                value={location.customers}
              />
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

/* =========================================================
   VERIFICATION
========================================================= */

function VerificationSection({
  navigateTo,
}: {
  navigateTo: (section: AdminSection) => void;
}) {
  const pendingArtisans = artisans.filter(
    (artisan) => artisan.status === "Pending"
  );

  return (
    <PageSection
      eyebrow="Trust & Safety"
      title="Verification"
      description="Review artisan profiles before enabling platform trust signals."
      action="View Artisans"
      onAction={() => navigateTo("artisans")}
    >
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700">
            <Icon name="shield" size={19} />
          </div>

          <div>
            <h3 className="font-bold text-amber-900">
              {pendingArtisans.length} profiles need review
            </h3>

            <p className="mt-1 text-sm leading-6 text-amber-800/80">
              Review profile information and supporting details
              before approving any verification status.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {pendingArtisans.map((artisan) => (
          <div
            key={artisan.id}
            className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-4">
                <Avatar
                  name={artisan.name}
                  color="terracotta"
                />

                <div>
                  <h3 className="font-bold">
                    {artisan.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#60736F]">
                    {artisan.service} · {artisan.location}
                  </p>

                  <p className="mt-1 text-xs text-[#60736F]">
                    Joined {artisan.joined}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="rounded-xl border border-[#DCE5E1] px-4 py-2.5 text-sm font-semibold text-[#0F4C45] hover:bg-[#F8F3E8]">
                  Review Profile
                </button>

                <button className="rounded-xl bg-[#0F4C45] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#083A35]">
                  Approve
                </button>

                <button className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function ReportsSection() {
  return (
    <PageSection
      eyebrow="Trust & Safety"
      title="Reports"
      description="Investigate reports and marketplace issues."
      action="Export Reports"
    >
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex flex-1 gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Icon name="flag" size={19} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold">
                      {report.reason}
                    </h3>

                    <StatusBadge>
                      {report.status}
                    </StatusBadge>
                  </div>

                  <p className="mt-2 text-sm text-[#60736F]">
                    {report.id} · Reported by{" "}
                    <span className="font-semibold text-[#123D38]">
                      {report.reporter}
                    </span>
                  </p>

                  <p className="mt-1 text-sm text-[#60736F]">
                    Target:{" "}
                    <span className="font-semibold text-[#123D38]">
                      {report.target}
                    </span>
                  </p>
                </div>
              </div>

              <button className="rounded-xl border border-[#DCE5E1] px-4 py-2.5 text-sm font-semibold text-[#0F4C45] hover:bg-[#F8F3E8]">
                Investigate
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function ReviewsSection() {
  return (
    <PageSection
      eyebrow="Trust & Safety"
      title="Reviews"
      description="Monitor customer feedback across the marketplace."
      action="Review Moderation"
    >
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="rounded-2xl border border-[#DCE5E1] bg-[#083A35] p-6 text-white">
          <p className="text-sm text-white/60">
            Marketplace rating
          </p>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-black">
              4.8
            </span>

            <span className="mb-2 text-sm text-white/60">
              / 5
            </span>
          </div>

          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon key={star} name="star" size={17} />
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-white/60">
            Based on customer feedback from completed jobs.
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold">
                    {review.customer}
                  </p>

                  <p className="mt-1 text-xs text-[#60736F]">
                    Reviewed {review.artisan}
                  </p>
                </div>

                <span className="text-xs text-[#60736F]">
                  {review.date}
                </span>
              </div>

              <div className="mt-4 flex gap-1 text-[#D5A63A]">
                {Array.from({ length: review.rating }).map(
                  (_, index) => (
                    <Icon
                      key={index}
                      name="star"
                      size={16}
                    />
                  )
                )}
              </div>

              <p className="mt-3 text-sm leading-6 text-[#60736F]">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

/* =========================================================
   ANALYTICS
========================================================= */

function AnalyticsSection() {
  const months = [
    ["Apr", 42],
    ["May", 56],
    ["Jun", 63],
    ["Jul", 72],
    ["Aug", 86],
    ["Sep", 94],
  ];

  return (
    <PageSection
      eyebrow="Insights"
      title="Analytics"
      description="Understand growth, bookings, customers, and artisan activity."
      action="Export Data"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="New Customers"
          value="184"
          description="This month"
          icon="users"
          trend="+14%"
        />

        <StatCard
          title="New Artisans"
          value="47"
          description="This month"
          icon="briefcase"
          trend="+9%"
        />

        <StatCard
          title="Completed Jobs"
          value="392"
          description="This month"
          icon="calendar"
          trend="+17%"
        />

        <StatCard
          title="Avg. Rating"
          value="4.8"
          description="Across all reviews"
          icon="star"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-[#DCE5E1] bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h3 className="font-bold">Monthly marketplace growth</h3>
          <p className="mt-1 text-xs text-[#60736F]">
            Relative completed-job activity
          </p>
        </div>

        <div className="mt-8 flex h-[280px] items-end gap-3 sm:gap-6">
          {months.map(([month, value]) => (
            <div
              key={month}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <div className="mb-2 text-center text-xs font-bold text-[#0F4C45]">
                {value}
              </div>

              <div
                className="rounded-t-xl bg-[#C85A3F] transition duration-500 hover:bg-[#0F4C45]"
                style={{
                  height: `${Number(value)}%`,
                }}
              />

              <div className="mt-3 text-center text-xs font-medium text-[#60736F]">
                {month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsSection() {
  return (
    <PageSection
      eyebrow="System"
      title="Settings"
      description="Manage admin preferences and platform configuration."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <SettingCard
          title="Platform settings"
          description="Configure general marketplace behavior."
          icon="settings"
        />

        <SettingCard
          title="Notifications"
          description="Control admin alerts and platform notifications."
          icon="bell"
        />

        <SettingCard
          title="Security"
          description="Manage administrator access and security preferences."
          icon="shield"
        />

        <SettingCard
          title="Account"
          description="Update your administrator account information."
          icon="user"
        />
      </div>
    </PageSection>
  );
}

function SettingCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <button className="group flex items-start gap-4 rounded-2xl border border-[#DCE5E1] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8F3E8] text-[#0F4C45]">
        <Icon name={icon} size={20} />
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-[#60736F]">
          {description}
        </p>

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#C85A3F]">
          Configure
          <Icon name="arrow" size={15} />
        </span>
      </div>
    </button>
  );
}

/* =========================================================
   HELP
========================================================= */

function HelpSection() {
  return (
    <PageSection
      eyebrow="System"
      title="Help & Support"
      description="Get assistance with managing the Amana platform."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <HelpCard
          title="Admin documentation"
          description="Learn how each admin section works."
        />

        <HelpCard
          title="Technical support"
          description="Report technical issues with the platform."
        />

        <HelpCard
          title="Safety procedures"
          description="Review procedures for reports and user safety."
        />
      </div>
    </PageSection>
  );
}

function HelpCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#DCE5E1] bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F3E8] text-[#0F4C45]">
        <Icon name="help" size={20} />
      </div>

      <h3 className="mt-5 font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-[#60736F]">
        {description}
      </p>

      <button className="mt-5 text-sm font-semibold text-[#C85A3F] hover:underline">
        Learn more
      </button>
    </div>
  );
}

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function PageSection({
  eyebrow,
  title,
  description,
  action,
  onAction,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-7 animate-[fadeUp_.45s_ease-out]">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-[#C85A3F]">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#60736F]">
            {description}
          </p>
        </div>

        {action && (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C85A3F] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#A94632] hover:shadow-md"
          >
            <Icon name="plus" size={17} />
            {action}
          </button>
        )}
      </section>

      {children}
    </div>
  );
}

function Avatar({
  name,
  color,
}: {
  name: string;
  color: "teal" | "terracotta";
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
        color === "teal"
          ? "bg-[#E6F0ED] text-[#0F4C45]"
          : "bg-[#F9E7E1] text-[#A94632]"
      }`}
    >
      {initials}
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-[#F7F8F6] p-3">
      <p className="text-xs text-[#60736F]">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F3E8] text-[#0F4C45]">
        <Icon name="search" size={20} />
      </div>

      <h3 className="mt-4 font-bold">{title}</h3>

      <p className="mt-1 text-sm text-[#60736F]">
        {description}
      </p>
    </div>
  );
}