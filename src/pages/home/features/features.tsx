import { FaRecycle, FaWallet, FaBullseye, FaPiggyBank } from "react-icons/fa6";
import { MdSubscriptions } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { BsStars } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";

const FeaturesPage = () => {
  const features = [
    {
      icon: <MdSubscriptions className="text-2xl text-yellow-600" />,
      title: "Subscriptions & recurring charges",
      description:
        "See what you pay every month—streaming, airtime bundles, apps, and other renewals—in one view. Spot forgotten renewals and stay ahead of due dates.",
    },
    {
      icon: <FaWallet className="text-2xl text-yellow-600" />,
      title: "Expense tracking",
      description:
        "Log and categorize spending so you always know where money went. One clean flow for day-to-day purchases, transfers, and fees—without spreadsheet fatigue.",
    },
    {
      icon: <FaBullseye className="text-2xl text-yellow-600" />,
      title: "Budgets & spending goals",
      description:
        "Set limits by category or time period and track progress as you spend. Stay intentional when you’re close to a cap, the same way you’d expect from a modern money app.",
    },
    {
      icon: <FaPiggyBank className="text-2xl text-yellow-600" />,
      title: "Saving goals",
      description:
        "Name a target—rainy day fund, school fees, travel—and watch progress over time. Simple milestones that keep motivation high as balances grow.",
    },
    {
      icon: <FaRecycle className="text-2xl text-yellow-600" />,
      title: "M-Pesa & bank reconciliation",
      description:
        "Match M-Pesa and bank lines to your own spending and savings picture automatically. Fewer manual statement reviews and fewer “where did this go?” moments.",
    },
    {
      icon: <VscGraph className="text-2xl text-yellow-600" />,
      title: "Reminders & reporting",
      description:
        "SMS, WhatsApp, and email nudges for bills and renewals. Summaries and exports when you want a snapshot of the month—without digging through screenshots.",
    },
  ];

  return (
    <section id="solutions" className="flex justify-center items-center w-full bg-[#e8f1ff] mt-16 mb-10 py-16 relative overflow-hidden">
      
      {/* Decorative yellow/amber elements - subtle overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl"></div>
        
        <div className="absolute top-20 right-40 opacity-10 animate-float-slow">
          <BsStars className="text-yellow-500 text-5xl" />
        </div>
        <div className="absolute bottom-20 left-40 opacity-10 animate-float-slow">
          <HiOutlineSparkles className="text-amber-500 text-5xl" />
        </div>
      </div>

      <div className="relative z-10 mt-10 w-[90%] lg:w-[70%]">
        
        <div className="text-center mb-16">
          
          <h2 className="text-[#0f1724] text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Track, budget, and plan—{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
              with Kenya in mind
            </span>
          </h2>
          
          <p className="text-[#606874] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            VersoPaid brings the clarity people expect from leading subscription and budgeting apps—recurring visibility, categorized spending, and goals—then adds
            M-Pesa and bank reconciliation so Kenyan mobile money fits naturally into your personal dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-xl w-full max-w-sm text-left border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              {/* Removed the top accent bar completely */}
              
              <div className="bg-linear-to-r from-yellow-100 to-amber-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-[#0f1724] text-xl font-semibold mb-2 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-yellow-600 group-hover:to-amber-600 transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-[#606874] text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative element - very subtle */}
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-linear-to-r from-yellow-500/5 to-amber-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-[#606874] mb-6">
            Ready to tame subscriptions, understand spending, and feel on top of every shilling?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get Started Today
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;