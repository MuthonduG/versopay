import { useState } from 'react'
import { MdAddLink, MdLock, MdVerified } from 'react-icons/md'
import { FaPlus, FaUniversity } from 'react-icons/fa'
import { GiBank } from 'react-icons/gi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import DashboardPageHeader from './DashboardPageHeader'

type ConnStatus = 'connected' | 'pending' | 'available'

interface LinkedAccount {
  id: string
  institution: string
  mask: string
  type: string
  balance: string
  lastSync: string
  status: ConnStatus
  icon: 'mpesa' | 'bank' | 'airtel'
}

const demoLinked: LinkedAccount[] = [
  {
    id: '1',
    institution: 'M-Pesa',
    mask: '•••• 712',
    type: 'Mobile money',
    balance: 'KES 48,320',
    lastSync: '2 min ago',
    status: 'connected',
    icon: 'mpesa',
  },
  {
    id: '2',
    institution: 'Equity Bank',
    mask: '•••• 8901',
    type: 'Current account',
    balance: 'KES 125,400',
    lastSync: '15 min ago',
    status: 'connected',
    icon: 'bank',
  },
]

const availableInstitutions = [
  { name: 'KCB Bank', desc: 'Personal & business accounts', icon: <GiBank className="text-xl text-blue-600" />, bg: 'bg-blue-50' },
  { name: 'Airtel Money', desc: 'Wallet & statements', icon: <RiMoneyDollarCircleFill className="text-xl text-red-500" />, bg: 'bg-red-50' },
  { name: 'Co-op Bank', desc: 'Savings & current', icon: <FaUniversity className="text-xl text-amber-700" />, bg: 'bg-amber-50' },
]

const Accounts = () => {
  const [linked] = useState<LinkedAccount[]>(demoLinked)

  return (
    <div className="min-h-full bg-gray-50">
      <DashboardPageHeader label="Accounts" />

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Connected accounts</h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Link your banks and mobile money wallets so VersoPaid can sync balances and transactions securely. We use read-only
              connections where supported—your credentials stay with your institution or our licensed partner.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-md transition-all shrink-0"
          >
            <FaPlus className="text-xs" />
            Connect account
          </button>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdLock className="text-yellow-600 text-lg shrink-0" />
            <span>Encrypted in transit; we never store your bank password.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdVerified className="text-green-600 text-lg shrink-0" />
            <span>Read-only sync for tracking—VersoPaid does not move your money.</span>
          </div>
        </div>

        {/* Linked cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {linked.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  acc.icon === 'mpesa' ? 'bg-green-100' : acc.icon === 'airtel' ? 'bg-red-100' : 'bg-purple-100'
                }`}
              >
                {acc.icon === 'mpesa' ? (
                  <RiMoneyDollarCircleFill className="text-2xl text-green-600" />
                ) : (
                  <GiBank className="text-2xl text-purple-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">{acc.institution}</p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">Connected</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {acc.type} · {acc.mask}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">{acc.balance}</p>
                <p className="text-xs text-gray-400 mt-1">Last synced {acc.lastSync}</p>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button type="button" className="text-sm font-medium text-yellow-600 hover:text-yellow-700 px-3 py-1.5 rounded-lg border border-yellow-100 hover:bg-yellow-50">
                  Sync now
                </button>
                <button type="button" className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5">
                  Manage
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="rounded-xl border-2 border-dashed border-gray-200 bg-white/50 hover:border-yellow-300 hover:bg-yellow-50/30 transition-all p-8 flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-yellow-700 min-h-[180px]"
          >
            <MdAddLink className="text-3xl" />
            <span className="text-sm font-semibold">Add another institution</span>
            <span className="text-xs text-center text-gray-400 max-w-[200px]">M-Pesa, banks, and more (where available)</span>
          </button>
        </div>

        {/* Available */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Popular connections</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableInstitutions.map((inst) => (
              <div
                key={inst.name}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3 hover:border-yellow-200 hover:shadow-sm transition-all"
              >
                <div className={`w-10 h-10 rounded-lg ${inst.bg} flex items-center justify-center shrink-0`}>{inst.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{inst.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{inst.desc}</p>
                  <button type="button" className="mt-3 text-xs font-semibold text-yellow-600 hover:text-yellow-700">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Accounts
