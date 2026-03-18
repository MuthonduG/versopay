import { FaRecycle } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { BsStars } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";

const FeaturesPage = () => {
  const features = [
    {
      icon: <FaRecycle className="text-2xl text-yellow-600" />,
      title: "Automated M-Pesa Reconciliation",
      description: "Payments from M-Pesa are matched to members automatically. No more manual statement reviews or spreadsheet errors.",
    },
    {
      icon: <IoPeopleSharp className="text-2xl text-yellow-600" />,
      title: "Subscription & Defaulter Tracking",
      description: "See who has paid and who hasn’t at a glance. Flag missed payments in real time and manage defaulters from one dashboard.",
    },
    {
      icon: <VscGraph className="text-2xl text-yellow-600" />,
      title: "Reminders & Reporting",
      description: "SMS, WhatsApp, and email reminders for upcoming or missed payments. Weekly and monthly contribution summaries, exportable and audit-ready.",
    }
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
            M-Pesa Reconciliation,{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
              Subscriptions & Reporting
            </span>
          </h2>
          
          <p className="text-[#606874] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Stop manual statement matching. VersoPaid automates reconciliation, tracks recurring contributions, 
            flags defaulters, sends reminders, and delivers audit-ready reports.
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
            Ready to stop reconciling by hand and chasing payments?
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