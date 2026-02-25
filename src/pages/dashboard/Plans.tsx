import { useState } from 'react'
import { MdOutlineNotifications, MdTrendingUp, MdPending, MdCheckCircle, MdWarningAmber } from 'react-icons/md'
import { FaWallet, FaPlus, FaSearch, FaFilter, FaEllipsisH, FaEdit, FaTrashAlt, FaPause, FaPlay } from 'react-icons/fa'
import { IoMdRepeat } from 'react-icons/io'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { GiBank } from 'react-icons/gi'
import { HiOutlineSparkles } from 'react-icons/hi'

/* ── types ────────────────────────────────────────────── */

type PlanStatus = 'Active' | 'Scheduled' | 'Paused'
type FilterTab  = 'All' | PlanStatus

/* ── data ─────────────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Active Plans',
    value: '14',
    sub: '↑ 2 added this month',
    subColor: 'text-green-600',
    icon: <MdCheckCircle className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Recurring Revenue / Mo',
    value: 'KES 1.8M',
    sub: '↑ 6.3% vs last month',
    subColor: 'text-green-600',
    icon: <MdTrendingUp className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Total Subscribers',
    value: '1,240',
    sub: '+38 new this week',
    subColor: 'text-yellow-600',
    icon: <IoMdRepeat className="text-xl text-yellow-600" />,
    iconBg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },
  {
    label: 'Pending Approvals',
    value: '3',
    sub: 'Requires review',
    subColor: 'text-red-600',
    icon: <MdPending className="text-xl text-red-500" />,
    iconBg: 'bg-red-50',
    border: 'border-red-100',
  },
]

interface Plan {
  id: string
  name: string
  subtitle: string
  type: 'Collection' | 'Disbursement'
  frequency: 'Monthly' | 'Weekly' | 'Quarterly' | 'Ad-hoc' | 'Bi-Weekly'
  amount: string
  nextRun: string
  status: PlanStatus
  subscribers: number
  iconType: 'wallet' | 'repeat' | 'bank' | 'money' | 'sparkle'
  iconBg: string
  iconColor: string
}

const plans: Plan[] = [
  {
    id: 'P-001',
    name: 'Gold Membership',
    subtitle: 'Monthly SACCO Fee',
    type: 'Collection',
    frequency: 'Monthly',
    amount: 'KES 1,000',
    nextRun: 'Nov 1, 2024',
    status: 'Active',
    subscribers: 142,
    iconType: 'wallet',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    id: 'P-002',
    name: 'Loan Repayment Wk42',
    subtitle: 'Group B Loans',
    type: 'Collection',
    frequency: 'Weekly',
    amount: 'KES 500',
    nextRun: 'Oct 28, 2024',
    status: 'Active',
    subscribers: 48,
    iconType: 'repeat',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    id: 'P-003',
    name: 'Staff Salaries',
    subtitle: 'Payroll Disbursement',
    type: 'Disbursement',
    frequency: 'Monthly',
    amount: 'KES 45,000',
    nextRun: 'Oct 30, 2024',
    status: 'Active',
    subscribers: 24,
    iconType: 'money',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    id: 'P-004',
    name: 'Q3 Dividend Payout',
    subtitle: 'Shareholder Distribution',
    type: 'Disbursement',
    frequency: 'Quarterly',
    amount: 'Variable',
    nextRun: 'Dec 15, 2024',
    status: 'Scheduled',
    subscribers: 60,
    iconType: 'bank',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    id: 'P-005',
    name: 'Emergency Fund',
    subtitle: 'Voluntary Contribution',
    type: 'Collection',
    frequency: 'Ad-hoc',
    amount: 'KES 200',
    nextRun: '—',
    status: 'Paused',
    subscribers: 33,
    iconType: 'sparkle',
    iconBg: 'bg-gray-50',
    iconColor: 'text-gray-400',
  },
  {
    id: 'P-006',
    name: 'Merry-Go-Round',
    subtitle: 'Bi-weekly rotating payout',
    type: 'Collection',
    frequency: 'Bi-Weekly',
    amount: 'KES 500',
    nextRun: 'Nov 4, 2024',
    status: 'Active',
    subscribers: 210,
    iconType: 'repeat',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-500',
  },
  {
    id: 'P-007',
    name: 'Gym Monthly Fee',
    subtitle: 'Membership Renewal',
    type: 'Collection',
    frequency: 'Monthly',
    amount: 'KES 3,000',
    nextRun: 'Nov 1, 2024',
    status: 'Active',
    subscribers: 95,
    iconType: 'wallet',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    id: 'P-008',
    name: 'ISP Annual Renewal',
    subtitle: 'Internet Subscription',
    type: 'Collection',
    frequency: 'Monthly',
    amount: 'KES 1,500',
    nextRun: 'Nov 5, 2024',
    status: 'Scheduled',
    subscribers: 72,
    iconType: 'sparkle',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
  },
]

/* ── helpers ──────────────────────────────────────────── */

const PlanIcon = ({ type, bg, color }: { type: Plan['iconType']; bg: string; color: string }) => {
  const cls = `text-lg ${color}`
  const icon =
    type === 'wallet'  ? <FaWallet className={cls} />                    :
    type === 'repeat'  ? <IoMdRepeat className={cls} />                  :
    type === 'bank'    ? <GiBank className={cls} />                      :
    type === 'money'   ? <RiMoneyDollarCircleFill className={cls} />     :
                         <HiOutlineSparkles className={cls} />

  return (
    <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
      {icon}
    </div>
  )
}

