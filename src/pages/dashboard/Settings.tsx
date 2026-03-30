import { useState, type ReactElement } from 'react'
import {
  MdOutlineNotifications,
  MdSecurity,
  MdOutlineEmail,
  MdOutlinePhoneAndroid,
  MdCheckCircle,
  MdWarningAmber,
  MdPending,
} from 'react-icons/md'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { FaWallet, FaWhatsapp, FaSms, FaSave, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'
import { GiBank } from 'react-icons/gi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { BsShieldCheck, BsBell, BsToggleOn, BsToggleOff, BsBuilding } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'

/* ── types ──────────────────────────────────────────────── */

type Tab          = 'profile' | 'security' | 'notifications' | 'integrations'
type IntegStatus  = 'Active' | 'Pending' | 'Error' | 'Disconnected'

/* ── integration data ───────────────────────────────────── */

interface Integration {
  id: string
  name: string
  description: string
  status: IntegStatus
  icon: ReactElement
  iconBg: string
}

const integrations: Integration[] = [
  { id: 'i-1', name: 'Safaricom M-Pesa',  description: 'C2B, B2C reconciliation',   status: 'Active',       icon: <FaWallet className="text-lg text-green-600" />,                  iconBg: 'bg-green-100'  },
  { id: 'i-2', name: 'Airtel Money',       description: 'Airtel payment gateway',     status: 'Active',       icon: <RiMoneyDollarCircleFill className="text-lg text-red-500" />,     iconBg: 'bg-red-100'    },
  { id: 'i-3', name: 'Equity Bank',        description: 'Bank reconciliation API',    status: 'Active',       icon: <GiBank className="text-lg text-purple-600" />,                   iconBg: 'bg-purple-100' },
  { id: 'i-4', name: 'KCB Bank',           description: 'KCB PesaLink integration',   status: 'Pending',      icon: <GiBank className="text-lg text-blue-600" />,                     iconBg: 'bg-blue-100'   },
  { id: 'i-5', name: 'MTN MoMo',           description: 'MoMo payment gateway',       status: 'Disconnected', icon: <RiMoneyDollarCircleFill className="text-lg text-yellow-600" />,  iconBg: 'bg-yellow-100' },
  { id: 'i-6', name: 'Momo Money',         description: 'Alternative MoMo gateway',   status: 'Error',        icon: <RiMoneyDollarCircleFill className="text-lg text-orange-500" />,  iconBg: 'bg-orange-100' },
]

const integStatusStyle: Record<IntegStatus, string> = {
  Active:       'bg-green-100  text-green-700',
  Pending:      'bg-yellow-100 text-yellow-700',
  Error:        'bg-red-100    text-red-700',
  Disconnected: 'bg-gray-100   text-gray-500',
}

const integStatusIcon: Record<IntegStatus, ReactElement> = {
  Active:       <MdCheckCircle className="text-green-500"  />,
  Pending:      <MdPending     className="text-yellow-500" />,
  Error:        <MdWarningAmber className="text-red-500"   />,
  Disconnected: <MdWarningAmber className="text-gray-400"  />,
}

/* ── toggle component ───────────────────────────────────── */

const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={on}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${on ? 'bg-yellow-500' : 'bg-gray-200'}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
)

/* ── section header ─────────────────────────────────────── */

const SectionHeader = ({ icon, title, description }: { icon: ReactElement; title: string; description: string }) => (
  <div className="flex items-start gap-4 pb-5 border-b border-gray-100 mb-6">
    <div className="bg-yellow-50 border border-yellow-100 p-2.5 rounded-xl shrink-0">{icon}</div>
    <div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-0.5">{description}</p>
    </div>
  </div>
)

/* ── input field ────────────────────────────────────────── */

