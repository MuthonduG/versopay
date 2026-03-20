import { type ReactElement } from "react"
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import { FiServer } from "react-icons/fi";
import { MdSecurity, MdVerified } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import security_image from "../../../assets/secure.png"

interface securityProps {
    title: string;
    icon?: ReactElement
}

const securityPropsList: securityProps[] = [
    { title: "End-to-End Encryption", icon: <RiSecurePaymentFill className="text-yellow-400 text-xl" /> },
    { title: "Two-Factor Authentication", icon: <FaLock className="text-yellow-400 text-xl" /> },
    { title: "Audit Logs", icon: <RiFileEditFill className="text-yellow-400 text-xl" /> },
    { title: "99.9% Uptime", icon: <FiServer className="text-yellow-400 text-xl" /> },
]

const SecurityTransactionsComponent = () => {
  return (
    <section className="flex justify-center items-center w-full bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 relative overflow-hidden">
      
      {/* Decorative yellow elements - subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-20 opacity-5">
          <BsStars className="text-yellow-400 text-6xl" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col-reverse md:flex-row justify-center items-center py-10 p-4 w-[90%] lg:w-[70%] gap-12">
            
        {/* Left side - Content */}
        <div className="flex-1 flex-col justify-start items-start gap-6 p-4">
          
          {/* Header with yellow gradient */}
          <span className="text-white text-4xl lg:text-5xl font-bold leading-tight">
            Secure by Design.{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-amber-400">
              No Funds Held.
            </span>
          </span>

          {/* Description */}
          <p className="text-gray-300 mt-4 leading-relaxed text-lg">
            VersoPaid does not hold your money — we connect to M-Pesa and your bank to reconcile and report. 
            Your payment data is protected with strong security and we align with Kenya’s Data Protection Act.
          </p>

          {/* Security features grid - updated to yellow theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center p-3 gap-6 mt-8">
            {securityPropsList.map((element, index) => (
              <div 
                key={element.title} 
                className="flex flex-col  items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-7 hover:bg-white/10 transition-all duration-300 hover:scale-105 group border border-gray-800 hover:border-yellow-500/20"
              >
                <div className="bg-yellow-500/20 p-3 rounded-full group-hover:bg-yellow-500/30 transition-colors">
                  {element.icon}
                </div>
                <div>
                  <p className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                    {element.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {index === 0 && "AES-256 encryption" }
                    {index === 1 && "SMS & authenticator apps" }
                    {index === 2 && "Complete activity tracking" }
                    {index === 3 && "99.9% uptime SLA" }
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance badges - updated checkmarks to yellow */}
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-yellow-500" />
              <span className="text-gray-300 text-sm">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-yellow-500" />
              <span className="text-gray-300 text-sm">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-yellow-500" />
              <span className="text-gray-300 text-sm">GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Right side - Image with overlays - updated to yellow theme */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative w-full max-w-md">
            {/* Glowing background effect - updated to yellow */}
            <div className="absolute -inset-4 bg-linear-to-r from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Shield overlay - updated to yellow */}
              <div className="absolute -top-4 -right-4 bg-linear-to-r from-yellow-500 to-amber-500 rounded-full p-4 shadow-xl animate-pulse">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              
              {/* Main image */}
              <img 
                src={security_image} 
                alt="Security Dashboard" 
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-700"
              />
              
              {/* Verification badge - updated to yellow */}
              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2 border border-gray-700">
                <MdVerified className="text-yellow-400 text-xl" />
                <span className="text-white text-sm font-medium">Reconciliation & reporting only</span>
              </div>
            </div>
          </div>

          {/* Floating stats card - updated to yellow */}
          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-gray-700 animate-float hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <MdSecurity className="text-yellow-400 text-xl" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">0</p>
                  <p className="text-gray-400 text-xs">Security breaches</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data protection badge - updated to yellow */}
          <div className="absolute -right-12 bottom-1/4 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-gray-700 hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2">
                <FiServer className="text-yellow-400" />
                <span className="text-white text-xs">Data Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default SecurityTransactionsComponent