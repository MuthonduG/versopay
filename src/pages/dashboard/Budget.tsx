import { FaPlus } from 'react-icons/fa'
import DashboardPageHeader from './DashboardPageHeader'

const categories = [
  { name: 'Groceries', spent: 28400, cap: 35000, color: 'bg-green-500' },
  { name: 'Transport', spent: 8200, cap: 12000, color: 'bg-blue-500' },
  { name: 'Subscriptions', spent: 4100, cap: 8000, color: 'bg-purple-500' },
  { name: 'Dining out', spent: 15600, cap: 15000, color: 'bg-amber-500', over: true },
  { name: 'Utilities & airtime', spent: 6200, cap: 10000, color: 'bg-cyan-500' },
]

const Budget = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <DashboardPageHeader label="Budget" />

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Monthly budget</h2>
            <p className="text-sm text-gray-500 mt-1">April 2026 · tracked from connected accounts</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-md"
          >
            <FaPlus className="text-xs" />
            Add category
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {categories.map((c) => {
              const pct = Math.min(100, Math.round((c.spent / c.cap) * 100))
              return (
                <div key={c.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className={`text-sm font-medium ${c.over ? 'text-red-600' : 'text-gray-600'}`}>
                      KES {c.spent.toLocaleString()} / {c.cap.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${c.color} ${c.over ? 'opacity-90' : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {pct}% used
                    {c.over && <span className="text-red-600 font-medium ml-2">Over cap</span>}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-100 p-6 h-fit">
            <h3 className="font-semibold text-gray-900">At a glance</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Budgets update as transactions sync from your linked accounts. Set caps that flex with your life—we will surface when you are close or over.
            </p>
            <div className="mt-6 pt-6 border-t border-yellow-200/80 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total budgeted</span>
                <span className="font-semibold text-gray-900">KES 80,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Spent so far</span>
                <span className="font-semibold text-gray-900">KES 62,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Left to spend</span>
                <span className="font-semibold text-green-700">KES 17,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget
