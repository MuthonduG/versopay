import { Link } from 'react-router-dom'
import { MdTrendingUp, MdAccountBalanceWallet, MdReceiptLong, MdShowChart } from 'react-icons/md'
import { FaPlus, FaCircle, FaArrowRight } from 'react-icons/fa'
import { IoMdRepeat } from 'react-icons/io'
import DashboardPageHeader from './DashboardPageHeader'

const statCards = [
  {
    label: 'Net worth',
    value: 'KES 1.24M',
    sub: '↑ 2.1% this month',
    subColor: 'text-green-600',
    icon: <MdAccountBalanceWallet className="text-2xl text-yellow-600" />,
    iconBg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },
  {
    label: 'Spent this month',
    value: 'KES 62,500',
    sub: '78% of budget',
    subColor: 'text-gray-600',
    icon: <MdTrendingUp className="text-2xl text-amber-600" />,
    iconBg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    label: 'Upcoming bills',
    value: 'KES 9,100',
    sub: 'Next 7 days',
    subColor: 'text-blue-600',
    icon: <MdReceiptLong className="text-2xl text-blue-600" />,
    iconBg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Goals on track',
    value: '3 of 3',
    sub: 'Keep it up',
    subColor: 'text-green-600',
    icon: <MdShowChart className="text-2xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
]

const recentActivity = [
  { id: '#TX-10492', desc: 'Naivas Supermarket', cat: 'Groceries', account: 'Equity', amount: '-KES 3,240', status: 'Posted' },
  { id: '#TX-10491', desc: 'Safaricom Airtime', cat: 'Bills', account: 'M-Pesa', amount: '-KES 500', status: 'Posted' },
  { id: '#TX-10490', desc: 'Salary deposit', cat: 'Income', account: 'Equity', amount: '+KES 185,000', status: 'Posted' },
  { id: '#TX-10489', desc: 'Netflix', cat: 'Subscriptions', account: 'Equity', amount: '-KES 1,100', status: 'Posted' },
]

const upcoming = [
  { name: 'Safaricom fibre', due: 'Apr 8', amount: 'KES 4,199' },
  { name: 'Netflix', due: 'Apr 12', amount: 'KES 1,100' },
  { name: 'Spotify', due: 'Apr 18', amount: 'KES 299' },
]

const statusStyle: Record<string, string> = {
  Posted: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
}

const Dashboard = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <DashboardPageHeader label="Overview" />

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-0.5">Here is your money at a glance—synced from linked accounts.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/dashboard/accounts"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              Connect account
            </Link>
            <Link
              to="/dashboard/transactions"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md"
            >
              <FaPlus className="text-xs" />
              Add transaction
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className={`bg-white rounded-xl border ${card.border} p-5 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{card.label}</p>
                <div className={`${card.iconBg} p-2 rounded-lg`}>{card.icon}</div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className={`text-xs mt-1 font-medium ${card.subColor}`}>{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Recent activity</h3>
              <Link to="/dashboard/transactions" className="text-sm font-medium text-yellow-600 hover:text-yellow-700 inline-flex items-center gap-1">
                View all
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/60">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Description</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Category</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Account</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Amount</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentActivity.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5">
                        <p className="font-medium text-gray-800">{tx.desc}</p>
                        <p className="text-xs text-gray-400 font-mono">{tx.id}</p>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600 hidden sm:table-cell">{tx.cat}</td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <FaCircle className={`text-[6px] ${tx.account === 'M-Pesa' ? 'text-green-500' : 'text-purple-400'}`} />
                          {tx.account}
                        </span>
                      </td>
                      <td className={`px-4 py-3.5 font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'}`}>
                        {tx.amount}
                      </td>
                      <td className="px-4 py-3.5 pr-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[tx.status]}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <IoMdRepeat className="text-yellow-500" />
                  Upcoming recurring
                </h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {upcoming.map((u) => (
                  <li key={u.name} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Due {u.due}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{u.amount}</span>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 border-t border-gray-100">
                <Link to="/dashboard/recurring" className="text-sm font-medium text-yellow-600 hover:text-yellow-700 inline-flex items-center gap-1">
                  Manage recurring
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

            <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-100 p-5">
              <p className="text-sm font-semibold text-gray-900">Accounts</p>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Link M-Pesa and bank accounts to keep balances and transactions up to date automatically.
              </p>
              <Link
                to="/dashboard/accounts"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-yellow-700 hover:text-yellow-800"
              >
                Go to Accounts
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
