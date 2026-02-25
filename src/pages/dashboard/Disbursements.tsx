import { useState, type ReactElement } from 'react'
import {
  MdOutlineNotifications,
  MdWarningAmber,
  MdPending,
  MdAccountBalanceWallet,
  MdTrendingUp,
} from 'react-icons/md'
import {
  FaSearch,
  FaEllipsisH,
  FaFilter,
  FaPlus,
  FaWallet,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
} from 'react-icons/fa'
import { BsDownload, BsCalendar3, BsUpload } from 'react-icons/bs'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { GiBank } from 'react-icons/gi'

/* ── types ─────────────────────────────────────────────── */

type DisbStatus    = 'Sent' | 'Processing' | 'Failed' | 'Pending'
type MethodKey     = 'equity' | 'mpesa' | 'airtel' | 'kcb' | 'paybill' | 'bank'
type CategoryFilter = 'All' | 'Salary' | 'Vendor Payment' | 'Dividend' | 'Loan' | 'Refund'

/* ── data ──────────────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Wallet Balance',
    value: 'KES 850K',
    sub: 'Available for payout',
    subColor: 'text-green-600',
    icon: <MdAccountBalanceWallet className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Total Disbursed',
    value: 'KES 3.2M',
    sub: 'Last 30 days',
    subColor: 'text-gray-500',
    icon: <MdTrendingUp className="text-xl text-blue-600" />,
    iconBg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Pending Approvals',
    value: '8',
    sub: '⚠ Action required',
    subColor: 'text-yellow-600',
    icon: <MdPending className="text-xl text-yellow-600" />,
    iconBg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },
  {
    label: 'Failed Payouts',
    value: '3',
    sub: 'Review & retry',
    subColor: 'text-red-600',
    icon: <MdWarningAmber className="text-xl text-red-500" />,
    iconBg: 'bg-red-50',
    border: 'border-red-100',
  },
]

interface Disbursement {
  id: string
  recipient: string
  note: string
  datetime: string
  type: CategoryFilter | string
  method: MethodKey
  methodLabel: string
  amount: string
  status: DisbStatus
}

const allDisbursements: Disbursement[] = [
  { id: 'PO-9921', recipient: 'James Mwangi',       note: 'Staff · Operations',       datetime: 'Oct 24, 11:30 AM', type: 'Salary',         method: 'equity',  methodLabel: 'Equity Bank',   amount: 'KES 45,000.00',  status: 'Sent'       },
  { id: 'PO-9920', recipient: 'CleanFix Services',  note: 'Vendor #882',              datetime: 'Oct 24, 10:15 AM', type: 'Vendor Payment', method: 'paybill', methodLabel: 'M-Pesa Paybill',amount: 'KES 8,500.00',   status: 'Sent'       },
  { id: 'PO-9919', recipient: 'Lucy A.',             note: 'Member Dividend',          datetime: 'Oct 24, 09:45 AM', type: 'Dividend',       method: 'mpesa',   methodLabel: 'M-Pesa',        amount: 'KES 3,200.00',   status: 'Processing' },
  { id: 'PO-9918', recipient: 'Office Supplies Co.', note: 'Invoice #INV-202',        datetime: 'Oct 23, 03:20 PM', type: 'Vendor Payment', method: 'kcb',     methodLabel: 'KCB Bank',      amount: 'KES 12,400.00',  status: 'Failed'     },
  { id: 'PO-9917', recipient: 'Kevin Omondi',        note: 'Loan Disbursement',       datetime: 'Oct 23, 01:10 PM', type: 'Loan',           method: 'airtel',  methodLabel: 'Airtel Money',  amount: 'KES 10,000.00',  status: 'Sent'       },
  { id: 'PO-9916', recipient: 'SACCO Dividends',     note: 'Q3 Payout · 48 members', datetime: 'Oct 23, 10:00 AM', type: 'Dividend',       method: 'bank',    methodLabel: 'Bank Transfer', amount: 'KES 120,000.00', status: 'Processing' },
  { id: 'PO-9915', recipient: 'Mary Achieng',        note: 'Staff · Finance',         datetime: 'Oct 22, 04:45 PM', type: 'Salary',         method: 'equity',  methodLabel: 'Equity Bank',   amount: 'KES 38,000.00',  status: 'Sent'       },
  { id: 'PO-9914', recipient: 'TechServe Ltd',       note: 'Invoice #INV-198',        datetime: 'Oct 22, 02:30 PM', type: 'Vendor Payment', method: 'kcb',     methodLabel: 'KCB Bank',      amount: 'KES 27,500.00',  status: 'Pending'    },
  { id: 'PO-9913', recipient: 'Peter Omondi',        note: 'Emergency Loan',          datetime: 'Oct 22, 11:15 AM', type: 'Loan',           method: 'mpesa',   methodLabel: 'M-Pesa',        amount: 'KES 5,000.00',   status: 'Sent'       },
  { id: 'PO-9912', recipient: 'David Koech',         note: 'Chama Payout',            datetime: 'Oct 21, 03:00 PM', type: 'Dividend',       method: 'mpesa',   methodLabel: 'M-Pesa',        amount: 'KES 4,500.00',   status: 'Sent'       },
  { id: 'PO-9911', recipient: 'FreshMart Supplies',  note: 'Vendor #901',             datetime: 'Oct 21, 01:20 PM', type: 'Vendor Payment', method: 'paybill', methodLabel: 'M-Pesa Paybill',amount: 'KES 6,800.00',   status: 'Failed'     },
  { id: 'PO-9910', recipient: 'Grace Njeri',         note: 'Salary · Admin',          datetime: 'Oct 21, 10:00 AM', type: 'Salary',         method: 'equity',  methodLabel: 'Equity Bank',   amount: 'KES 32,000.00',  status: 'Sent'       },
  { id: 'PO-9909', recipient: 'Brian Otieno',        note: 'Customer Refund',         datetime: 'Oct 20, 05:00 PM', type: 'Refund',         method: 'mpesa',   methodLabel: 'M-Pesa',        amount: 'KES 2,000.00',   status: 'Sent'       },
  { id: 'PO-9908', recipient: 'ISP Infrastructure',  note: 'Monthly Lease',           datetime: 'Oct 20, 02:15 PM', type: 'Vendor Payment', method: 'bank',    methodLabel: 'Bank Transfer', amount: 'KES 55,000.00',  status: 'Pending'    },
  { id: 'PO-9907', recipient: 'Faith Waweru',        note: 'Loan Repayment Payout',   datetime: 'Oct 20, 11:30 AM', type: 'Loan',           method: 'airtel',  methodLabel: 'Airtel Money',  amount: 'KES 7,500.00',   status: 'Failed'     },
]

/* ── helpers ─────────────────────────────────────────────── */

