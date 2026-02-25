import { MdOutlineNotifications, MdTrendingUp, MdWarningAmber, MdCheckCircle, MdPending } from 'react-icons/md'
import { FaDownload, FaPlus, FaCircle } from 'react-icons/fa'
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs'

const statCards = [
  {
    label: 'Total Collections',
    value: 'KES 2.4M',
    sub: '↑ 12% vs last month',
    subColor: 'text-green-600',
    icon: <MdTrendingUp className="text-2xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Active Subscriptions',
    value: '842',
    sub: '+24 new this week',
    subColor: 'text-yellow-600',
    icon: <MdCheckCircle className="text-2xl text-yellow-600" />,
    iconBg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },
  {
    label: 'Pending Reconciliations',
    value: 'KES 150K',
    sub: 'Scheduled for today',
    subColor: 'text-blue-600',
    icon: <MdPending className="text-2xl text-blue-600" />,
    iconBg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Defaulters This Month',
    value: '12',
    sub: 'Requires attention',
    subColor: 'text-red-600',
    icon: <MdWarningAmber className="text-2xl text-red-500" />,
    iconBg: 'bg-red-50',
    border: 'border-red-100',
  },
]

const recentTransactions = [
  { id: '#TRX-8921', member: 'John Kamau',  type: 'Monthly Contrib.', gateway: 'M-Pesa',  amount: 'KES 5,000',  status: 'Reconciled' },
  { id: '#TRX-8920', member: 'Alice Wanjiku', type: 'Subscription',    gateway: 'M-Pesa',  amount: 'KES 2,500',  status: 'Reconciled' },
  { id: '#TRX-8919', member: 'Peter Omondi', type: 'Monthly Contrib.', gateway: 'KCB',     amount: 'KES 45,000', status: 'Processing' },
  { id: '#TRX-8918', member: 'Grace N.',     type: 'Weekly Save',      gateway: 'Airtel',  amount: 'KES 1,000',  status: 'Failed' },
  { id: '#TRX-8917', member: 'David Koech',  type: 'Monthly Contrib.', gateway: 'M-Pesa',  amount: 'KES 5,000',  status: 'Reconciled' },
]

const activePlans = [
  { name: 'Gold Tier Saver',       cycle: 'Weekly • KES 2,500',  active: 142 },
  { name: 'Monthly Rent Collection', cycle: 'Monthly • Dynamic',  active: 48  },
  { name: 'Merry-Go-Round',        cycle: 'Bi-Weekly • KES 500',  active: 210 },
]

const gatewayHealth = [
  { name: 'Safaricom M-Pesa', status: 'up',      label: '99.9% Uptime' },
  { name: 'Airtel Money',     status: 'up',      label: '98.5% Uptime' },
  { name: 'Equity Bank',      status: 'warning', label: 'Degraded'     },
  { name: 'KCB Bank',         status: 'up',      label: '99.1% Uptime' },
]

const defaulterList = [
  { member: 'Brian Otieno',  amount: 'KES 5,000', daysOverdue: 7,  channel: 'WhatsApp' },
  { member: 'Mary Achieng',  amount: 'KES 2,500', daysOverdue: 14, channel: 'SMS'      },
  { member: 'James Mutua',   amount: 'KES 1,000', daysOverdue: 3,  channel: 'Email'    },
]

const statusStyle: Record<string, string> = {
  Reconciled: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Failed:     'bg-red-100  text-red-700',
}

const gatewayDot: Record<string, string> = {
  up:      'text-green-500',
  warning: 'text-yellow-500',
  down:    'text-red-500',
}

const Dashboard = () => {
  return (
    <div className="min-h-full bg-gray-50">

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Overview</h1>
        <div className="flex items-center gap-4">
          <button type="button" className="relative p-2 text-gray-500 hover:text-yellow-600 transition-colors">
            <MdOutlineNotifications className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <span className="text-sm text-gray-500">Support</span>
        </div>
      </header>

      <div className="px-4 md:px-8 py-6 space-y-6">

        {/* Welcome row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h2>
            <p className="text-sm text-gray-500 mt-0.5">Here's what's happening with your organization today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaDownload className="text-xs" />
              Export Report
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md"
            >
              <FaPlus className="text-xs" />
              Create Plan
            </button>
          </div>
        </div>

        {/* Stat cards */}
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

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
              <button type="button" className="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/60">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Transaction ID</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Member</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Type</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Gateway</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Amount</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-mono text-xs text-gray-500">{tx.id}</td>
                      <td className="px-4 py-3.5 font-medium text-gray-800">{tx.member}</td>
                      <td className="px-4 py-3.5 text-gray-600 hidden sm:table-cell">{tx.type}</td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <FaCircle className={`text-[6px] ${tx.gateway === 'M-Pesa' ? 'text-green-500' : tx.gateway === 'Airtel' ? 'text-red-400' : 'text-blue-400'}`} />
                          {tx.gateway}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-gray-800">{tx.amount}</td>
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

          {/* Right column */}
          <div className="space-y-6">

            {/* Active Plans */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">Active Plans</h3>
                <BsArrowUpShort className="text-xl text-gray-400" />
              </div>
              <ul className="divide-y divide-gray-50">
                {activePlans.map((plan) => (
                  <li key={plan.name} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{plan.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{plan.cycle}</p>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-100">
                      {plan.active} Active
                    </span>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 border-t border-gray-100">
                <button type="button" className="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
                  View All Plans
                </button>
              </div>
            </div>

            {/* Gateway Health */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">Gateway Health</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {gatewayHealth.map((gw) => (
                  <li key={gw.name} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors">
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                      <FaCircle className={`text-[8px] ${gatewayDot[gw.status]}`} />
                      {gw.name}
                    </span>
                    <span className={`text-xs font-medium ${gw.status === 'up' ? 'text-green-600' : gw.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {gw.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Defaulters panel */}
        <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-red-100 bg-red-50/40">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Defaulters This Month</h3>
              <p className="text-xs text-gray-500 mt-0.5">Members with missed or overdue payments — auto-reminders are active.</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-sm"
            >
              Send Reminders
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Member</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Overdue Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Days Overdue</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Reminder Via</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {defaulterList.map((d) => (
                  <tr key={d.member} className="hover:bg-red-50/30 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-800">{d.member}</td>
                    <td className="px-4 py-3.5 font-semibold text-red-600">{d.amount}</td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="flex items-center gap-1 text-gray-600">
                        <BsArrowDownShort className="text-red-400 text-base" />
                        {d.daysOverdue} days
                      </span>
                    </td>
                    <td className="px-4 py-3.5 pr-6">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        d.channel === 'WhatsApp' ? 'bg-green-100 text-green-700'
                        : d.channel === 'SMS'      ? 'bg-gray-100 text-gray-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}>
                        {d.channel}
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

export default Dashboard
