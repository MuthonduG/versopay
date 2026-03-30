import { useState, type ReactElement } from 'react'
import { MdOutlineNotifications, MdTrendingUp, MdCheckCircle, MdWarningAmber, MdPending } from 'react-icons/md'
import { FaSearch, FaEllipsisH, FaFilter, FaPlus, FaWallet } from 'react-icons/fa'
import { BsDownload, BsCalendar3 } from 'react-icons/bs'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { GiBank } from 'react-icons/gi'
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

/* ── types ─────────────────────────────────────────────── */

type TxStatus  = 'Completed' | 'Pending' | 'Failed' | 'Processing'
type MethodKey = 'mpesa' | 'airtel' | 'bank' | 'momo' | 'equity' | 'kcb'
type StatusFilter = 'All' | TxStatus

/* ── data ──────────────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Total Collected',
    value: 'KES 2.4M',
    sub: '↑ 12% vs last month',
    subColor: 'text-green-600',
    icon: <MdTrendingUp className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Pending',
    value: 'KES 45K',
    sub: '24 transactions processing',
    subColor: 'text-yellow-600',
    icon: <MdPending className="text-xl text-yellow-600" />,
    iconBg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },
  {
    label: 'Success Rate',
    value: '98.2%',
    sub: '+0.5% improvement',
    subColor: 'text-green-600',
    icon: <MdCheckCircle className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Failed',
    value: 'KES 12K',
    sub: '8 failed transactions',
    subColor: 'text-red-600',
    icon: <MdWarningAmber className="text-xl text-red-500" />,
    iconBg: 'bg-red-50',
    border: 'border-red-100',
  },
]

interface Transaction {
  id: string
  member: string
  phone?: string
  note?: string
  datetime: string
  method: MethodKey
  methodLabel: string
  amount: string
  status: TxStatus
}

const allTransactions: Transaction[] = [
  { id: 'TXN-883920', member: 'John Kamau',    phone: '+254 712 *** 890', datetime: 'Oct 24, 10:42 AM', method: 'mpesa',  methodLabel: 'M-Pesa',       amount: 'KES 5,000.00',  status: 'Completed'  },
  { id: 'TXN-883919', member: 'Alice Wanjiku', phone: '+254 722 *** 111', datetime: 'Oct 24, 10:38 AM', method: 'momo',   methodLabel: 'MTN MoMo',     amount: 'KES 1,200.00',  status: 'Pending'    },
  { id: 'TXN-883918', member: 'Chama Group B', note: 'Monthly Contribution',  datetime: 'Oct 24, 09:15 AM', method: 'equity', methodLabel: 'Equity Bank',  amount: 'KES 15,000.00', status: 'Completed'  },
  { id: 'TXN-883917', member: 'Michael O.',    phone: '+254 799 *** 222', datetime: 'Oct 23, 04:50 PM', method: 'mpesa',  methodLabel: 'M-Pesa',       amount: 'KES 2,500.00',  status: 'Failed'     },
  { id: 'TXN-883916', member: 'Sarah K.',      phone: '+254 711 *** 333', datetime: 'Oct 23, 02:22 PM', method: 'airtel', methodLabel: 'Airtel Money',  amount: 'KES 800.00',    status: 'Completed'  },
  { id: 'TXN-883915', member: 'Peter Omondi',  phone: '+254 700 *** 444', datetime: 'Oct 23, 11:05 AM', method: 'kcb',    methodLabel: 'KCB Bank',     amount: 'KES 30,000.00', status: 'Processing' },
  { id: 'TXN-883914', member: 'Grace Njeri',   phone: '+254 733 *** 555', datetime: 'Oct 22, 03:10 PM', method: 'mpesa',  methodLabel: 'M-Pesa',       amount: 'KES 1,500.00',  status: 'Completed'  },
  { id: 'TXN-883913', member: 'David Koech',   phone: '+254 744 *** 666', datetime: 'Oct 22, 01:47 PM', method: 'mpesa',  methodLabel: 'M-Pesa',       amount: 'KES 5,000.00',  status: 'Completed'  },
  { id: 'TXN-883912', member: 'SACCO Group A', note: 'Dividend Collection',   datetime: 'Oct 22, 10:00 AM', method: 'bank',   methodLabel: 'Bank Transfer', amount: 'KES 45,000.00', status: 'Pending'    },
  { id: 'TXN-883911', member: 'Linet Achieng', phone: '+254 755 *** 777', datetime: 'Oct 21, 05:30 PM', method: 'momo',   methodLabel: 'MTN MoMo',     amount: 'KES 600.00',    status: 'Failed'     },
  { id: 'TXN-883910', member: 'Brian Otieno',  phone: '+254 766 *** 888', datetime: 'Oct 21, 02:15 PM', method: 'airtel', methodLabel: 'Airtel Money',  amount: 'KES 1,000.00',  status: 'Completed'  },
  { id: 'TXN-883909', member: 'Mary Achieng',  phone: '+254 777 *** 999', datetime: 'Oct 21, 11:40 AM', method: 'mpesa',  methodLabel: 'M-Pesa',       amount: 'KES 2,000.00',  status: 'Processing' },
  { id: 'TXN-883908', member: 'James Mutua',   phone: '+254 788 *** 000', datetime: 'Oct 20, 04:00 PM', method: 'equity', methodLabel: 'Equity Bank',  amount: 'KES 10,000.00', status: 'Completed'  },
  { id: 'TXN-883907', member: 'Faith Waweru',  phone: '+254 799 *** 001', datetime: 'Oct 20, 02:30 PM', method: 'mpesa',  methodLabel: 'M-Pesa',       amount: 'KES 3,500.00',  status: 'Completed'  },
  { id: 'TXN-883906', member: 'ISP Group C',   note: 'Monthly Internet Fee',  datetime: 'Oct 20, 10:15 AM', method: 'kcb',    methodLabel: 'KCB Bank',     amount: 'KES 4,500.00',  status: 'Failed'     },
]

/* ── helpers ─────────────────────────────────────────────── */

