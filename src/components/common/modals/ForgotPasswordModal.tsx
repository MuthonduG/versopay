import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaEnvelope, FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import { BsShieldCheck, BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ForgotPasswordModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (email: string) => void;
  onOpenOtp?: (email: string) => void; 
}

const ForgotPasswordModal = ({ 
  isOpen = true, 
  onClose, 
  onSubmit,
  onOpenOtp 
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const isSuccess = Math.random() > 0.3; 
      
      if (isSuccess) {
        setIsSubmitted(true);
        if (onSubmit) onSubmit(email);
        
        toast.success('OTP sent successfully! Check your email.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { background: "#10b981", color: "white" }
        });
      } else {
        toast.error('Failed to send OTP. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { background: "#ef4444", color: "white" }
        });
      }
    }, 1500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail('');
    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    toast.info('You can try with a different email address.', {
      position: "top-right",
      autoClose: 3000,
      theme: "light"
    });
  };

  const handleEnterOtp = () => {
    // Close forgot password modal and open OTP modal
    handleClose(); // Close this modal
    if (onOpenOtp) {
      onOpenOtp(email); // Open OTP modal with email
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div 
        className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div 
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={handleModalContentClick}
        >
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-10 right-10 opacity-20">
              <BsStars className="text-yellow-400 text-2xl" />
            </div>
            <div className="absolute bottom-10 left-10 opacity-20">
              <HiOutlineSparkles className="text-amber-400 text-2xl" />
            </div>
          </div>

          <div className="relative z-10 p-8">
            
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-linear-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center">
                {isSubmitted ? (
                  <FaPaperPlane className="text-4xl text-yellow-600" />
                ) : (
                  <FaEnvelope className="text-4xl text-yellow-600" />
                )}
              </div>
            </div>

            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                  Forgot Password?
                </h2>
                
                <p className="text-center text-gray-600 mb-8">
                  No worries! Enter your email address and we'll send you a one-time password (OTP) to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    Check Your Email
                  </h2>
                  
                  <p className="text-center text-gray-600 mb-6">
                    We've sent a one-time password (OTP) to{' '}
                    <span className="font-semibold text-yellow-600">{email}</span>
                  </p>

                  <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-100">
                    <p className="text-sm text-gray-600">
                      Please check your inbox and spam folder for the OTP. The code will expire in 10 minutes.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleEnterOtp}
                      className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
                    >
                      Enter OTP
                      <FaArrowRight />
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="w-full text-yellow-600 hover:text-yellow-700 font-medium py-2 transition-colors"
                    >
                      Try another email
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <BsShieldCheck className="text-yellow-500" />
                <span>We'll never share your email with anyone else.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>,
    document.body
  );
};

export default ForgotPasswordModal;