const typeIcon = (type: string) => {
  switch (type) {
    case 'Salary':         return <FaMoneyCheckAlt className="text-blue-500 text-sm" />
    case 'Vendor Payment': return <FaFileInvoiceDollar className="text-purple-500 text-sm" />
    case 'Dividend':       return <FaHandHoldingUsd className="text-green-500 text-sm" />
    case 'Loan':           return <FaWallet className="text-amber-500 text-sm" />
    default:               return <RiMoneyDollarCircleFill className="text-gray-400 text-sm" />
  }
}

const MethodBadge = ({ method, label }: { method: MethodKey; label: string }) => {
  const cfg: Record<MethodKey, { bg: string; cls: string; icon: ReactElement }> = {
    equity:  { bg: 'bg-purple-100', cls: 'text-purple-600', icon: <GiBank /> },
    kcb:     { bg: 'bg-blue-100',   cls: 'text-blue-700',   icon: <GiBank /> },
    bank:    { bg: 'bg-blue-100',   cls: 'text-blue-600',   icon: <GiBank /> },
    mpesa:   { bg: 'bg-green-100',  cls: 'text-green-600',  icon: <FaWallet /> },
    paybill: { bg: 'bg-green-100',  cls: 'text-green-700',  icon: <FaWallet /> },
    airtel:  { bg: 'bg-red-100',    cls: 'text-red-500',    icon: <RiMoneyDollarCircleFill /> },
  }
  const c = cfg[method]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.cls}`}>
      {c.icon}
      {label}
    </span>
  )
}

const statusStyle: Record<DisbStatus, string> = {
  Sent:       'bg-green-100  text-green-700',
  Processing: 'bg-blue-100   text-blue-700',
  Pending:    'bg-yellow-100 text-yellow-700',
  Failed:     'bg-red-100    text-red-700',
}

const categoryFilters: CategoryFilter[] = ['All', 'Salary', 'Vendor Payment', 'Dividend', 'Loan', 'Refund']
const PAGE_SIZE = 5

/* ── component ──────────────────────────────────────────── */

const Disbursements = () => {
  const [search,    setSearch]    = useState('')
  const [category,  setCategory]  = useState<CategoryFilter>('All')
  const [page,      setPage]      = useState(1)
  const [openMenu,  setOpenMenu]  = useState<string | null>(null)
  const [showCat,   setShowCat]   = useState(false)

  const filtered = allDisbursements.filter((d) => {
    const matchCat = category === 'All' || d.type === category
    const q = search.toLowerCase()
    const matchSearch =
      d.id.toLowerCase().includes(q)         ||
      d.recipient.toLowerCase().includes(q)  ||
      d.note.toLowerCase().includes(q)       ||
      d.methodLabel.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch   = (v: string)          => { setSearch(v);   setPage(1) }
  const handleCategory = (v: CategoryFilter)  => { setCategory(v); setPage(1) }

  return (
    <div
      className="min-h-full bg-gray-50"
      onClick={() => { setOpenMenu(null); setShowCat(false) }}
    >

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Disbursements</h1>
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
            <h2 className="text-2xl font-bold text-gray-900">Disbursements</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Track outgoing payouts — salaries, dividends, loans, and vendor payments.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <BsUpload className="text-xs" />
              Bulk Upload
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <BsDownload className="text-xs" />
              Export CSV
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md"
            >
              <FaPlus className="text-xs" />
              New Payout
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
                placeholder="Search recipient or reference…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-400 bg-gray-50 transition-all"
              />
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Category dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowCat(!showCat) }}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                >
                  <FaFilter className="text-gray-400 text-xs" />
                  Category: {category}
                  <FaChevronDown className="text-gray-400 text-[10px]" />
                </button>
                {showCat && (
                  <div
                    className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {categoryFilters.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { handleCategory(c); setShowCat(false) }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          category === c
                            ? 'bg-yellow-50 text-yellow-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Period picker */}
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors"
              >
                <BsCalendar3 className="text-gray-400 text-xs" />
                This Month
                <FaChevronDown className="text-gray-400 text-[10px]" />
              </button>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Ref ID</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Recipient</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Date &amp; Time</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Method</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-400">
                      No disbursements match your search or filter.
                    </td>
                  </tr>
                ) : (
                  paginated.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">

                      {/* Ref ID */}
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{d.id}</td>

                      {/* Recipient */}
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800">{d.recipient}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{d.note}</p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-gray-500 whitespace-nowrap hidden lg:table-cell">{d.datetime}</td>

                      {/* Type */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                          {typeIcon(d.type)}
                          <span className="text-xs font-medium text-gray-600">{d.type}</span>
                        </span>
                      </td>

                      {/* Method */}
                      <td className="px-4 py-4">
                        <MethodBadge method={d.method} label={d.methodLabel} />
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4 font-bold text-gray-800">{d.amount}</td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[d.status]}`}>
                          {d.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 pr-6 relative">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === d.id ? null : d.id) }}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Actions"
                        >
                          <FaEllipsisH />
                        </button>
                        {openMenu === d.id && (
                          <div
                            className="absolute right-6 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-44"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                              View Details
                            </button>
                            <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                              Download Receipt
                            </button>
                            {d.status === 'Pending' && (
                              <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-yellow-700 hover:bg-yellow-50 transition-colors">
                                Approve
                              </button>
                            )}
                            {d.status === 'Failed' && (
                              <>
                                <div className="border-t border-gray-100 my-1" />
                                <button type="button" onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                  Retry Payout
                                </button>
                              </>
                            )}
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
              <p className="px-4 py-10 text-center text-sm text-gray-400">No disbursements found.</p>
            ) : (
              paginated.map((d) => (
                <div key={d.id} className="px-4 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{d.recipient}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{d.note}</p>
                    </div>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[d.status]}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <MethodBadge method={d.method} label={d.methodLabel} />
                    <span className="font-bold text-gray-800 text-sm">{d.amount}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      {typeIcon(d.type)}
                      {d.type}
                    </span>
                    <span className="font-mono text-xs text-gray-400">{d.id}</span>
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
              of <span className="font-semibold text-gray-600">{filtered.length}</span> entries
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

export default Disbursements
