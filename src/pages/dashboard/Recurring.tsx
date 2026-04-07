import { FaPlus } from 'react-icons/fa'
import { IoMdRepeat } from 'react-icons/io'
import DashboardPageHeader from './DashboardPageHeader'

const items = [
  { name: 'Netflix', amount: 'KES 1,100', cycle: 'Monthly', next: 'Apr 12', account: 'Equity ••8901', active: true },
  { name: 'Safaricom fibre', amount: 'KES 4,199', cycle: 'Monthly', next: 'Apr 8', account: 'M-Pesa ••712', active: true },
  { name: 'Spotify', amount: 'KES 299', cycle: 'Monthly', next: 'Apr 18', account: 'Equity ••8901', active: true },
  { name: 'Gym membership', amount: 'KES 3,500', cycle: 'Monthly', next: 'Apr 1', account: 'M-Pesa ••712', active: false },
]

const Recurring = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <DashboardPageHeader label="Recurring" />

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recurring & subscriptions</h2>
            <p className="text-sm text-gray-500 mt-1">Bills and renewals detected from your accounts (sample).</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-md"
          >
            <FaPlus className="text-xs" />
            Add manually
          </button>
        </div>

        <div className="bg-white rounded-xl border border-yellow-100 shadow-sm p-4 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600 shrink-0">
            <IoMdRepeat className="text-xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Monthly recurring total</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">KES 9,098</p>
            <p className="text-xs text-gray-500 mt-1">3 active · 1 paused</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Merchant</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Cycle</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Next charge</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Pays from</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((r) => (
                  <tr key={r.name} className="hover:bg-gray-50/60">
                    <td className="px-6 py-3.5 font-medium text-gray-900">{r.name}</td>
                    <td className="px-4 py-3.5 font-semibold text-gray-800">{r.amount}</td>
                    <td className="px-4 py-3.5 text-gray-600 hidden sm:table-cell">{r.cycle}</td>
                    <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">{r.next}</td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs hidden lg:table-cell">{r.account}</td>
                    <td className="px-4 py-3.5 pr-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          r.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {r.active ? 'Active' : 'Paused'}
                      </span>
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

export default Recurring
