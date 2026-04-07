import { MdOutlineNotifications } from 'react-icons/md'

interface DashboardPageHeaderProps {
  label: string
}

const DashboardPageHeader = ({ label }: DashboardPageHeaderProps) => (
  <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
    <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{label}</h1>
    <div className="flex items-center gap-4">
      <button type="button" className="relative p-2 text-gray-500 hover:text-yellow-600 transition-colors">
        <MdOutlineNotifications className="text-xl" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>
      <span className="text-sm text-gray-500">Support</span>
    </div>
  </header>
)

export default DashboardPageHeader
