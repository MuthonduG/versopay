import { useState } from 'react'
import {
  MdOutlineNotifications,
  MdAdminPanelSettings,
  MdVerified,
  MdWarningAmber,
  MdTrendingUp,
} from 'react-icons/md'
import { IoPeopleOutline } from 'react-icons/io5'
import {
  FaSearch,
  FaEllipsisH,
  FaFilter,
  FaPlus,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaUpload,
} from 'react-icons/fa'

/* ── types ─────────────────────────────────────────────── */

type MemberStatus  = 'Active' | 'Pending' | 'Inactive'
type RoleFilter    = 'All' | 'Administrator' | 'Treasurer' | 'Member' | 'Auditor' | 'Secretary'
type StatusFilter  = 'All' | MemberStatus

/* ── data ──────────────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Total Members',
    value: '1,240',
    sub: 'Across all groups',
    subColor: 'text-gray-500',
    icon: <IoPeopleOutline className="text-xl text-blue-600" />,
    iconBg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Active Subscriptions',
    value: '986',
    sub: '↑ 14 new this week',
    subColor: 'text-green-600',
    icon: <MdVerified className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Pending Verification',
    value: '15',
    sub: '⚠ Needs review',
    subColor: 'text-yellow-600',
    icon: <MdWarningAmber className="text-xl text-yellow-600" />,
    iconBg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },
  {
    label: 'New (This Month)',
    value: '45',
    sub: '↑ Growth rate stable',
    subColor: 'text-green-600',
    icon: <MdTrendingUp className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
]

interface Member {
  id: string
  name: string
  email: string
  role: RoleFilter | string
  group: string
  phone: string
  joinedDate: string
  status: MemberStatus
  avatarInitials: string
  avatarColor: string
}

const allMembers: Member[] = [
  { id: 'M-001', name: 'Sarah K.',       email: 'sarah.k@example.com',    role: 'Administrator', group: 'Executive Team',  phone: '+254 712 345 678', joinedDate: 'Jan 12, 2023', status: 'Active',   avatarInitials: 'SK', avatarColor: 'bg-purple-500' },
  { id: 'M-002', name: 'James Mwangi',   email: 'james.m@example.com',    role: 'Member',        group: 'Operations',     phone: '+254 722 111 222', joinedDate: 'Mar 04, 2023', status: 'Active',   avatarInitials: 'JM', avatarColor: 'bg-blue-500'   },
  { id: 'M-003', name: 'Lucy Achieng',   email: 'lucy.a@example.com',     role: 'Treasurer',     group: 'Finance Comm.',  phone: '+254 733 444 555', joinedDate: 'Feb 20, 2023', status: 'Active',   avatarInitials: 'LA', avatarColor: 'bg-green-500'  },
  { id: 'M-004', name: 'Kevin Omondi',   email: 'k.omondi@example.com',   role: 'Member',        group: 'General',        phone: '+254 711 999 000', joinedDate: 'Jun 15, 2023', status: 'Pending',  avatarInitials: 'KO', avatarColor: 'bg-amber-500'  },
  { id: 'M-005', name: 'Grace Wanjiku',  email: 'grace.w@example.com',    role: 'Member',        group: 'Sales',          phone: '+254 700 888 777', joinedDate: 'Aug 01, 2023', status: 'Inactive', avatarInitials: 'GW', avatarColor: 'bg-pink-500'   },
  { id: 'M-006', name: 'Peter Omondi',   email: 'peter.o@example.com',    role: 'Secretary',     group: 'Executive Team', phone: '+254 755 234 567', joinedDate: 'Jan 28, 2023', status: 'Active',   avatarInitials: 'PO', avatarColor: 'bg-teal-500'   },
  { id: 'M-007', name: 'Faith Waweru',   email: 'faith.w@example.com',    role: 'Member',        group: 'Finance Comm.',  phone: '+254 766 345 678', joinedDate: 'Sep 10, 2023', status: 'Active',   avatarInitials: 'FW', avatarColor: 'bg-indigo-500' },
  { id: 'M-008', name: 'Brian Otieno',   email: 'brian.o@example.com',    role: 'Auditor',       group: 'Compliance',     phone: '+254 777 456 789', joinedDate: 'Apr 05, 2023', status: 'Active',   avatarInitials: 'BO', avatarColor: 'bg-red-500'    },
  { id: 'M-009', name: 'Mary Achieng',   email: 'mary.a@example.com',     role: 'Member',        group: 'General',        phone: '+254 788 567 890', joinedDate: 'Oct 22, 2023', status: 'Pending',  avatarInitials: 'MA', avatarColor: 'bg-orange-500' },
  { id: 'M-010', name: 'David Koech',    email: 'david.k@example.com',    role: 'Member',        group: 'Operations',     phone: '+254 799 678 901', joinedDate: 'Jul 17, 2023', status: 'Active',   avatarInitials: 'DK', avatarColor: 'bg-cyan-500'   },
  { id: 'M-011', name: 'Linet Njeri',    email: 'linet.n@example.com',    role: 'Treasurer',     group: 'Finance Comm.',  phone: '+254 700 789 012', joinedDate: 'May 30, 2023', status: 'Active',   avatarInitials: 'LN', avatarColor: 'bg-lime-600'   },
  { id: 'M-012', name: 'Samuel Kimani',  email: 'samuel.k@example.com',   role: 'Member',        group: 'Sales',          phone: '+254 711 890 123', joinedDate: 'Nov 03, 2023', status: 'Pending',  avatarInitials: 'SK', avatarColor: 'bg-violet-500' },
  { id: 'M-013', name: 'Asha Mohamed',   email: 'asha.m@example.com',     role: 'Secretary',     group: 'Executive Team', phone: '+254 722 901 234', joinedDate: 'Feb 14, 2023', status: 'Active',   avatarInitials: 'AM', avatarColor: 'bg-rose-500'   },
  { id: 'M-014', name: 'George Njoroge', email: 'george.n@example.com',   role: 'Auditor',       group: 'Compliance',     phone: '+254 733 012 345', joinedDate: 'Mar 19, 2023', status: 'Inactive', avatarInitials: 'GN', avatarColor: 'bg-sky-500'    },
  { id: 'M-015', name: 'Alice Wanjiku',  email: 'alice.w@example.com',    role: 'Member',        group: 'General',        phone: '+254 744 123 456', joinedDate: 'Dec 08, 2022', status: 'Active',   avatarInitials: 'AW', avatarColor: 'bg-emerald-500'},
]

/* ── helpers ─────────────────────────────────────────────── */

