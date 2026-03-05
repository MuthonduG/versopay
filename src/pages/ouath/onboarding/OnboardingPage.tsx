import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaUserCircle,
  FaPlus,
  FaTrashAlt,
  FaCheckCircle,
  FaArrowRight,
  FaIdBadge,
  FaWallet,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { BsShieldCheck, BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdDashboard, MdAnalytics, MdPayments, MdRepeat, MdPeople, MdSettings } from 'react-icons/md';

const PRIVILEGE_OPTIONS = [
  { key: 'dashboard', label: 'Dashboard', icon: MdDashboard },
  { key: 'analytics', label: 'Analytics', icon: MdAnalytics },
  { key: 'disbursements', label: 'Disbursements', icon: MdPayments },
  { key: 'plans', label: 'Recurring Plans', icon: MdRepeat },
  { key: 'collections', label: 'Collections', icon: FaWallet },
  { key: 'members', label: 'Members', icon: MdPeople },
  { key: 'settings', label: 'Settings', icon: MdSettings },
] as const;

type PrivilegeKey = (typeof PRIVILEGE_OPTIONS)[number]['key'];

export type RoleForm = {
  id: string;
  roleName: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  privileges: Record<PrivilegeKey, boolean>;
};

const defaultPrivileges: Record<PrivilegeKey, boolean> = {
  dashboard: false,
  analytics: false,
  disbursements: false,
  plans: false,
  collections: false,
  members: false,
  settings: false,
};

