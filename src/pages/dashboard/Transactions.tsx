import { useState } from 'react'
import { MdSearch, MdFilterList } from 'react-icons/md'
import { FaCircle } from 'react-icons/fa'
import DashboardPageHeader from './DashboardPageHeader'

const rows = [
  { id: 'TX-10492', date: 'Apr 4, 2026', payee: 'Naivas Supermarket', category: 'Groceries', account: 'Equity ••8901', amount: '-KES 3,240', status: 'Posted' },
  { id: 'TX-10491', date: 'Apr 4, 2026', payee: 'Safaricom Airtime', category: 'Bills', account: 'M-Pesa ••712', amount: '-KES 500', status: 'Posted' },
  { id: 'TX-10490', date: 'Apr 3, 2026', payee: 'Salary deposit', category: 'Income', account: 'Equity ••8901', amount: '+KES 185,000', status: 'Posted' },
  { id: 'TX-10489', date: 'Apr 3, 2026', payee: 'Netflix', category: 'Subscriptions', account: 'Equity ••8901', amount: '-KES 1,100', status: 'Posted' },
  { id: 'TX-10488', date: 'Apr 2, 2026', payee: 'Uber', category: 'Transport', account: 'M-Pesa ••712', amount: '-KES 650', status: 'Pending' },
]

const statusClass: Record<string, string> = {
  Posted: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
}

const Transactions = () => {
  const [q, setQ] = useState('')

  const filtered = rows.filter(
    (r) =>
      r.payee.toLowerCase().includes(q.toLowerCase()) ||
      r.category.toLowerCase().includes(q.toLowerCase()) ||
      r.id.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="min-h-full bg-gray-50">
      <DashboardPageHeader label="Transactions" />

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All transactions</h2>
            <p className="text-sm text-gray-500 mt-1">Everything pulled from your connected accounts, newest first.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            <MdFilterList />
            Filters
          </button>
        </div>

        <div className="relative max-w-md">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search payee, category, or ID…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-400"
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Payee</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Account</th>
                  <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/60">
                    <td className="px-6 py-3.5 text-gray-500 whitespace-nowrap">{tx.date}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-gray-900">{tx.payee}</p>
                      <p className="text-xs text-gray-400 font-mono">{tx.id}</p>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 hidden sm:table-cell">{tx.category}</td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <FaCircle className="text-[6px] text-yellow-500" />
                        {tx.account}
                      </span>
                    </td>
                    <td className={`px-4 py-3.5 text-right font-semibold whitespace-nowrap ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                      {tx.amount}
                    </td>
                    <td className="px-4 py-3.5 pr-6">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass[tx.status]}`}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-12">No transactions match your search.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Transactions
