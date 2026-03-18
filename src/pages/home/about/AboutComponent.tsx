import { BsShieldCheck } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi'

const AboutComponent = () => {
  return (
    <section id="about" className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold">
              <HiOutlineSparkles className="text-lg" />
              About VersoPaid
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Built for groups that collect repeatedly — and want clarity, not chaos.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              VersoPaid is a lightweight reconciliation and subscription management platform for
              recurring-collection organisations. We help you see who has paid, who hasn’t, and what
              needs follow-up — without spending hours matching statements or chasing members.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                    <FaUsers className="text-lg" />
                  </span>
                  <div>
                    <div className="text-gray-900 font-semibold">Group-first design</div>
                    <div className="text-gray-600 text-sm">
                      Built for chamas, SACCOs, gyms, schools, and teams.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <BsShieldCheck className="text-lg" />
                  </span>
                  <div>
                    <div className="text-gray-900 font-semibold">No funds held</div>
                    <div className="text-gray-600 text-sm">
                      We track and reconcile payments via gateways you already use.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -right-10 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute -bottom-12 -left-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="relative rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="text-sm font-semibold text-gray-500">What we optimize for</div>
                <div className="mt-3 text-2xl font-bold text-gray-900">
                  Predictable collections, transparent reporting, fewer follow-ups.
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                    <div className="text-3xl font-extrabold text-gray-900">Minutes</div>
                    <div className="text-gray-600 text-sm mt-1">
                      to know who paid and who didn’t — per cycle.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                    <div className="text-3xl font-extrabold text-gray-900">1 view</div>
                    <div className="text-gray-600 text-sm mt-1">
                      for balances, defaulters, and receipts.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                    <div className="text-3xl font-extrabold text-gray-900">Automated</div>
                    <div className="text-gray-600 text-sm mt-1">
                      reminders and nudges when payments are due.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                    <div className="text-3xl font-extrabold text-gray-900">Auditable</div>
                    <div className="text-gray-600 text-sm mt-1">
                      trails to support trust and accountability.
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-linear-to-r from-yellow-500 to-amber-500 p-[1px]">
                  <div className="rounded-2xl bg-white p-5">
                    <div className="text-gray-900 font-semibold">Our promise</div>
                    <div className="text-gray-600 text-sm mt-1">
                      We’re building VersoPaid so your treasurer’s work becomes a dashboard — not a
                      spreadsheet marathon.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutComponent

