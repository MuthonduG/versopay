import { BsBank, BsBuilding, BsArrowRight } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';

const TargetOrganisation = () => {
  const organisations = [
    {
      title: "SACCOS",
      icon: <BsBank className="text-4xl text-blue-600" />,
      description: "Credit unions and savings cooperatives managing member contributions, loans, and dividend payouts. Perfect for SACCOs with 50-5000+ members.",
      features: ["Member contribution tracking", "Loan repayment monitoring", "Dividend calculations", "Branch management"],
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-100",
      stats: "2,500+ members"
    },
    {
      title: "CHAMAS",
      icon: <FaUsers className="text-4xl text-green-600" />,
      description: "Investment groups, merry-go-rounds, and social clubs that need transparent contribution tracking and automated payout notifications.",
      features: ["Monthly contribution tracking", "Automatic defaulter alerts", "Payout scheduling", "Group financial reports"],
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-100",
      stats: "50-200 members"
    },
    {
      title: "SMEs",
      icon: <BsBuilding className="text-4xl text-purple-600" />,
      description: "Small to medium businesses with recurring billing - from gyms and ISPs to schools and property managers.",
      features: ["Recurring invoice generation", "Payment reconciliation", "Customer payment portal", "Revenue analytics"],
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-100",
      stats: "100-1000+ customers"
    }
  ];

  return (
    <section className="flex justify-center items-center gap-4 p-4 w-full py-16 bg-linear-to-b from-white to-gray-50">
      <div className="w-[90%] max-w-7xl flex flex-col justify-center items-center">
        
        <div className="flex flex-col justify-center items-center gap-4 mb-12">
          <span className="font-bold text-4xl md:text-5xl text-gray-900">
            Built For Your{' '}
            <span className="text-blue-700">Organization</span>
          </span>
          <p className="text-gray-600 text-center w-full md:w-[70%] text-lg leading-relaxed">
            Whether you manage a small investment group or a large credit union, 
            VersoPaid scales with you - from 50 to 5,000+ members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
          {organisations.map((org, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border ${org.borderColor}`}
            >
              <div className={`h-2 w-full ${org.bgColor}`}></div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 ${org.bgColor} rounded-2xl group-hover:scale-110 transition-transform`}>
                    {org.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{org.title}</h3>
                    <p className="text-sm text-gray-500">{org.stats}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {org.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {org.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className={`w-1.5 h-1.5 rounded-full ${org.bgColor.replace('50', '500')}`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a 
                  href="#" 
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    org.title === "SACCOS" ? "text-blue-600" : 
                    org.title === "CHAMAS" ? "text-green-600" : "text-purple-600"
                  } hover:gap-3 transition-all group/link`}
                >
                  Learn more about {org.title} 
                  <BsArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                {org.title === "SACCOS" && <BsBank className="w-full h-full" />}
                {org.title === "CHAMAS" && <FaUsers className="w-full h-full" />}
                {org.title === "SMEs" && <BsBuilding className="w-full h-full" />}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60">
          <span className="text-sm text-gray-500">Trusted by 500+ organizations</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">4.9/5 from 200+ reviews</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">GDPR & Data Protection Compliant</span>
        </div>

      </div>
    </section>
  );
};

export default TargetOrganisation;