const MethodBadge = ({ method, label }: { method: MethodKey; label: string }) => {
  const configs: Record<MethodKey, { bg: string; iconClass: string; icon: ReactElement }> = {
    mpesa:  { bg: 'bg-green-100',  iconClass: 'text-green-600',  icon: <FaWallet /> },
    airtel: { bg: 'bg-red-100',    iconClass: 'text-red-500',    icon: <RiMoneyDollarCircleFill /> },
    momo:   { bg: 'bg-yellow-100', iconClass: 'text-yellow-600', icon: <RiMoneyDollarCircleFill /> },
    bank:   { bg: 'bg-blue-100',   iconClass: 'text-blue-600',   icon: <GiBank /> },
    equity: { bg: 'bg-purple-100', iconClass: 'text-purple-600', icon: <GiBank /> },
    kcb:    { bg: 'bg-blue-100',   iconClass: 'text-blue-700',   icon: <GiBank /> },
  }
  const c = configs[method]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.iconClass}`}>
      {c.icon}
      {label}
    </span>
  )
}

const statusStyle: Record<TxStatus, string> = {
  Completed:  'bg-green-100  text-green-700',
  Pending:    'bg-yellow-100 text-yellow-700',
  Failed:     'bg-red-100    text-red-700',
  Processing: 'bg-blue-100   text-blue-700',
}

const statusFilters: StatusFilter[] = ['All', 'Completed', 'Pending', 'Processing', 'Failed']
const PAGE_SIZE = 5

/* ── component ──────────────────────────────────────────── */

const Collections = () => {
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [page,         setPage]         = useState(1)
  const [openMenu,     setOpenMenu]     = useState<string | null>(null)
  const [showFilter,   setShowFilter]   = useState(false)

  const filtered = allTransactions.filter((tx) => {
    const matchStatus = statusFilter === 'All' || tx.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch =
      tx.id.toLowerCase().includes(q) ||
      tx.member.toLowerCase().includes(q) ||
      (tx.phone ?? '').toLowerCase().includes(q) ||
      tx.methodLabel.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (v: string) => { setSearch(v); setPage(1) }
  const handleStatus = (v: StatusFilter) => { setStatusFilter(v); setPage(1) }

  return (
    <div className="min-h-full bg-gray-50" onClick={() => { setOpenMenu(null); setShowFilter(false) }}>

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Collections</h1>
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
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              All incoming M-Pesa and payment collections, auto-reconciled in real time.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
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
              New Request
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
                placeholder="Search by transaction ID or member…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-400 bg-gray-50 transition-all"
              />
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Status filter dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowFilter(!showFilter) }}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                >
                  <FaFilter className="text-gray-400 text-xs" />
                  Status: {statusFilter}
                  <FaChevronDown className="text-gray-400 text-[10px]" />
                </button>
                {showFilter && (
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-36">
                    {statusFilters.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { handleStatus(s); setShowFilter(false) }}
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
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Transaction ID</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Member / Payer</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Date &amp; Time</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Method</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">
                      No transactions match your search or filter.
                    </td>
                  </tr>
                ) : (
                  paginated.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* ID */}
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{tx.id}</td>

                      {/* Member */}
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800">{tx.member}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{tx.phone ?? tx.note}</p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-gray-500 whitespace-nowrap hidden lg:table-cell">{tx.datetime}</td>

                      {/* Method */}
                      <td className="px-4 py-4">
                        <MethodBadge method={tx.method} label={tx.methodLabel} />
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4 font-bold text-gray-800">{tx.amount}</td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[tx.status]}`}>
                          {tx.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 pr-6 relative">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === tx.id ? null : tx.id) }}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Actions"
                        >
                          <FaEllipsisH />
                        </button>
                        {openMenu === tx.id && (
                          <div className="absolute right-6 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-44" onClick={(e) => e.stopPropagation()}>
                            <button type="button" className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors" onClick={() => setOpenMenu(null)}>
                              View Details
                            </button>
                            <button type="button" className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors" onClick={() => setOpenMenu(null)}>
                              Download Receipt
                            </button>
                            {tx.status === 'Failed' && (
                              <>
                                <div className="border-t border-gray-100 my-1" />
                                <button type="button" className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={() => setOpenMenu(null)}>
                                  Retry Payment
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
              <p className="px-4 py-10 text-center text-sm text-gray-400">No transactions found.</p>
            ) : (
              paginated.map((tx) => (
                <div key={tx.id} className="px-4 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{tx.member}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{tx.phone ?? tx.note}</p>
                    </div>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[tx.status]}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <MethodBadge method={tx.method} label={tx.methodLabel} />
                    <span className="font-bold text-gray-800 text-sm">{tx.amount}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-xs text-gray-400">{tx.id}</span>
                    <span className="text-xs text-gray-400">{tx.datetime}</span>
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
                <FaChevronLeft className="text-[10px]" />
                Previous
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
                    <span key={`ellipsis-${i}`} className="px-2 text-xs text-gray-400">…</span>
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
                Next
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Collections
