import { BsCheckCircleFill, BsStars, BsShieldCheck, BsClockHistory } from 'react-icons/bs';
import { FaHandsHelping, FaChartLine } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineDashboard, MdOutlinePayments } from 'react-icons/md';
import { RiTeamLine } from 'react-icons/ri';
import { ImArrowRight2 } from "react-icons/im";
import maxwellImage from '../../../assets/max.jpeg';
import josephImage from '../../../assets/jose.jpg';


const AboutComponent = () => {
  const values = [
    {
      icon: <BsCheckCircleFill className="text-2xl" />,
      title: "Simplicity First",
      description: "We believe financial tools should be straightforward. No complex setups — just clear reconciliation and reporting."
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: "Built for SMEs",
      description: "Designed specifically for Kenyan small businesses and collection groups. We understand your workflow."
    },
    {
      icon: <BsShieldCheck className="text-2xl" />,
      title: "Trust & Security",
      description: "Your data is protected. We never hold funds — we provide visibility and reconciliation only."
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Transparency",
      description: "Clear reporting, no hidden fees. Know exactly who paid, who didn't, and when."
    }
  ];

  const stats = [
    { value: "0", label: "Manual Hours Saved", suffix: "+", prefix: false },
    { value: "100", label: "Accuracy Rate", suffix: "%", prefix: false },
    { value: "24", label: "Support Response", suffix: "hrs", prefix: false },
    { value: "0", label: "Funds Held", suffix: "", prefix: "KES " }
  ];

  const executives = [
    {
      image: maxwellImage,
      name: 'Maxwell Githinji',
      title: 'Founder & CEO',
      bio: 'Senior engineer with expertise in DevOps, backend systems, and product development.',
    },
    {
      image: josephImage,
      name: 'Joseph Wamiti',
      title: 'Co-Founder & CTO',
      bio: 'Senior software engineer with prior experience in blockchain, business development, and marketing strategy.',
    },
  ];

  return (
    <section id="about" className="flex justify-center items-center w-full bg-white py-20 relative overflow-hidden">
      
      {/* Decorative elements - matching theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-float-slow">
          <BsStars className="text-yellow-500 text-6xl" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-10 animate-float-slow">
          <HiOutlineSparkles className="text-amber-500 text-5xl" />
        </div>
      </div>

      <div className="relative z-10 w-[90%] max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Making Financial Visibility{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
              Simple & Accessible
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Versopaid is a lightweight reconciliation and subscription management platform built specifically 
            for small recurring-collection groups in Kenya. We help organizations track who has paid and who 
            hasn't — automatically — so you don't have to manually reconcile M-Pesa statements.
          </p>
        </div>

        {/* Problem & Solution Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Problem Card */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <BsClockHistory className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Challenge</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Small and medium-sized recurring-collection groups in Kenya face major operational challenges:
            </p>
            <ul className="space-y-3">
              {[
                "Manual reconciliation of M-Pesa statements",
                "Time-consuming follow-ups with defaulters",
                "Errors in payment tracking",
                "Lack of structured reporting",
                "Overreliance on Excel and WhatsApp screenshots"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <MdOutlineDashboard className="text-yellow-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Solution</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 font-medium">
              Versopaid provides automated reconciliation and tracking:
            </p>
            <ul className="space-y-3">
              {[
                "Automated reconciliation of mobile and bank payments",
                "Subscription and recurring contribution tracking",
                "Defaulter identification and tracking",
                "Automated reminders and notifications",
                "Structured financial reporting"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <BsCheckCircleFill className="text-yellow-500 text-sm mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500 mb-2 group-hover:scale-110 transition-transform inline-block">
                {stat.prefix && <span>{stat.prefix}</span>}
                {stat.value}
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our principles guide how we build products and serve our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-linear-to-r from-yellow-100 to-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-yellow-600">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Team Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Executive Team</h3>
            <p className="text-gray-600">Built by experienced operators focused on reliable financial products.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {executives.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-emerald-100"
                />
                <h4 className="mt-5 text-2xl font-bold text-gray-900">{member.name}</h4>
                <p className="mt-1 text-lg font-semibold text-emerald-500">{member.title}</p>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Highlight */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 to-amber-500/10"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full mb-6">
              <MdOutlinePayments className="text-yellow-400 text-sm" />
              <span className="text-sm font-medium text-yellow-400">M-Pesa Native</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Built for Kenya's Mobile Money Ecosystem
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Seamlessly integrates with M-Pesa, Airtel Money, and major Kenyan banks. 
              No complex setup — just connect and start reconciling.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {["M-Pesa", "Airtel Money", "Equity Bank", "KCB"].map((bank, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
                  <span className="text-white text-sm font-medium">{bank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team/CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <RiTeamLine className="text-yellow-500 text-xl" />
            <span className="text-sm font-medium text-gray-500">Join Our Journey</span>
          </div>
          <p className="text-gray-600 mb-6">
            We're on a mission to simplify financial operations for thousands of Kenyan groups.
            <br />
            Be part of the first groups to experience automated reconciliation.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Join The Waitlist
            <ImArrowRight2 className="text-sm" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutComponent;