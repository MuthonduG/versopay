import { FaArrowRight, FaBullseye, FaPiggyBank, FaWallet } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import { GiBank } from 'react-icons/gi';

const pillars = [
  {
    title: 'Track',
    tagline: 'Know where you stand',
    description:
      'See subscriptions, day-to-day spending, and cash flow in one place—so you always know where your money is going.',
    icon: <FaWallet className="text-4xl text-yellow-600" />,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    accentDot: 'bg-yellow-500',
  },
  {
    title: 'Budget',
    tagline: 'Spending that fits your life',
    description:
      'Set limits by category, get gentle signals when you are close to a cap, and stay intentional without spreadsheet fatigue.',
    icon: <FaBullseye className="text-4xl text-amber-600" />,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    accentDot: 'bg-amber-500',
  },
  {
    title: 'Subscriptions',
    tagline: 'Recurring charges, visible',
    description:
      'Streaming, bundles, apps, and other renewals in one list—spot what repeats every month before it surprises you.',
    icon: <MdSubscriptions className="text-4xl text-yellow-600" />,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    accentDot: 'bg-yellow-500',
  },
  {
    title: 'Plan & reconcile',
    tagline: 'Goals plus M-Pesa clarity',
    description:
      'Name savings targets and track progress. Match M-Pesa and bank activity to your own ledger so your picture stays accurate.',
    icon: <GiBank className="text-4xl text-amber-600" />,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    accentDot: 'bg-amber-500',
  },
];

const TargetOrganisation = () => {
  return (
    <section className="flex justify-center items-center gap-4 p-4 w-full py-16 bg-linear-to-b from-white to-gray-50">
      <div className="w-[90%] max-w-7xl flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4 mb-12">
          <span className="font-bold text-4xl md:text-5xl text-gray-900 text-center">
            Everything you need,{' '}
            <span className="text-yellow-500">in one app</span>
          </span>
          <p className="text-gray-600 text-center w-full md:w-[70%] text-lg leading-relaxed">
            Budget, track your progress, and plan ahead—like leading personal finance apps—with Kenya-first M-Pesa and bank connectivity
            baked in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
          {pillars.map((item) => (
            <div
              key={item.title}
              className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border ${item.borderColor}`}
            >
              <div className={`h-2 w-full ${item.bgColor}`} />

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 ${item.bgColor} rounded-2xl group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.tagline}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">{item.description}</p>

                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 hover:gap-3 transition-all group/link"
                >
                  Learn more
                  <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                <FaPiggyBank className="w-full h-full text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60">
          <span className="text-sm text-gray-500">Built for personal accounts first</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">No ads • no funds held</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">Data protection aligned</span>
        </div>
      </div>
    </section>
  );
};

export default TargetOrganisation;