const statusStyle: Record<MemberStatus, string> = {
  Active:   'bg-green-100  text-green-700',
  Pending:  'bg-yellow-100 text-yellow-700',
  Inactive: 'bg-gray-100   text-gray-500',
}

const roleStyle: Record<string, string> = {
  Administrator: 'text-purple-700',
  Treasurer:     'text-blue-700',
  Secretary:     'text-indigo-700',
  Auditor:       'text-red-600',
  Member:        'text-gray-600',
}

const roleFilters:   RoleFilter[]   = ['All', 'Administrator', 'Treasurer', 'Secretary', 'Auditor', 'Member']
const statusFilters: StatusFilter[] = ['All', 'Active', 'Pending', 'Inactive']
const PAGE_SIZE = 5

/* ── component ──────────────────────────────────────────── */

const Members = () => {
  const [search,       setSearch]       = useState('')
  const [roleFilter,   setRoleFilter]   = useState<RoleFilter>('All')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [page,         setPage]         = useState(1)
  const [openMenu,     setOpenMenu]     = useState<string | null>(null)
  const [showRole,     setShowRole]     = useState(false)
  const [showStatus,   setShowStatus]   = useState(false)

  const filtered = allMembers.filter((m) => {
    const matchRole   = roleFilter   === 'All' || m.role   === roleFilter
    const matchStatus = statusFilter === 'All' || m.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch =
      m.name.toLowerCase().includes(q)  ||
      m.email.toLowerCase().includes(q) ||
      m.group.toLowerCase().includes(q)
    return matchRole && matchStatus && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (v: string) => { setSearch(v);   setPage(1) }
  const closeDrops   = ()          => { setShowRole(false); setShowStatus(false) }

  return (
    <div className="min-h-full bg-gray-50" onClick={() => { setOpenMenu(null); closeDrops() }}>

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Members</h1>
        <div className="flex items-center gap-4">
          <button type="button" className="relative p-2 text-gray-500 hover:text-yellow-600 transition-colors">
            <MdOutlineNotifications className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <span className="text-sm text-gray-500">Support</span>
        </div>
      </header>

      <div className="px-4 md:px-8 py-6 space-y-6">

        {/* Page heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Members</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage group members, track subscriptions, and monitor payment compliance.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaUpload className="text-xs text-gray-400" />
              Import Members
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md"
            >
              <FaPlus className="text-xs" />
              Add Member
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className={`bg-white rounded-xl border ${card.border} p-5 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{card.label}</p>
                <div className={`${card.iconBg} p-2 rounded-lg`}>{card.icon}</div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className={`text-xs mt-1 font-medium ${card.subColor}`}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-400 bg-gray-50 transition-all"
              />
            </div>

            {/* Right filters */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Role filter */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowRole(!showRole); setShowStatus(false) }}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                >
                  <FaFilter className="text-gray-400 text-xs" />
                  Role: {roleFilter}
                  <FaChevronDown className="text-gray-400 text-[10px]" />
                </button>
                {showRole && (
                  <div
                    className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {roleFilters.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { setRoleFilter(r); setPage(1); setShowRole(false) }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          roleFilter === r
                            ? 'bg-yellow-50 text-yellow-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status filter */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowStatus(!showStatus); setShowRole(false) }}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                >
                  <MdAdminPanelSettings className="text-gray-400 text-sm" />
                  Status: {statusFilter}
                  <FaChevronDown className="text-gray-400 text-[10px]" />
                </button>
                {showStatus && (
                  <div
                    className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-36"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {statusFilters.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { setStatusFilter(s); setPage(1); setShowStatus(false) }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          statusFilter === s
                            ? 'bg-yellow-50 text-yellow-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Member</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Group / Dept</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden xl:table-cell">Phone</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Joined Date</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">
                      No members match your search or filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">

                      {/* Member */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${m.avatarColor} flex items-center justify-center shrink-0`}>
                            <span className="text-white text-xs font-bold">{m.avatarInitials}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{m.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{m.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-4">
                        <span className={`text-sm font-semibold ${roleStyle[m.role] ?? 'text-gray-600'}`}>
                          {m.role}
                        </span>
                      </td>

                      {/* Group */}
                      <td className="px-4 py-4 text-sm text-blue-600 font-medium hidden lg:table-cell">{m.group}</td>

                      {/* Phone */}
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap hidden xl:table-cell font-mono">
                        {m.phone}
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap hidden lg:table-cell">
                        {m.joinedDate}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[m.status]}`}>
                          {m.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 pr-6 relative">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === m.id ? null : m.id) }}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Member actions"
                        >
                          <FaEllipsisH />
                        </button>
                        {openMenu === m.id && (
                          <div
                            className="absolute right-6 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-44"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                              View Profile
                            </button>
                            <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                              Edit Member
                            </button>
                            <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                              Payment History
                            </button>
                            <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                              Send Reminder
                            </button>
                            {m.status === 'Pending' && (
                              <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-yellow-700 hover:bg-yellow-50 transition-colors">
                                Verify Member
                              </button>
                            )}
                            <div className="border-t border-gray-100 my-1" />
                            <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              {m.status === 'Inactive' ? 'Remove Member' : 'Deactivate'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {paginated.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-gray-400">No members found.</p>
            ) : (
              paginated.map((m) => (
                <div key={m.id} className="flex items-start gap-3 px-4 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className={`w-10 h-10 rounded-full ${m.avatarColor} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold">{m.avatarInitials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{m.email}</p>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[m.status]}`}>
                        {m.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                      <span className={`text-xs font-semibold ${roleStyle[m.role] ?? 'text-gray-600'}`}>{m.role}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-blue-600 font-medium">{m.group}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-mono">{m.phone}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-3 border-t border-gray-100 bg-gray-50/30">
            <p className="text-xs text-gray-400">
              Showing{' '}
              <span className="font-semibold text-gray-600">
                {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{' '}
              of <span className="font-semibold text-gray-600">{filtered.length}</span> members
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft className="text-[10px]" /> Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                .reduce<(number | '...')[]>((acc, n, idx, arr) => {
                  if (idx > 0 && (n as number) - (arr[idx - 1] as number) > 1) acc.push('...')
                  acc.push(n)
                  return acc
                }, [])
                .map((item, i) =>
                  item === '...' ? (
                    <span key={`el-${i}`} className="px-2 text-xs text-gray-400">…</span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPage(item as number)}
                      className={`w-7 h-7 text-xs font-semibold rounded-lg transition-colors ${
                        page === item
                          ? 'bg-yellow-500 text-white shadow-sm'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members
