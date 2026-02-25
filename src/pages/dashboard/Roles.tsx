import { useState } from 'react'
import {
  MdOutlineNotifications,
  MdAdminPanelSettings,
  MdShieldMoon,
  MdLock,
  MdVerified,
} from 'react-icons/md'
import {
  FaPlus,
  FaEllipsisH,
  FaEdit,
  FaTrashAlt,
  FaCopy,
  FaUsers,
} from 'react-icons/fa'
import { BsShieldCheck, BsPersonBadge } from 'react-icons/bs'
import { RiShieldUserLine } from 'react-icons/ri'

/* ── types ──────────────────────────────────────────────── */

type RoleType = 'System Default' | 'Custom'

interface Permission {
  label: string
  color: string
}

interface Role {
  id: string
  name: string
  description: string
  type: RoleType
  usersAssigned: number
  permissions: Permission[]
  isLocked: boolean
}

/* ── data ───────────────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Total Roles',
    value: '6',
    sub: 'Defined in system',
    subColor: 'text-gray-500',
    icon: <RiShieldUserLine className="text-xl text-blue-600" />,
    iconBg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Custom Roles',
    value: '3',
    sub: 'Created by organization',
    subColor: 'text-yellow-600',
    icon: <MdAdminPanelSettings className="text-xl text-yellow-600" />,
    iconBg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },
  {
    label: 'Most Assigned',
    value: 'Member',
    sub: '1,150 users assigned',
    subColor: 'text-green-600',
    icon: <FaUsers className="text-xl text-green-600" />,
    iconBg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    label: 'Security Level',
    value: 'MFA On',
    sub: 'Required for Admins',
    subColor: 'text-purple-600',
    icon: <BsShieldCheck className="text-xl text-purple-600" />,
    iconBg: 'bg-purple-50',
    border: 'border-purple-100',
  },
]

const allRoles: Role[] = [
  {
    id: 'R-001',
    name: 'Administrator',
    description: 'Full system access and configuration',
    type: 'System Default',
    usersAssigned: 2,
    isLocked: true,
    permissions: [
      { label: 'All Access',  color: 'bg-yellow-100 text-yellow-700' },
      { label: 'User Mgmt',   color: 'bg-blue-100   text-blue-700'   },
      { label: 'Billing',     color: 'bg-purple-100 text-purple-700' },
    ],
  },
  {
    id: 'R-002',
    name: 'Treasurer',
    description: 'Manage payments and financials',
    type: 'Custom',
    usersAssigned: 3,
    isLocked: false,
    permissions: [
      { label: 'View Payments',    color: 'bg-green-100  text-green-700' },
      { label: 'Approve Payouts',  color: 'bg-amber-100  text-amber-700' },
      { label: 'Reports',          color: 'bg-blue-100   text-blue-700'  },
    ],
  },
  {
    id: 'R-003',
    name: 'Operations Manager',
    description: 'Manage day-to-day activities',
    type: 'Custom',
    usersAssigned: 4,
    isLocked: false,
    permissions: [
      { label: 'Manage Members',  color: 'bg-indigo-100 text-indigo-700' },
      { label: 'View Audit Logs', color: 'bg-gray-100   text-gray-700'   },
    ],
  },
  {
    id: 'R-004',
    name: 'Auditor',
    description: 'Read-only access for compliance',
    type: 'Custom',
    usersAssigned: 0,
    isLocked: false,
    permissions: [
      { label: 'View All',       color: 'bg-gray-100   text-gray-700'   },
      { label: 'Export Reports', color: 'bg-red-100    text-red-700'    },
    ],
  },
  {
    id: 'R-005',
    name: 'Secretary',
    description: 'Manage records and communications',
    type: 'Custom',
    usersAssigned: 5,
    isLocked: false,
    permissions: [
      { label: 'Edit Records',  color: 'bg-teal-100   text-teal-700'   },
      { label: 'Send Reminders',color: 'bg-green-100  text-green-700'  },
    ],
  },
  {
    id: 'R-006',
    name: 'Member',
    description: 'Standard access for regular users',
    type: 'System Default',
    usersAssigned: 1150,
    isLocked: true,
    permissions: [
      { label: 'View Own Profile', color: 'bg-blue-100   text-blue-700' },
      { label: 'View History',     color: 'bg-gray-100   text-gray-700' },
    ],
  },
]

/* ── helpers ────────────────────────────────────────────── */

const typeStyle: Record<RoleType, string> = {
  'System Default': 'bg-blue-100   text-blue-700',
  'Custom':         'bg-yellow-100 text-yellow-700',
}

