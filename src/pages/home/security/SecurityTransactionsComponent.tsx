import { type ReactElement } from "react"
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import { FiServer } from "react-icons/fi";
import { MdSecurity, MdVerified } from "react-icons/md";
import security_image from "../../../assets/secure.png"

interface securityProps {
    title: string;
    icon?: ReactElement
}

const securityPropsList: securityProps[] = [
    { title: "End-to-End Encryption", icon: <RiSecurePaymentFill className="text-green-400 text-xl" /> },
    { title: "Two-Factor Authentication", icon: <FaLock className="text-green-400 text-xl" /> },
    { title: "Audit Logs", icon: <RiFileEditFill className="text-green-400 text-xl" /> },
    { title: "99.9% Uptime", icon: <FiServer className="text-green-400 text-xl" /> },
]

const SecurityTransactionsComponent = () => {
  return (
    <section className="flex justify-center items-center w-full bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="flex flex-col-reverse md:flex-row justify-center items-center py-10 p-4 w-[90%] lg:w-[70%] gap-12">
            
            <div className="flex-1 flex-col justify-start items-start gap-6 p-4">
                
                <span className="text-white text-4xl lg:text-5xl font-bold leading-tight">
                    Enterprise-grade{' '}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-400">
                        Security
                    </span>
                </span>

                <p className="text-gray-300 mt-4 leading-relaxed text-lg">
                    Your financial data is protected by bank-level encryption and strict access controls. 
                    We ensure compliance and transparency at every step, so you can focus on growing 
                    your business with peace of mind.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center p-2 gap-6 mt-8">
                    {
                        securityPropsList.map((element, index) => (
                            <div 
                                key={element.title} 
                                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                            >
                                <div className="bg-green-500/20 p-3 rounded-full group-hover:bg-green-500/30 transition-colors">
                                    {element.icon}
                                </div>
                                <div>
                                    <p className="text-white font-semibold">
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
                        ))
                    }
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-8">
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-gray-300 text-sm">ISO 27001</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-gray-300 text-sm">SOC 2 Type II</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-gray-300 text-sm">GDPR Compliant</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center relative">
                <div className="relative w-full max-w-md">
                    <div className="absolute -inset-4 bg-linear-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-4 shadow-xl animate-pulse">
                            <FaShieldAlt className="text-white text-2xl" />
                        </div>
                        
                        <img 
                            src={security_image} 
                            alt="Security Dashboard" 
                            className="w-full h-auto rounded-2xl shadow-2xl border border-gray-700"
                        />
                        
                        <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2 border border-gray-700">
                            <MdVerified className="text-green-400 text-xl" />
                            <span className="text-white text-sm font-medium">Secured by VersoPaid</span>
                        </div>
                    </div>
                </div>

                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-gray-700 animate-float">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-500/20 p-2 rounded-lg">
                                <MdSecurity className="text-green-400 text-xl" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-semibold">0 Security Breaches</p>
                                <p className="text-gray-400 text-xs">Since 2020</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -right-12 bottom-1/4 hidden lg:block">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-gray-700">
                        <div className="flex items-center gap-2">
                            <FiServer className="text-blue-400" />
                            <span className="text-white text-xs">Data  Protection</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default SecurityTransactionsComponent