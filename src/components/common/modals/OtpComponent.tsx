import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaArrowRight, FaClock } from 'react-icons/fa';
import { BsShieldCheck, BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OtpModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (otp: string) => void;
  email?: string;
  onResend?: () => void;
  expiryTime?: number; // in seconds
}

const OtpModal = ({ 
  isOpen = true, 
  onClose, 
  onSubmit, 
  email = "user@example.com",
  onResend,
  expiryTime = 300 // 5 minutes default
}: OtpModalProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(expiryTime);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimeLeft(expiryTime);
      setCanResend(false);
      setIsLoading(false);
      // Focus first input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen, expiryTime]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Take only first character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOtp = pastedData.slice(0, 6).split('');
    
    if (pastedOtp.length > 0) {
      const newOtp = [...otp];
      pastedOtp.forEach((value, index) => {
        if (index < 6 && /^\d$/.test(value)) {
          newOtp[index] = value;
        }
      });
      setOtp(newOtp);
      
      // Focus the next empty input or last input
      const nextEmptyIndex = newOtp.findIndex(val => val === '');
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        style: { background: "#ef4444", color: "white" }
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate random success/failure
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        if (onSubmit) onSubmit(otpValue);
        toast.success('OTP verified successfully!', {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          style: { background: "#10b981", color: "white" }
        });
      } else {
        toast.error('Invalid OTP. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          style: { background: "#ef4444", color: "white" }
        });
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setTimeLeft(expiryTime);
    setOtp(['', '', '', '', '', '']);
    
    if (onResend) {
      onResend();
    }
    
    toast.info('New OTP sent to your email', {
      position: "top-right",
      autoClose: 3000,
      theme: "light"
    });
    
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Decorative elements */}
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

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <FaTimes />
          </button>

          {/* Content */}
          <div className="relative z-10 p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verify Your Identity
              </h2>
              <p className="text-gray-600">
                We've sent a 6-digit verification code to{' '}
                <span className="font-semibold text-yellow-600">{email}</span>
              </p>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-6 text-sm">
              <FaClock className={`${timeLeft < 60 ? 'text-red-500' : 'text-gray-400'}`} />
              <span className={timeLeft < 60 ? 'text-red-500 font-medium' : 'text-gray-500'}>
                Code expires in {formatTime(timeLeft)}
              </span>
            </div>

            {/* OTP Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter verification code
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={setInputRef(index)}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                      maxLength={1}
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || otp.join('').length !== 6}
                className="group w-full flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify OTP
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Resend option */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm font-semibold transition-colors ${
                  canResend 
                    ? 'text-yellow-600 hover:text-yellow-700 cursor-pointer' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Resend OTP
              </button>
            </div>

            {/* Security note */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <BsShieldCheck className="text-yellow-500" />
                <span>Never share this code with anyone</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
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
    </>
  );
};

export default OtpModal;