const Field = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  readOnly,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  type?: string
  placeholder?: string
  hint?: string
  readOnly?: boolean
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg transition-all ${
        readOnly
          ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
          : 'bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-400'
      }`}
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

/* ── tab nav ────────────────────────────────────────────── */

const tabs: { id: Tab; label: string; icon: ReactElement }[] = [
  { id: 'profile',       label: 'Profile & Org',   icon: <IoPersonCircleOutline className="text-base" /> },
  { id: 'security',      label: 'Security',         icon: <MdSecurity            className="text-base" /> },
  { id: 'notifications', label: 'Notifications',    icon: <BsBell                className="text-base" /> },
  { id: 'integrations',  label: 'Integrations',     icon: <BsShieldCheck         className="text-base" /> },
]

/* ── component ──────────────────────────────────────────── */

const Settings = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  /* profile */
  const [name,        setName]        = useState('Admin User')
  const [email,       setEmail]       = useState('admin@versopaid.com')
  const [phone,       setPhone]       = useState('+254 712 345 678')
  const [orgName,     setOrgName]     = useState('VersoPaid Chama Group')
  const [tier,        setTier]        = useState('Starter — Free Tier')

  /* security */
  const [currentPwd,  setCurrentPwd]  = useState('')
  const [newPwd,      setNewPwd]      = useState('')
  const [confirmPwd,  setConfirmPwd]  = useState('')
  const [showPwd,     setShowPwd]     = useState(false)
  const [mfaEnabled,  setMfaEnabled]  = useState(true)

  /* notifications */
  const [smsOn,       setSmsOn]       = useState(true)
  const [waOn,        setWaOn]        = useState(true)
  const [emailOn,     setEmailOn]     = useState(false)
  const [freq,        setFreq]        = useState<'daily' | 'weekly' | 'monthly'>('weekly')

  /* integrations */
  const [statuses,    setStatuses]    = useState<Record<string, IntegStatus>>(
    Object.fromEntries(integrations.map((i) => [i.id, i.status]))
  )

  const toggleInteg = (id: string) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === 'Active' ? 'Disconnected' : 'Active',
    }))
  }

  return (
    <div className="min-h-full bg-gray-50">

      {/* Top bar */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <h1 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Settings</h1>
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your profile, security, notifications, and payment integrations.
            </p>
          </div>
          <CiSettings className="text-3xl text-gray-300 shrink-0 hidden sm:block" />
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: 'Profile & Org',    desc: 'Name, email, phone',         icon: <IoPersonCircleOutline className="text-xl text-blue-600" />,   bg: 'bg-blue-50',   border: 'border-blue-100',   tab: 'profile'       as Tab },
            { label: 'Security',          desc: 'Password & MFA',             icon: <MdSecurity            className="text-xl text-red-600" />,    bg: 'bg-red-50',    border: 'border-red-100',    tab: 'security'      as Tab },
            { label: 'Notifications',     desc: 'SMS, WhatsApp, Email',       icon: <BsBell                className="text-xl text-yellow-600" />, bg: 'bg-yellow-50', border: 'border-yellow-100', tab: 'notifications' as Tab },
            { label: 'Integrations',      desc: 'M-Pesa, Bank APIs',          icon: <BsShieldCheck         className="text-xl text-green-600" />,  bg: 'bg-green-50',  border: 'border-green-100',  tab: 'integrations'  as Tab },
          ].map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => setActiveTab(card.tab)}
              className={`text-left bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${
                activeTab === card.tab
                  ? `${card.border} ring-2 ring-yellow-400/30`
                  : 'border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`${card.bg} p-2 rounded-lg`}>{card.icon}</div>
                {activeTab === card.tab && (
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                )}
              </div>
              <p className="text-sm font-semibold text-gray-800">{card.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.desc}</p>
            </button>
          ))}
        </div>

        {/* Tab nav (secondary) */}
        <div className="flex overflow-x-auto gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-yellow-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ── PROFILE ── */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-8">
            <SectionHeader
              icon={<IoPersonCircleOutline className="text-yellow-600 text-xl" />}
              title="Profile & Organization"
              description="Update your personal details and organization information."
            />

            {/* Personal info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name"     value={name}  onChange={setName}  placeholder="Your full name" />
                <Field label="Email Address" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
                <Field label="Phone Number"  value={phone} onChange={setPhone} placeholder="+254 7XX XXX XXX"
                  hint="Used for M-Pesa reconciliation and SMS reminders" />
                <Field label="Account ID"    value="VP-00124" readOnly hint="System-assigned. Cannot be changed." />
              </div>
            </div>

            {/* Organization */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <BsBuilding className="text-gray-400" /> Organization Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Organization Name"   value={orgName} onChange={setOrgName} placeholder="Your group or company name" />
                <Field label="Subscription Tier"   value={tier}    onChange={setTier} />
                <Field label="M-Pesa Paybill / Till" value="247247"  readOnly hint="Used for C2B collections." />
                <Field label="Registered Since"    value="Jan 2024" readOnly />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <button type="button" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md">
                <FaSave className="text-xs" /> Save Changes
              </button>
              <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <FaTimes className="text-xs" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── SECURITY ── */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-8">
            <SectionHeader
              icon={<MdSecurity className="text-yellow-600 text-xl" />}
              title="Security"
              description="Manage your password, multi-factor authentication, and active sessions."
            />

            {/* Change password */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Change Password</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                <div className="sm:col-span-2">
                  <Field label="Current Password" value={currentPwd} onChange={setCurrentPwd} type={showPwd ? 'text' : 'password'} placeholder="••••••••" />
                </div>
                <Field label="New Password"     value={newPwd}     onChange={setNewPwd}     type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                  hint="Min. 8 characters, include numbers and symbols." />
                <Field label="Confirm Password" value={confirmPwd} onChange={setConfirmPwd} type={showPwd ? 'text' : 'password'} placeholder="••••••••" />
              </div>
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-yellow-600 mt-2 transition-colors">
                {showPwd ? <FaEyeSlash /> : <FaEye />}
                {showPwd ? 'Hide' : 'Show'} passwords
              </button>
            </div>

            {/* MFA */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Multi-Factor Authentication (MFA)</h4>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${mfaEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <BsShieldCheck className={`text-lg ${mfaEnabled ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">MFA via SMS / Authenticator</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {mfaEnabled ? 'MFA is enabled — your account is protected.' : 'MFA is disabled — recommended for Admins.'}
                    </p>
                  </div>
                </div>
                <Toggle on={mfaEnabled} onToggle={() => setMfaEnabled(!mfaEnabled)} />
              </div>
            </div>

            {/* Sessions */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Active Sessions</h4>
              <div className="space-y-3 max-w-lg">
                {[
                  { device: 'Chrome on Windows',  location: 'Nairobi, KE', time: 'Now — current session', current: true  },
                  { device: 'Safari on iPhone',   location: 'Nairobi, KE', time: '2 hours ago',            current: false },
                  { device: 'Firefox on Mac',     location: 'Kisumu, KE',  time: 'Yesterday, 3:42 PM',     current: false },
                ].map((s) => (
                  <div key={s.device} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{s.device}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.location} · {s.time}</p>
                    </div>
                    {s.current
                      ? <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Current</span>
                      : <button type="button" className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors">Revoke</button>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <button type="button" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md">
                <FaSave className="text-xs" /> Save Changes
              </button>
              <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <FaTimes className="text-xs" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-8">
            <SectionHeader
              icon={<BsBell className="text-yellow-600 text-xl" />}
              title="Notification Preferences"
              description="Configure how and when VersoPaid sends you reminders, alerts, and reports."
            />

            {/* Channel toggles */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Channels</h4>
              <div className="space-y-3 max-w-lg">
                {[
                  { label: 'SMS Reminders',      icon: <FaSms        className="text-gray-500" />, desc: 'Payment due & defaulter alerts via SMS',        on: smsOn,   toggle: () => setSmsOn(!smsOn)   },
                  { label: 'WhatsApp Alerts',    icon: <FaWhatsapp   className="text-green-500" />, desc: 'Real-time notifications on WhatsApp',           on: waOn,    toggle: () => setWaOn(!waOn)     },
                  { label: 'Email Notifications',icon: <MdOutlineEmail className="text-blue-500" />,desc: 'Weekly summaries and audit reports via email',  on: emailOn, toggle: () => setEmailOn(!emailOn) },
                ].map((ch) => (
                  <div key={ch.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ch.on ? 'bg-yellow-50 border border-yellow-100' : 'bg-gray-100'}`}>
                        {ch.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{ch.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{ch.desc}</p>
                      </div>
                    </div>
                    <Toggle on={ch.on} onToggle={ch.toggle} />
                  </div>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Report Frequency</h4>
              <p className="text-xs text-gray-400 mb-4">How often should VersoPaid send you collection and reconciliation summaries?</p>
              <div className="flex flex-wrap gap-2 max-w-sm">
                {(['daily', 'weekly', 'monthly'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFreq(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all border ${
                      freq === f
                        ? 'bg-yellow-500 text-white border-yellow-500 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification types */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Notification Types</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {[
                  { label: 'Payment Received',       on: true  },
                  { label: 'Defaulter Alert',         on: true  },
                  { label: 'Reconciliation Complete', on: true  },
                  { label: 'Failed Transaction',      on: true  },
                  { label: 'Plan Renewal Reminder',   on: false },
                  { label: 'Monthly Report Ready',    on: true  },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
                    <span className="text-sm text-gray-700">{n.label}</span>
                    {n.on
                      ? <BsToggleOn  className="text-yellow-500 text-xl cursor-pointer" />
                      : <BsToggleOff className="text-gray-300   text-xl cursor-pointer" />
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <button type="button" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md">
                <FaSave className="text-xs" /> Save Preferences
              </button>
              <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <FaTimes className="text-xs" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── INTEGRATIONS ── */}
        {activeTab === 'integrations' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <SectionHeader
              icon={<BsShieldCheck className="text-yellow-600 text-xl" />}
              title="Integrations"
              description="Manage connected payment gateways and bank APIs for reconciliation and collections."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {integrations.map((integ) => {
                const current = statuses[integ.id]
                return (
                  <div
                    key={integ.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                      current === 'Active'
                        ? 'border-green-100 bg-green-50/30'
                        : current === 'Error'
                        ? 'border-red-100 bg-red-50/20'
                        : current === 'Pending'
                        ? 'border-yellow-100 bg-yellow-50/20'
                        : 'border-gray-100 bg-gray-50/40'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${integ.iconBg} flex items-center justify-center shrink-0`}>
                      {integ.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-800">{integ.name}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${integStatusStyle[current]}`}>
                          {integStatusIcon[current]}
                          {current}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{integ.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        {current === 'Active' ? (
                          <button
                            type="button"
                            onClick={() => toggleInteg(integ.id)}
                            className="text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 px-3 py-1 rounded-lg bg-white hover:bg-red-50 transition-colors"
                          >
                            Disconnect
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleInteg(integ.id)}
                            className="text-xs font-semibold text-white px-3 py-1 rounded-lg bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transition-all shadow-sm"
                          >
                            {current === 'Error' ? 'Reconnect' : 'Connect'}
                          </button>
                        )}
                        <button type="button" className="text-xs font-medium text-gray-500 hover:text-yellow-600 transition-colors">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Integration note */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-start gap-3">
              <MdOutlinePhoneAndroid className="text-yellow-600 text-xl shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">M-Pesa is your primary reconciliation gateway</p>
                <p className="text-xs text-yellow-700 mt-1 leading-relaxed">
                  VersoPaid does not hold funds. All transactions are reconciled in real time through connected APIs. 
                  Ensure your M-Pesa API credentials are up to date to avoid reconciliation failures.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Settings
