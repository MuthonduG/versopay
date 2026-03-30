import { useCallback, useEffect, useState } from 'react'
import { MdOutlineNotifications, MdRefresh } from 'react-icons/md'
import { IoPeopleOutline } from 'react-icons/io5'
import { fetchWaitlistAll } from '../../api/modules/waitlist'
import type { WaitlistEntry } from '../../api/types'

function formatJoined(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

const Users = () => {
  const [rows, setRows] = useState<WaitlistEntry[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWaitlistAll()
      setRows(data.results ?? [])
      setCount(data.count ?? data.results?.length ?? 0)
    } catch (e: unknown) {
      const msg =
        e && typeof e === 'object' && 'message' in e && typeof (e as { message: string }).message === 'string'
          ? (e as { message: string }).message
          : 'Could not load waitlist signups.'
      setError(msg)
      setRows([])
      setCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <div className="min-h-full bg-gray-50">
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Organization</h1>
        <div className="flex items-center gap-4">
          <button type="button" className="relative p-2 text-gray-500 hover:text-yellow-600 transition-colors">
            <MdOutlineNotifications className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <span className="text-sm text-gray-500">Support</span>
        </div>
      </header>

      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Users</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Everyone who joined the waitlist from your marketing site.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-60"
          >
            <MdRefresh className={`text-lg ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-yellow-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Waitlist signups</p>
              <div className="bg-yellow-50 p-2 rounded-lg">
                <IoPeopleOutline className="text-xl text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{loading ? '—' : count}</p>
            <p className="text-xs mt-1 font-medium text-yellow-600">Total records</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Waitlist</h3>
            <span className="text-sm font-medium text-yellow-600">View All</span>
          </div>

          {error && (
            <div className="px-6 py-8 text-center">
              <p className="text-sm text-red-600 mb-3">{error}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="text-sm font-semibold text-yellow-600 hover:text-yellow-700"
              >
                Try again
              </button>
            </div>
          )}

          {!error && loading && (
            <div className="px-6 py-16 flex justify-center">
              <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
            </div>
          )}

          {!error && !loading && rows.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-gray-500">No waitlist signups yet.</div>
          )}

          {!error && !loading && rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/60">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                      Email
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">
                      Phone
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                      Business
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">
                      Type
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">
                      Joined
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3 pr-6">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row) => (
                    <tr key={String(row.id)} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-gray-800 break-all">{row.email}</td>
                      <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{row.phone_number}</td>
                      <td className="px-4 py-3.5 text-gray-700 hidden sm:table-cell max-w-[200px] truncate">
                        {row.business_name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">
                        {row.business_type_label ?? row.business_type}
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-xs hidden lg:table-cell">
                        {formatJoined(row.created_at)}
                      </td>
                      <td className="px-4 py-3.5 pr-6">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          Waitlist
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
