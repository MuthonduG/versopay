import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store'
import { useLogout } from '../../hooks/useAuth'
import {
  MdDashboardCustomize,
  MdLogout,
  MdOutlineNotifications,
  MdAccountBalance,
  MdReceiptLong,
  MdShowChart,
  MdSavings,
} from 'react-icons/md'
import { IoMdRepeat } from 'react-icons/io'
import { FaBullseye, FaPiggyBank, FaBars, FaChevronDown } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: <MdDashboardCustomize className="text-lg" />, end: true },
  { title: 'Accounts', href: '/dashboard/accounts', icon: <MdAccountBalance className="text-lg" /> },
  { title: 'Transactions', href: '/dashboard/transactions', icon: <MdReceiptLong className="text-lg" /> },
  { title: 'Cash flow reports', href: '/dashboard/cash-flow', icon: <MdShowChart className="text-lg" /> },
  { title: 'Budget', href: '/dashboard/budget', icon: <FaBullseye className="text-base" /> },
  { title: 'Recurring', href: '/dashboard/recurring', icon: <IoMdRepeat className="text-lg" /> },
  { title: 'Goals', href: '/dashboard/goals', icon: <FaPiggyBank className="text-base" /> },
  { title: 'Settings', href: '/dashboard/settings', icon: <CiSettings className="text-lg" /> },
]

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)
  const logout = useLogout()

  const handleLogout = async () => {
    await logout()
    navigate('/oauth/login', { replace: true })
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-gray-100">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-linear-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
          <MdSavings className="text-white text-lg" />
        </div>
        <span className="text-lg font-bold">
          <span className="text-yellow-500">Verso</span>
          <span className="text-gray-900">Paid</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase px-3 mb-2">Your money</p>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-yellow-600' : 'text-gray-400'}>{item.icon}</span>
                    <span className="leading-snug">{item.title}</span>
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-100 p-3">
        <button
          type="button"
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-amber-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              {(user?.firstName?.[0] ?? user?.email?.[0] ?? '?').toUpperCase()}
            </span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : 'Your account'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email ?? ''}</p>
          </div>
          <FaChevronDown
            className={`text-xs text-gray-400 transition-transform shrink-0 ${profileOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {profileOpen && (
          <div className="mt-1 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <MdLogout className="text-base" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="hidden md:flex md:flex-col md:w-64 md:shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-200 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
            aria-label="Open menu"
          >
            <FaBars className="text-xl" />
          </button>
          <span className="text-base font-bold">
            <span className="text-yellow-500">Verso</span>
            <span className="text-gray-900">Paid</span>
          </span>
          <button type="button" className="p-2 text-gray-500 hover:text-yellow-600 relative">
            <MdOutlineNotifications className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
