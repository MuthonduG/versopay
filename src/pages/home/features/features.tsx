import { FaRecycle } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { BsStars } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";

const FeaturesPage = () => {
  const features = [
    {
      icon: <FaRecycle className="text-2xl text-yellow-600" />,
      title: "Recurring Collections",
      description: "Set up daily, weekly, or monthly payment plans. Automatically prompt members via STK push and track compliance in real-time.",
    },
    {
      icon: <IoPeopleSharp className="text-2xl text-yellow-600" />,
      title: "Bulk Disbursements",
      description: "Pay salaries, dividends, or vendor invoices in one click. Support for thousands of recipients across different mobile networks.",
    },
    {
      icon: <VscGraph className="text-2xl text-yellow-600" />,
      title: "Automated Reconciliation",
      description: "Real-time dashboards match incoming payments to member accounts instantly. Say goodbye to manual spreadsheets.",
    }
  ];

  return (
    <section className="flex justify-center items-center w-full bg-[#e8f1ff] mt-16 mb-10 py-16 relative overflow-hidden">
      
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
            Simplify Your{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
              Financial Operations
            </span>
          </h2>
          
          <p className="text-[#606874] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Manual tracking is error-prone and slow. VersoPaid brings automation to your collections 
            and disbursements so you can focus on growth.
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
            Ready to transform your financial operations?
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