const statusStyle: Record<PlanStatus, string> = {
  Active:    'bg-green-100  text-green-700',
  Scheduled: 'bg-blue-100   text-blue-700',
  Paused:    'bg-gray-100   text-gray-500',
}

const freqStyle: Record<string, string> = {
  Monthly:   'bg-yellow-50  text-yellow-700',
  Weekly:    'bg-green-50   text-green-700',
  Quarterly: 'bg-purple-50  text-purple-700',
  'Bi-Weekly': 'bg-amber-50 text-amber-700',
  'Ad-hoc':  'bg-gray-50    text-gray-600',
}

const filterTabs: FilterTab[] = ['All', 'Active', 'Scheduled', 'Paused']

/* ── component ────────────────────────────────────────── */

const Plans = () => {
  const [filter, setFilter]   = useState<FilterTab>('All')
  const [search, setSearch]   = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const visible = plans.filter((p) => {
    const matchTab    = filter === 'All' || p.status === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.subtitle.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="min-h-full bg-gray-50">

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Recurring Plans</h1>
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
            <h2 className="text-2xl font-bold text-gray-900">Recurring Plans</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage subscription and collection plans, track schedules and defaulters.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md self-start sm:self-auto"
          >
            <FaPlus className="text-xs" />
            Create New Plan
          </button>
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

        {/* Plans table card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">

            {/* Filter tabs + search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
              {/* Tab group */}
              <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold shrink-0">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 transition-colors border-l border-gray-200 first:border-l-0 ${
                      filter === tab
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                    {tab !== 'All' && (
                      <span className="ml-1 opacity-70">
                        ({plans.filter((p) => p.status === tab).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-56">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search plans…"
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-400 bg-gray-50 transition-all"
                />
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors shrink-0"
            >
              <FaFilter className="text-gray-400" />
              Filter
            </button>
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Plan Name</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Frequency</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Next Run</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Subscribers</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-400">
                      No plans match your search or filter.
                    </td>
                  </tr>
                ) : (
                  visible.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Plan name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <PlanIcon type={plan.iconType} bg={plan.iconBg} color={plan.iconColor} />
                          <div>
                            <p className="font-semibold text-gray-800">{plan.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{plan.subtitle}</p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          plan.type === 'Collection'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-purple-50 text-purple-700'
                        }`}>
                          {plan.type}
                        </span>
                      </td>

                      {/* Frequency */}
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${freqStyle[plan.frequency] ?? 'bg-gray-50 text-gray-600'}`}>
                          {plan.frequency}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4 font-semibold text-gray-800">{plan.amount}</td>

                      {/* Next run */}
                      <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{plan.nextRun}</td>

                      {/* Subscribers */}
                      <td className="px-4 py-4 text-gray-700 font-medium">{plan.subscribers.toLocaleString()}</td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[plan.status]}`}>
                          {plan.status}
                        </span>
                      </td>

                      {/* Actions menu */}
                      <td className="px-4 py-4 pr-6 relative">
                        <button
                          type="button"
                          onClick={() => setOpenMenu(openMenu === plan.id ? null : plan.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Actions"
                        >
                          <FaEllipsisH />
                        </button>

                        {openMenu === plan.id && (
                          <div className="absolute right-6 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-40">
                            <button
                              type="button"
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
                              onClick={() => setOpenMenu(null)}
                            >
                              <FaEdit className="text-gray-400 text-xs" /> Edit Plan
                            </button>
                            <button
                              type="button"
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
                              onClick={() => setOpenMenu(null)}
                            >
                              {plan.status === 'Paused'
                                ? <><FaPlay className="text-green-400 text-xs" /> Resume Plan</>
                                : <><FaPause className="text-amber-400 text-xs" /> Pause Plan</>
                              }
                            </button>
                            <div className="border-t border-gray-100 my-1" />
                            <button
                              type="button"
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              onClick={() => setOpenMenu(null)}
                            >
                              <FaTrashAlt className="text-xs" /> Delete
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
            {visible.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-gray-400">No plans found.</p>
            ) : (
              visible.map((plan) => (
                <div key={plan.id} className="flex items-start gap-3 px-4 py-4 hover:bg-gray-50/50 transition-colors">
                  <PlanIcon type={plan.iconType} bg={plan.iconBg} color={plan.iconColor} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{plan.name}</p>
                        <p className="text-xs text-gray-400">{plan.subtitle}</p>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[plan.status]}`}>
                        {plan.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-gray-500">{plan.type}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{plan.frequency}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs font-semibold text-gray-800">{plan.amount}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Next run: {plan.nextRun}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Table footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50/30">
            <p className="text-xs text-gray-400">
              Showing <span className="font-semibold text-gray-600">{visible.length}</span> of{' '}
              <span className="font-semibold text-gray-600">{plans.length}</span> plans
            </p>
            <div className="flex items-center gap-2">
              <button type="button" disabled className="px-3 py-1 text-xs text-gray-400 border border-gray-200 rounded-lg bg-white disabled:opacity-40">
                Previous
              </button>
              <button type="button" className="px-3 py-1 text-xs text-gray-600 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plans
