import header_image_two from "../../../assets/header_two.png";
import { MdOutlineNotifications, MdPayment } from "react-icons/md";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { BsCheckCircleFill, BsStars } from "react-icons/bs";
import { GiBank } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi";
import mpesa_logo from "../../../assets/mpesa.png";
import airtel_logo from "../../../assets/airtel.png";
import momo_logo from "../../../assets/momo.png";
import kcb_logo from "../../../assets/kcb.png";
import equity_logo from "../../../assets/equity.png";

interface HeaderComponentProps {
  onJoinWaitlist?: () => void;
}

const HeaderComponent = ({ onJoinWaitlist }: HeaderComponentProps) => {
  // Integrations data
  const integrations = [
    { 
      name: "MPesa", 
      image: mpesa_logo,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      hasImage: true
    },
    { 
      name: "Airtel Money", 
      icon: <RiMoneyDollarCircleFill className="text-2xl" />,
      image: airtel_logo,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      hasImage: true
    },
    { 
      name: "Momo Money", 
      icon: <RiMoneyDollarCircleFill className="text-2xl" />,
      image: momo_logo,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      hasImage: true
    },
    { 
      name: "KCB", 
      icon: <GiBank className="text-2xl" />,
      image: kcb_logo,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      hasImage: true
    },
    { 
      name: "Equity", 
      icon: <GiBank className="text-2xl" />,
      image: equity_logo,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      hasImage: true
    },
   
    

  ];

  return (
    <header className="w-full flex flex-col justify-center items-center mt-28 relative overflow-visible">
      
      {/* Decorative background elements - matching Navbar theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="absolute top-40 left-20 animate-float-slow opacity-10">
          <BsStars className="text-yellow-500 text-6xl" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float-slow opacity-10">
          <HiOutlineSparkles className="text-amber-500 text-6xl" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-4 w-[90%] lg:w-[70%]">

        {/* Left side - Content */}
        <div className="flex-1 flex-col justify-center items-center md:justify-start md:items-start p-4 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Your home base for{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
              money clarity.
            </span>
          </h1>
          
          <p className="text-gray-600 leading-relaxed text-lg mt-8">
            The modern way to manage your money: see subscriptions and recurring charges, categorize spending, set budgets, and plan savings—then line up M‑Pesa
            and bank activity so your picture stays accurate. VersoPaid is personal finance built for Kenya, with mobile money in the loop from day one.
          </p>
          
          {/* Updated CTA buttons to match Navbar yellow theme */}
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 mt-14 w-full">
            <button
              type="button"
              onClick={() => onJoinWaitlist?.()}
              className="group w-full md:w-auto px-8 py-4 flex justify-center items-center bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transform shadow-xl rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 gap-2"
            >
              Join The Waitlist
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right side - Image with overlays */}
        <div className="flex-1 md:flex hidden justify-center items-center p-2 relative min-h-125">
          {/* Main image container */}
          <div className="flex justify-center items-center relative h-96 w-96 mt-12 rounded-2xl shadow-xl overflow-hidden group">
            <img 
              src={header_image_two} 
              alt="Dashboard preview" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            {/* Yellow accent overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-yellow-500/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Notification card - updated with yellow theme */}
          <div className="absolute -top-6 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 animate-bounce-slow z-20"
               style={{ transform: 'translateX(25%)' }}>
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 p-2 rounded-full shrink-0">
                <MdOutlineNotifications className="text-yellow-600 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium truncate">RECONCILED</p>
                <p className="text-sm font-semibold text-gray-800 truncate">Jane Njeri</p>
                <p className="text-xs text-gray-600 mt-1 truncate">KES 500 matched • 2 min ago</p>
              </div>
              <BsCheckCircleFill className="text-green-500 text-lg shrink-0" />
            </div>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
          </div>

          {/* WhatsApp card - keep green for WhatsApp brand */}
          <div className="absolute bottom-12 -left-16 bg-white rounded-2xl shadow-2xl p-4 w-72 animate-slide-in z-20"
               style={{ transform: 'translateX(20%)' }}>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full shrink-0">
                <FaWhatsapp className="text-green-600 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-gray-500 truncate">VersoPaid • now</p>
                  <span className="text-[10px] bg-yellow-500 text-white px-2 py-0.5 rounded-full shrink-0">NEW</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mt-1 truncate">Automated Reminder</p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  Your KES 500 subscription is due tomorrow. Pay via M-Pesa.
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">Pay Now</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">Remind Later</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
          </div>

          {/* Stats card - updated with yellow theme */}
          <div className="absolute top-16 -right-12 bg-white rounded-xl shadow-2xl p-3 w-48 animate-float z-20"
               style={{ transform: 'translateX(15%)' }}>
            <div className="flex items-center gap-2">
              <MdPayment className="text-yellow-500 text-lg shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500 truncate">Monthly Report</p>
                <p className="text-sm font-bold text-gray-800 truncate">KES 45,500</p>
                <p className="text-[10px] text-yellow-600 truncate">On track this month</p>
              </div>
            </div>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-lg"></div>
          </div>

        </div>

      </div>

      {/* Powered By section */}
      <div className="relative z-10 mt-4">
        <span className="text-xl font-semibold text-gray-600/40">Powered By:</span>
      </div>

      {/* Integrations slider - desktop */}
      <div className="relative z-10 w-full overflow-hidden py-2 hidden md:block">
        <div className="relative flex overflow-x-hidden py-8">
          <div className="flex animate-scroll gap-6 whitespace-nowrap pr-6">
            {integrations.map((integration, index) => (
              <div
                key={`${integration.name}-${index}`}
                className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 hover:border-transparent"
                style={{ marginRight: '0' }}
              >
                {integration.image ? (
                  <div className={`w-8 h-8 rounded-full ${integration.bgColor} p-0 flex items-center justify-center overflow-hidden`}>
                    <img 
                      src={integration.image} 
                      alt={integration.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`${integration.bgColor} p-2 rounded-full`}>
                    <div className={integration.textColor}>{integration.icon}</div>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">{integration.name}</span>
              </div>
            ))}
          </div>

          <div className="flex animate-scroll gap-6 whitespace-nowrap pr-6" aria-hidden="true">
            {integrations.map((integration, index) => (
              <div
                key={`${integration.name}-duplicate-${index}`}
                className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 hover:border-transparent"
                style={{ marginRight: '0' }}
              >
                {integration.image ? (
                  <div className={`w-8 h-8 rounded-full ${integration.bgColor} p-0 flex items-center justify-center overflow-hidden`}>
                    <img 
                      src={integration.image} 
                      alt={integration.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`${integration.bgColor} p-2 rounded-full`}>
                    <div className={integration.textColor}>{integration.icon}</div>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile integrations grid */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 mt-8 md:hidden">
        {integrations.map((integration, index) => (
          <div
            key={`mobile-${integration.name}-${index}`}
            className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100"
          >
            {integration.image ? (
              <div className={`w-6 h-6 rounded-full ${integration.bgColor} p-0 flex items-center justify-center overflow-hidden`}>
                <img 
                  src={integration.image} 
                  alt={integration.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={`${integration.bgColor} p-1.5 rounded-full`}>
                <div className={`${integration.textColor} text-sm`}>{integration.icon}</div>
              </div>
            )}
            <span className="text-xs font-medium text-gray-700">{integration.name}</span>
          </div>
        ))}
      </div>

    </header>
  )
}

export default HeaderComponent;