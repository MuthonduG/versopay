import { FaPlus, FaPiggyBank } from 'react-icons/fa'
import DashboardPageHeader from './DashboardPageHeader'

const goals = [
  { name: 'Emergency fund', target: 200000, saved: 142000, deadline: 'Dec 2026', color: 'from-green-500 to-emerald-500' },
  { name: 'School fees', target: 85000, saved: 52000, deadline: 'Aug 2026', color: 'from-yellow-500 to-amber-500' },
  { name: 'Holiday', target: 150000, saved: 38000, deadline: 'Nov 2026', color: 'from-blue-500 to-cyan-500' },
]

const Goals = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <DashboardPageHeader label="Goals" />

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Saving goals</h2>
            <p className="text-sm text-gray-500 mt-1">Track progress toward what matters—funded from your real balances.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-md"
          >
            <FaPlus className="text-xs" />
            New goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {goals.map((g) => {
            const pct = Math.round((g.saved / g.target) * 100)
            return (
              <div key={g.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-yellow-50 text-yellow-600">
                    <FaPiggyBank className="text-xl" />
                  </div>
                  <span className="text-xs font-medium text-gray-400">Due {g.deadline}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{g.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  KES {g.saved.toLocaleString()} of {g.target.toLocaleString()}
                </p>
                <div className="mt-4 h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${g.color}`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-2">{pct}% complete</p>
                <button type="button" className="mt-6 text-sm font-semibold text-yellow-600 hover:text-yellow-700 text-left">
                  Add contribution
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Goals
