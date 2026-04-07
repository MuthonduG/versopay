import why_us_image from "../../../assets/why_us.png";
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';

const user_avatar_images: string[] = [
    "https://i.pinimg.com/1200x/ff/59/9f/ff599f54dfc78c39e417de2f24640ff3.jpg",
    "https://i.pinimg.com/736x/f9/73/4f/f9734f332e556dd06cc5c8c4c7dedc85.jpg",
    "https://i.pinimg.com/736x/84/fb/74/84fb74866cfe12554c73094b9d7b19c5.jpg",
    "https://i.pinimg.com/736x/1b/c1/69/1bc1690376a67997ef7899c24a8509bb.jpg",
];

const WhyUsComponent = () => {
  return (
    <section className="flex justify-center items-center w-full py-20 bg-linear-to-b from-white to-amber-50/30 relative overflow-hidden">
        
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
            
            <div className="absolute top-40 right-20 animate-float-slow opacity-10">
                <BsStars className="text-yellow-500 text-6xl" />
            </div>
            <div className="absolute bottom-40 left-20 animate-float-slow opacity-10">
                <HiOutlineSparkles className="text-amber-500 text-6xl" />
            </div>
        </div>
        
        <div className="relative z-10 w-[90%] lg:w-[70%] flex flex-col-reverse md:flex-row-reverse justify-center items-center gap-12">
            
            {/* left side - Content */}
            <div className="flex-1 space-y-6">
                <div className="flex flex-col gap-6 justify-start items-start w-full">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Why Choose{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-tr from-yellow-500 to-amber-500">
                            VersoPaid
                        </span>
                    </h2>

                    <p className="text-gray-600 leading-9">
                        VersoPaid helps you stay on top of personal money—subscriptions, day-to-day spending, budgets, and saving goals—with automated M-Pesa and bank
                        reconciliation and reminders that actually reduce mental load. One product mindset: clarity you can trust week to week.
                    </p>                
                </div>

                <div className="space-y-4 mt-8">
                    <div className="flex items-center gap-4 bg-white hover:bg-amber-50 rounded-full p-4 pr-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-100">
                        <div className="bg-linear-to-tr from-yellow-500 to-amber-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                            1
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900 text-lg">Time Saved</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Automated M-Pesa & bank reconciliation — no manual statement matching</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white hover:bg-amber-50 rounded-full p-4 pr-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-100">
                        <div className="bg-linear-to-tr from-yellow-500 to-amber-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                            2
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900 text-lg">Recurring & subscriptions</h4>
                            </div>
                            <p className="text-gray-600 text-sm">See what repeats every month—apps, bundles, dues—so nothing surprises you</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white hover:bg-amber-50 rounded-full p-4 pr-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-100">
                        <div className="bg-linear-to-tr from-yellow-500 to-amber-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                            3
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900 text-lg">Spending & saving clarity</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Categorized expenses, budgets, and goals in one coherent dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white hover:bg-amber-50 rounded-full p-4 pr-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-100">
                        <div className="bg-linear-to-tr from-yellow-500 to-amber-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                            4
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900 text-lg">Reminders that actually help</h4>
                            </div>
                            <p className="text-gray-600 text-sm">WhatsApp, SMS, and email for bills, renewals, and what you choose to track</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <a 
                        href="#" 
                        className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-tr from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                        Get Started Today 
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
            
            {/* right side - Image with overlays */}
            <div className="flex-1 hidden md:flex justify-center items-center relative">
                <div className="relative w-full max-w-xl overflow-hidden shadow-2xl"
                     style={{
                        borderRadius: '60% 40% 50% 30% / 30% 50% 40% 60%',
                        animation: 'morph 8s ease-in-out infinite'
                     }}>
                    <div className="relative w-full h-full transform scale-120 origin-center">
                        <img 
                            src={why_us_image} 
                            alt="Why choose VersoPaid" 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    
                    <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 to-teal-500/20"></div>
                </div>

                <div className="absolute -bottom-6 right-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 z-10">
                    <div className="flex -space-x-3">
                        {user_avatar_images.slice(0, 4).map((avatar, index) => (
                            <div 
                                key={index}
                                className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
                            >
                                <img 
                                    src={avatar} 
                                    alt={`User ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">Pilot</span>
                        <span className="text-xs text-gray-600">Early access members</span>
                    </div>
                </div>

                <div className="absolute top-6 -left-6 bg-white rounded-xl shadow-xl p-3 animate-float z-10">
                    <div className="flex items-center gap-2">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                            <FaCheckCircle className="text-yellow-600 text-sm" />
                        </div>
                        <div>
                        <p className="text-xs font-bold text-gray-900">Accurate</p>
                            <p className="text-[10px] text-gray-600">M-Pesa & bank matching</p>
                        </div>
                    </div>
                </div>

                <div className="absolute -z-10 w-full h-full bg-linear-to-tr from-yellow-100 to-amber-100 rounded-full blur-3xl opacity-30"
                     style={{
                        borderRadius: '40% 60% 30% 70% / 60% 30% 70% 40%',
                        transform: 'scale(1.1)'
                     }}>
                </div>

                {/* Yellow accent badge */}
                <div className="absolute top-1/2 -right-8 bg-linear-to-tr from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-12">
                    Trusted
                </div>
            </div>
            
        </div>
        
    </section>
  );
};

export default WhyUsComponent;