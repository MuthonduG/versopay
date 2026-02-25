import { useState } from 'react'
import { MdOutlineNotifications, MdTrendingUp, MdTrendingDown } from 'react-icons/md'
import { BsDownload, BsCalendar3, BsFileEarmarkText, BsFileEarmarkSpreadsheet } from 'react-icons/bs'
import { FaChevronDown, FaCircle } from 'react-icons/fa'
import { HiOutlineDocumentReport } from 'react-icons/hi'

/* ── data ─────────────────────────────────────────────── */

const perfCards = [
  {
    label: 'Total Revenue',
    value: 'KES 4.2M',
    sub: '↑ 8.4% vs last period',
    subColor: 'text-green-600',
    trend: 'up',
    icon: <MdTrendingUp className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Success Rate',
    value: '98.2%',
    sub: '+0.5% improvement',
    subColor: 'text-green-600',
    trend: 'up',
    icon: <MdTrendingUp className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Avg. Transaction',
    value: 'KES 2,450',
    sub: '— Consistent',
    subColor: 'text-gray-500',
    trend: 'flat',
    icon: <MdTrendingUp className="text-xl text-gray-400" />,
    iconBg: 'bg-gray-50',
    border: 'border-gray-100',
  },
  {
    label: 'Churn Rate',
    value: '1.2%',
    sub: '↓ Better than avg',
    subColor: 'text-green-600',
    trend: 'down',
    icon: <MdTrendingDown className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
]

const weeklyBars = [
  { day: 'Mon', collections: 48, disbursements: 22, active: true },
  { day: 'Tue', collections: 72, disbursements: 38, active: true },
  { day: 'Wed', collections: 58, disbursements: 30, active: true },
  { day: 'Thu', collections: 88, disbursements: 44, active: true },
  { day: 'Fri', collections: 65, disbursements: 35, active: true },
  { day: 'Sat', collections: 22, disbursements: 10, active: false },
  { day: 'Sun', collections: 14, disbursements: 8,  active: false },
]

const gatewayUsage = [
  { name: 'M-Pesa',                 pct: 62, color: 'bg-green-500',  dot: 'text-green-500'  },
  { name: 'Bank Transfer (KCB/Equity)', pct: 24, color: 'bg-blue-500',   dot: 'text-blue-500'   },
  { name: 'Airtel Money',           pct: 10, color: 'bg-red-400',    dot: 'text-red-400'    },
  { name: 'MTN MoMo',               pct:  4, color: 'bg-yellow-400', dot: 'text-yellow-400' },
]

const reports = [
  {
    name: 'Monthly_Collections_Oct.pdf',
    icon: <BsFileEarmarkText className="text-red-400 text-base" />,
    range: 'Oct 1 – Oct 31, 2024',
    generatedOn: 'Nov 1, 2024',
    type: 'Collections',
    status: 'Ready',
  },
  {
    name: 'Q3_Disbursements.csv',
    icon: <BsFileEarmarkSpreadsheet className="text-green-500 text-base" />,
    range: 'Jul 1 – Sep 30, 2024',
    generatedOn: 'Oct 5, 2024',
    type: 'Payouts',
    status: 'Ready',
  },
  {
    name: 'Failed_Transactions_W44.csv',
    icon: <BsFileEarmarkSpreadsheet className="text-green-500 text-base" />,
    range: 'Oct 28 – Nov 3, 2024',
    generatedOn: 'Nov 4, 2024',
    type: 'Reconciliation',
    status: 'Ready',
  },
  {
    name: 'Defaulters_Report_Oct.pdf',
    icon: <BsFileEarmarkText className="text-red-400 text-base" />,
    range: 'Oct 1 – Oct 31, 2024',
    generatedOn: 'Nov 2, 2024',
    type: 'Defaulters',
    status: 'Processing',
  },
  {
    name: 'Subscription_Summary_Q3.pdf',
    icon: <BsFileEarmarkText className="text-red-400 text-base" />,
    range: 'Jul 1 – Sep 30, 2024',
    generatedOn: 'Oct 6, 2024',
    type: 'Subscriptions',
    status: 'Ready',
  },
]

/* ── component ────────────────────────────────────────── */

const Analytics = () => {
  const [volumeTab, setVolumeTab] = useState<'collections' | 'disbursements'>('collections')

  return (
    <div className="min-h-full bg-gray-50">

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Analytics &amp; Reports</h1>
        <div className="flex items-center gap-4">
          <button type="button" className="relative p-2 text-gray-500 hover:text-yellow-600 transition-colors">
            <MdOutlineNotifications className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <span className="text-sm text-gray-500">Support</span>
        </div>
      </header>

      <div className="px-4 md:px-8 py-6 space-y-6">

        {/* Page heading row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Reconciliation, subscription, and defaulter metrics for your organization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Period picker */}
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <BsCalendar3 className="text-xs text-gray-400" />
              Last 30 Days
              <FaChevronDown className="text-xs text-gray-400" />
            </button>
            {/* Generate report */}
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md"
            >
              <HiOutlineDocumentReport className="text-base" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {perfCards.map((card) => (
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

        {/* Chart row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Transaction Volume bar chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-gray-900">Transaction Volume</h3>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setVolumeTab('collections')}
                  className={`px-3 py-1.5 transition-colors ${
                    volumeTab === 'collections'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Collections
                </button>
                <button
                  type="button"
                  onClick={() => setVolumeTab('disbursements')}
                  className={`px-3 py-1.5 transition-colors border-l border-gray-200 ${
                    volumeTab === 'disbursements'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Disbursements
                </button>
              </div>
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between gap-2 h-44">
              {weeklyBars.map((bar) => {
                const height = volumeTab === 'collections' ? bar.collections : bar.disbursements
                return (
                  <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center" style={{ height: '140px' }}>
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          bar.active
                            ? volumeTab === 'collections'
                              ? 'bg-linear-to-t from-yellow-500 to-amber-400'
                              : 'bg-linear-to-t from-amber-400 to-yellow-300'
                            : 'bg-gray-100'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{bar.day}</span>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-linear-to-t from-yellow-500 to-amber-400 inline-block" />
                Active days
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-gray-100 inline-block" />
                Weekends
              </span>
            </div>
          </div>

          {/* Gateway Usage */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Gateway Usage</h3>
            <div className="space-y-5">
              {gatewayUsage.map((gw) => (
                <div key={gw.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
                      <FaCircle className={`text-[8px] ${gw.dot}`} />
                      {gw.name}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{gw.pct}%</span>
                  </div>
                  {/* Progress bar track */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${gw.color} transition-all duration-500`}
                      style={{ width: `${gw.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* M-Pesa callout */}
            <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-xs font-semibold text-green-700">M-Pesa dominates at 62%</p>
              <p className="text-xs text-green-600 mt-0.5">Primary reconciliation target</p>
            </div>
          </div>
        </div>

        {/* Generated Reports */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Generated Reports</h3>
            <button
              type="button"
              className="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              Manage Schedules
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                    Report Name
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                    Date Range
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">
                    Generated On
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">
                    Type
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reports.map((r) => (
                  <tr key={r.name} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 font-medium text-gray-800">
                        {r.icon}
                        <span className="truncate max-w-[180px]">{r.name}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 hidden sm:table-cell whitespace-nowrap">{r.range}</td>
                    <td className="px-4 py-4 text-gray-600 hidden md:table-cell whitespace-nowrap">{r.generatedOn}</td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        r.type === 'Collections'    ? 'bg-yellow-50  text-yellow-700'
                        : r.type === 'Reconciliation' ? 'bg-blue-50    text-blue-700'
                        : r.type === 'Defaulters'     ? 'bg-red-50     text-red-700'
                        : r.type === 'Subscriptions'  ? 'bg-purple-50  text-purple-700'
                        : 'bg-gray-50 text-gray-700'
                      }`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        r.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 pr-6">
                      {r.status === 'Ready' ? (
                        <button
                          type="button"
                          className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
                        >
                          <BsDownload className="text-sm" />
                          Download
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">In progress…</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Analytics
