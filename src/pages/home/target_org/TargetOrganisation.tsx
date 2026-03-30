import { BsBank, BsBuilding, BsArrowRight } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';

const TargetOrganisation = () => {
  const organisations = [
    {
      title: "SACCOS",
      icon: <BsBank className="text-4xl text-blue-600" />,
      description: "Track member contributions and reconcile M-Pesa and bank payments automatically. Defaulter lists, reminders, and audit-ready reports for branches.",
      features: ["M-Pesa & bank reconciliation", "Contribution tracking", "Defaulter tracking", "Monthly reports"],
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-100",
      stats: "Recurring collections"
    },
    {
      title: "CHAMAS",
      icon: <FaUsers className="text-4xl text-green-600" />,
      description: "Automate M-Pesa & bank payments matching and see who has paid. Get WhatsApp and SMS reminders, defaulter lists, and simple contribution reports.",
      features: ["M-Pesa & bank reconciliation", "Subscription tracking", "Defaulter alerts", "Reminders"],
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-100",
      stats: "Chamas & groups"
    },
    {
      title: "SMEs",
      icon: <BsBuilding className="text-4xl text-purple-600" />,
      description: "Gyms, ISPs, schools — track recurring payments, reconcile M-Pesa and bank payments, flag defaulters, and send reminders with clear reporting.",
      features: ["M-Pesa & bank reconciliation", "Subscription tracking", "Defaulter tracking", "Reminders & reports"],
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-100",
      stats: "Gyms, ISPs, schools"
    }
  ];

  return (
    <section className="flex justify-center items-center gap-4 p-4 w-full py-16 bg-linear-to-b from-white to-gray-50">
      <div className="w-[90%] max-w-7xl flex flex-col justify-center items-center">
        
        <div className="flex flex-col justify-center items-center gap-4 mb-12">
          <span className="font-bold text-4xl md:text-5xl text-gray-900">
            Built For Recurring{' '}
            <span className="text-yellow-500">Collections</span>
          </span>
          <p className="text-gray-600 text-center w-full md:w-[70%] text-lg leading-relaxed">
            Chamas, SACCO branches, gyms, ISPs, schools — anyone who collects monthly payments via M-Pesa 
            and needs reconciliation, defaulter tracking, and clear reports.
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
          <span className="text-sm text-gray-500">M-Pesa & bank reconciliation first</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">No manual chasing</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">Data Protection Compliant</span>
        </div>

      </div>
    </section>
  );
};

export default TargetOrganisation;