const createEmptyRole = (): RoleForm => ({
  id: crypto.randomUUID?.() ?? `role-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  roleName: '',
  fullName: '',
  email: '',
  phone: '',
  username: '',
  privileges: { ...defaultPrivileges },
});

function getPrivilegesSummary(role: RoleForm): string {
  const labels = PRIVILEGE_OPTIONS.filter((p) => role.privileges[p.key]).map((p) => p.label);
  return labels.length > 0 ? labels.join(', ') : 'No pages selected';
}

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<RoleForm[]>([createEmptyRole()]);
  const [expandedId, setExpandedId] = useState<string | null>(roles[0]?.id ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const addRole = () => {
    const newRole = createEmptyRole();
    setRoles((prev) => [...prev, newRole]);
    setExpandedId(newRole.id);
  };

  const removeRole = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (roles.length <= 1) return;
    const remaining = roles.filter((r) => r.id !== id);
    setRoles(remaining);
    if (expandedId === id) setExpandedId(remaining[0]?.id ?? null);
  };

  const updateRole = (id: string, field: keyof Omit<RoleForm, 'id' | 'privileges'>, value: string) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[`${id}-${field}`];
      return next;
    });
  };

  const updatePrivilege = (id: string, key: PrivilegeKey, value: boolean) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, privileges: { ...r.privileges, [key]: value } } : r
      )
    );
  };

  const setAllPrivileges = (id: string, value: boolean) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, privileges: Object.fromEntries(PRIVILEGE_OPTIONS.map((p) => [p.key, value])) as Record<PrivilegeKey, boolean> }
          : r
      )
    );
  };

  const toggleExpand = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    roles.forEach((r) => {
      if (!r.roleName?.trim()) errors[`${r.id}-roleName`] = 'Role name is required';
      if (!r.fullName?.trim()) errors[`${r.id}-fullName`] = 'Full name is required';
      if (!r.email?.trim()) errors[`${r.id}-email`] = 'Email is required';
      if (!r.phone?.trim()) errors[`${r.id}-phone`] = 'Phone is required';
      if (!r.username?.trim()) errors[`${r.id}-username`] = 'Username is required';
      const hasAny = PRIVILEGE_OPTIONS.some((p) => r.privileges[p.key]);
      if (!hasAny) errors[`${r.id}-privileges`] = 'Select at least one page access';
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setToast({ type: 'error', message: 'Please fill all required fields and select at least one page per role.' });
      return;
    }
    setSubmitting(true);
    setToast(null);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.05) resolve(undefined);
          else reject(new Error('Network error'));
        }, 1500);
      });
      setToast({ type: 'success', message: 'Onboarding complete! Redirecting to dashboard…' });
      setTimeout(() => navigate('/dashboard', { replace: true }), 800);
    } catch {
      setSubmitting(false);
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section className="w-full min-h-screen flex relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 left-[40%] opacity-20 animate-float-slow">
          <BsStars className="text-yellow-400 text-4xl" />
        </div>
        <div className="absolute bottom-40 right-[40%] opacity-20 animate-float-slow">
          <HiOutlineSparkles className="text-amber-400 text-4xl" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        <div className="lg:flex-1 hidden lg:flex flex-col justify-center items-center text-white p-12 bg-linear-to-br from-yellow-700 via-amber-600 to-yellow-800">
          <div className="max-w-md text-center">
            <div className="flex justify-center items-center mb-8">
              <span className="text-4xl font-bold text-white drop-shadow-lg">Verso</span>
              <span className="text-4xl font-bold text-yellow-200 drop-shadow-lg">Paid</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">Set Up Your Team</h2>
            <p className="text-xl text-yellow-100 leading-relaxed mb-10 drop-shadow">
              Define roles and who can access Dashboard, Collections, Members, and more.
            </p>
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <BsShieldCheck className="text-yellow-300 text-2xl" />
                <span className="text-base font-medium">Control who sees what</span>
              </div>
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <FaIdBadge className="text-yellow-300 text-2xl" />
                <span className="text-base font-medium">CEO, Accountant, HR — your structure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex-1 w-full overflow-y-auto bg-linear-to-br from-yellow-50 via-white to-amber-50 flex items-start justify-center p-6 lg:p-8">
          <div className="w-full max-w-2xl py-8 lg:py-12">
            <div className="flex justify-center items-center gap-2 mb-6 lg:hidden">
              <span className="text-3xl font-bold text-yellow-600">Verso</span>
              <span className="text-3xl font-bold text-gray-900">Paid</span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm font-semibold">
                  <FaCheckCircle className="text-lg" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 hidden sm:inline">Step 1</span>
              </div>
              <div className="w-8 sm:w-12 h-0.5 bg-yellow-400 rounded" />
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-900 hidden sm:inline">Roles & Privileges</span>
              </div>
              <div className="w-8 sm:w-12 h-0.5 bg-gray-200 rounded" />
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-400 hidden sm:inline">Finish</span>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Roles & Privileges</h1>
              <p className="text-gray-600 text-sm">
                Add roles and choose which pages each can access. Click a card to edit.
              </p>
            </div>

            {toast && (
              <div
                className={`mb-4 px-4 py-3 rounded-xl border flex items-center gap-2 ${
                  toast.type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                {toast.type === 'success' ? (
                  <FaCheckCircle className="text-green-600 shrink-0" />
                ) : (
                  <span className="text-red-500 font-bold">!</span>
                )}
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
            )}

            <form onSubmit={handleFinish} className="space-y-4">
              {roles.map((role) => {
                const isExpanded = expandedId === role.id;
                const headline = role.roleName?.trim() || 'New role';
                return (
                  <div
                    key={role.id}
                    className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-200 ${
                      isExpanded ? 'border-yellow-400 shadow-md ring-2 ring-yellow-400/20' : 'border-gray-200 hover:border-yellow-200'
                    }`}
                  >
                    {/* Collapsed summary – clickable header */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(role.id)}
                      className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-inset rounded-t-xl"
                    >
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{headline}</h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                          {role.fullName?.trim() && <span>{role.fullName}</span>}
                          {role.email?.trim() && <span className="truncate">{role.email}</span>}
                          {role.phone?.trim() && <span>{role.phone}</span>}
                          {role.username?.trim() && <span>@{role.username}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          <span className="font-medium text-gray-600">Access: </span>
                          {getPrivilegesSummary(role)}
                        </p>
                      </div>
                      <span className="shrink-0 text-gray-400 mt-1">
                        {isExpanded ? <FaChevronUp className="text-lg" /> : <FaChevronDown className="text-lg" />}
                      </span>
                    </button>

                    {/* Expanded edit form */}
                    {isExpanded && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-gray-100 space-y-4">
                        <div className="flex items-center justify-end pt-2">
                          {roles.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => removeRole(role.id, e)}
                              className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1.5"
                            >
                              <FaTrashAlt className="text-xs" /> Remove Role
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role Name *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaIdBadge className="text-gray-400" />
                              </div>
                              <input
                                value={role.roleName}
                                onChange={(e) => updateRole(role.id, 'roleName', e.target.value)}
                                className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80 ${
                                  fieldErrors[`${role.id}-roleName`] ? 'border-red-400' : 'border-gray-300'
                                }`}
                                placeholder="e.g. CEO, Accountant"
                              />
                            </div>
                            {fieldErrors[`${role.id}-roleName`] && (
                              <p className="text-xs text-red-600 mt-1">{fieldErrors[`${role.id}-roleName`]}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                              </div>
                              <input
                                value={role.fullName}
                                onChange={(e) => updateRole(role.id, 'fullName', e.target.value)}
                                className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80 ${
                                  fieldErrors[`${role.id}-fullName`] ? 'border-red-400' : 'border-gray-300'
                                }`}
                                placeholder="Jane Doe"
                              />
                            </div>
                            {fieldErrors[`${role.id}-fullName`] && (
                              <p className="text-xs text-red-600 mt-1">{fieldErrors[`${role.id}-fullName`]}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                              </div>
                              <input
                                type="email"
                                value={role.email}
                                onChange={(e) => updateRole(role.id, 'email', e.target.value)}
                                className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80 ${
                                  fieldErrors[`${role.id}-email`] ? 'border-red-400' : 'border-gray-300'
                                }`}
                                placeholder="jane@company.com"
                              />
                            </div>
                            {fieldErrors[`${role.id}-email`] && (
                              <p className="text-xs text-red-600 mt-1">{fieldErrors[`${role.id}-email`]}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaPhoneAlt className="text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                value={role.phone}
                                onChange={(e) => updateRole(role.id, 'phone', e.target.value)}
                                className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80 ${
                                  fieldErrors[`${role.id}-phone`] ? 'border-red-400' : 'border-gray-300'
                                }`}
                                placeholder="+254 7XX XXX XXX"
                              />
                            </div>
                            {fieldErrors[`${role.id}-phone`] && (
                              <p className="text-xs text-red-600 mt-1">{fieldErrors[`${role.id}-phone`]}</p>
                            )}
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUserCircle className="text-gray-400" />
                              </div>
                              <input
                                value={role.username}
                                onChange={(e) => updateRole(role.id, 'username', e.target.value)}
                                className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80 ${
                                  fieldErrors[`${role.id}-username`] ? 'border-red-400' : 'border-gray-300'
                                }`}
                                placeholder="jane.doe"
                              />
                            </div>
                            {fieldErrors[`${role.id}-username`] && (
                              <p className="text-xs text-red-600 mt-1">{fieldErrors[`${role.id}-username`]}</p>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">Page access (privileges) *</label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setAllPrivileges(role.id, true)}
                                className="text-xs font-medium text-yellow-600 hover:text-yellow-700"
                              >
                                All
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                type="button"
                                onClick={() => setAllPrivileges(role.id, false)}
                                className="text-xs font-medium text-gray-500 hover:text-gray-700"
                              >
                                None
                              </button>
                            </div>
                          </div>
                          {fieldErrors[`${role.id}-privileges`] && (
                            <p className="text-xs text-red-600 mb-2">{fieldErrors[`${role.id}-privileges`]}</p>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {PRIVILEGE_OPTIONS.map(({ key, label, icon: Icon }) => (
                              <label
                                key={key}
                                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-yellow-50/50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={role.privileges[key]}
                                  onChange={(e) => updatePrivilege(role.id, key, e.target.checked)}
                                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                                />
                                <Icon className="text-gray-500 text-lg" />
                                <span className="text-sm font-medium text-gray-700">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={addRole}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-yellow-300 text-yellow-700 font-medium rounded-xl hover:bg-yellow-50 transition-colors"
              >
                <FaPlus /> Add Role
              </button>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      Finish Onboarding
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              You can change roles and permissions later in Settings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingPage;
