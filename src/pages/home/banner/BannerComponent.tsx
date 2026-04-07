import { FaArrowRight } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { HiOutlineSparkles } from 'react-icons/hi';

const BannerComponent = () => {
  return (
    <section className="w-full flex justify-center items-center relative overflow-hidden bg-linear-to-b from-white to-amber-50/30 py-16">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="absolute top-10 left-10 animate-float-slow opacity-20">
          <BsStars className="text-yellow-500 text-4xl" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float-slow opacity-20">
          <HiOutlineSparkles className="text-amber-500 text-4xl" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center w-[90%] md:w-[70%] py-16 px-4">
        
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight">
            <span className="text-gray-900">Feel good about </span>
            <span className="text-transparent bg-clip-text bg-linear-to-tr from-yellow-500 to-amber-500">
              every shilling
            </span>
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed w-full md:w-[80%] text-center text-gray-600 mt-6">
            Bring recurring bills, everyday spending, and savings goals into one clear view—then reconcile M-Pesa and bank activity without juggling five tools.
            Join the waitlist and help shape VersoPaid for Kenya.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12 w-full md:w-[60%]">
          <a 
            href="#" 
            className="group w-full px-6 py-4 flex justify-center items-center bg-linear-to-tr from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 transform shadow-xl rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 gap-2"
          >
            Get Started Free
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          {/* <a 
            href="#" 
            className="group w-full px-6 py-4 flex justify-center items-center bg-white hover:bg-gray-50 transform shadow-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 border-2 border-gray-200 gap-2"
          >
            <FaUsers className="text-yellow-500" />
            Request Demo
          </a> */}
        </div>

        <div className="w-full md:w-[60%] mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center mb-4">
            Want to stay updated? Get product news and early access.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <MdOutlineEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-11 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-linear-to-tr from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>

          {/* Added trust indicator */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <span className="text-xs text-gray-500">Subscriptions • spending • goals • M-Pesa-ready</span>
            <span className="text-xs text-gray-500">🔒 No spam, unsubscribe anytime</span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BannerComponent;