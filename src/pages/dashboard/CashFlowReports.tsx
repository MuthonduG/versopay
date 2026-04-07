import { MdTrendingUp, MdTrendingDown } from 'react-icons/md'
import { BsDownload, BsFileEarmarkPdf } from 'react-icons/bs'
import DashboardPageHeader from './DashboardPageHeader'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const inflow = [120, 95, 140, 110, 160, 145]
const outflow = [88, 102, 98, 115, 105, 112]
const maxVal = Math.max(...inflow, ...outflow, 1)

const reports = [
  { name: 'Cash_flow_March_2026.pdf', period: 'Mar 1 – Mar 31, 2026', created: 'Apr 1, 2026' },
  { name: 'Monthly_summary_Q1_2026.pdf', period: 'Jan – Mar 2026', created: 'Apr 2, 2026' },
]

const CashFlowReports = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <DashboardPageHeader label="Cash flow & reports" />

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cash flow</h2>
            <p className="text-sm text-gray-500 mt-1">Money in vs money out across connected accounts (sample data).</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-md"
          >
            <BsDownload className="text-sm" />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-green-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <MdTrendingUp className="text-xl" />
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Inflow (30d)</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">KES 185,000</p>
            <p className="text-xs text-green-600 font-medium mt-1">+4.2% vs prior month</p>
          </div>
          <div className="bg-white rounded-xl border border-red-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <MdTrendingDown className="text-xl" />
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Outflow (30d)</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">KES 112,400</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Within your budget cap</p>
          </div>
          <div className="bg-white rounded-xl border border-yellow-100 p-5 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Net (30d)</span>
            <p className="text-2xl font-bold text-gray-900 mt-2">+KES 72,600</p>
            <p className="text-xs text-yellow-700 font-medium mt-1">Savings rate ~39%</p>
          </div>
        </div>

        {/* Simple bar chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-6">Last 6 months</h3>
          <div className="flex items-end justify-between gap-2 h-48 border-b border-gray-100 pb-2">
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                <div className="flex gap-0.5 sm:gap-1 items-end justify-center h-40 w-full">
                  <div
                    className="w-2 sm:w-3 rounded-t bg-green-400/90"
                    style={{ height: `${(inflow[i]! / maxVal) * 100}%`, minHeight: 4 }}
                    title={`In ${inflow[i]}`}
                  />
                  <div
                    className="w-2 sm:w-3 rounded-t bg-red-300/90"
                    style={{ height: `${(outflow[i]! / maxVal) * 100}%`, minHeight: 4 }}
                    title={`Out ${outflow[i]}`}
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{m}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" /> Inflow
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-300" /> Outflow
            </span>
          </div>
        </div>

        {/* Reports list */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Saved reports</h3>
            <button type="button" className="text-sm font-medium text-yellow-600 hover:text-yellow-700">
              Generate new
            </button>
          </div>
          <ul className="divide-y divide-gray-50">
            {reports.map((r) => (
              <li key={r.name} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-red-50 text-red-500 shrink-0">
                    <BsFileEarmarkPdf className="text-lg" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{r.name}</p>
                    <p className="text-xs text-gray-500">
                      {r.period} · Generated {r.created}
                    </p>
                  </div>
                </div>
                <button type="button" className="shrink-0 text-sm font-semibold text-yellow-600 hover:text-yellow-700">
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default CashFlowReports