const AvatarStack = ({ count }: { count: number }) => {
  if (count === 0) {
    return <span className="text-xs text-gray-400 italic">No users assigned</span>
  }
  const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-red-500']
  const initials = ['SK', 'JM', 'LA', 'KO', 'GN']
  const show = Math.min(count, 3)
  const extra = count - show

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {Array.from({ length: show }).map((_, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-full ${colors[i % colors.length]} border-2 border-white flex items-center justify-center`}
          >
            <span className="text-white text-[9px] font-bold">{initials[i]}</span>
          </div>
        ))}
      </div>
      {extra > 0 && (
        <span className="text-xs text-gray-500 font-medium">
          +{extra >= 1000 ? `${(extra / 1000).toFixed(1)}k` : extra}
        </span>
      )}
    </div>
  )
}

/* ── component ──────────────────────────────────────────── */

const Roles = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <div className="min-h-full bg-gray-50" onClick={() => setOpenMenu(null)}>

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Roles &amp; Permissions</h1>
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
            <h2 className="text-2xl font-bold text-gray-900">Roles &amp; Permissions</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Control what each member can see, do, and approve across VersoPaid.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md self-start sm:self-auto"
          >
            <FaPlus className="text-xs" />
            Create New Role
          </button>
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

        {/* Roles table */}
        <div
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Table header row */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">All Roles</h3>
            <span className="text-xs text-gray-400">{allRoles.length} roles defined</span>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Role Name</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Users Assigned</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Key Permissions</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50/50 transition-colors">

                    {/* Role name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          role.name === 'Administrator' ? 'bg-yellow-50'  :
                          role.name === 'Treasurer'     ? 'bg-green-50'   :
                          role.name === 'Auditor'       ? 'bg-red-50'     :
                          role.name === 'Secretary'     ? 'bg-teal-50'    :
                          role.name === 'Member'        ? 'bg-blue-50'    :
                          'bg-indigo-50'
                        }`}>
                          {role.name === 'Administrator' ? <MdAdminPanelSettings className="text-yellow-600 text-lg" />  :
                           role.name === 'Treasurer'     ? <BsPersonBadge        className="text-green-600  text-lg" />  :
                           role.name === 'Auditor'       ? <MdShieldMoon         className="text-red-500    text-lg" />  :
                           role.name === 'Secretary'     ? <MdVerified           className="text-teal-600   text-lg" />  :
                           role.name === 'Member'        ? <FaUsers              className="text-blue-500   text-base" /> :
                                                           <MdAdminPanelSettings className="text-indigo-500 text-lg" />
                          }
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{role.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{role.description}</p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${typeStyle[role.type]}`}>
                        {role.type}
                      </span>
                    </td>

                    {/* Users assigned */}
                    <td className="px-4 py-4">
                      <AvatarStack count={role.usersAssigned} />
                    </td>

                    {/* Key permissions */}
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {role.permissions.map((p) => (
                          <span
                            key={p.label}
                            className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${p.color}`}
                          >
                            {p.label}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 pr-6 relative">
                      {role.isLocked ? (
                        <div
                          className="p-1.5 text-gray-300 cursor-not-allowed inline-flex"
                          title="System default roles cannot be modified"
                        >
                          <MdLock className="text-base" />
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === role.id ? null : role.id) }}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={`Actions for ${role.name}`}
                          >
                            <FaEllipsisH />
                          </button>
                          {openMenu === role.id && (
                            <div
                              className="absolute right-6 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-44"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button type="button" onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                                <FaEdit className="text-xs text-gray-400" /> Edit Role
                              </button>
                              <button type="button" onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                                <FaCopy className="text-xs text-gray-400" /> Duplicate
                              </button>
                              <button type="button" onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                                <FaUsers className="text-xs text-gray-400" /> View Members
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <button type="button" onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                <FaTrashAlt className="text-xs" /> Delete Role
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {allRoles.map((role) => (
              <div key={role.id} className="px-4 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-800">{role.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{role.description}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold ${typeStyle[role.type]}`}>
                    {role.type === 'System Default' ? 'System' : 'Custom'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {role.permissions.map((p) => (
                    <span key={p.label} className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.color}`}>
                      {p.label}
                    </span>
                  ))}
                </div>
                <div className="mt-2">
                  <AvatarStack count={role.usersAssigned} />
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/30">
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <MdLock className="text-gray-300" />
              <span>System Default roles cannot be edited or deleted.</span>
            </p>
          </div>
        </div>

        {/* Permissions matrix callout */}
        <div className="bg-white rounded-xl border border-yellow-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-50 p-3 rounded-xl shrink-0">
                <BsShieldCheck className="text-yellow-600 text-xl" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Permissions Matrix</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xl">
                  Review which roles can access reconciliations, approve payouts, manage defaulters, send reminders, 
                  or export reports. Configure fine-grained access to match your organization's compliance needs.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: 'Reconciliation',    color: 'bg-green-100  text-green-700'  },
                    { label: 'Approve Payouts',   color: 'bg-amber-100  text-amber-700'  },
                    { label: 'Defaulter Mgmt',    color: 'bg-red-100    text-red-700'    },
                    { label: 'Send Reminders',    color: 'bg-blue-100   text-blue-700'   },
                    { label: 'Export Reports',    color: 'bg-purple-100 text-purple-700' },
                    { label: 'User Management',   color: 'bg-yellow-100 text-yellow-700' },
                  ].map((p) => (
                    <span key={p.label} className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${p.color}`}>
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 flex items-center gap-2 px-4 py-2 border border-yellow-300 rounded-lg text-sm font-semibold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors self-start"
            >
              View Full Matrix
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Roles
