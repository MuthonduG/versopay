import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { BsShieldCheck, BsEye, BsEyeSlash, BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import ForgotPasswordModal from '../../../components/common/modals/ForgotPasswordModal';
import LoginImage from "../../../assets/login.png";
import OtpModal from '../../../components/common/modals/OtpComponent';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/oauth/onboarding');
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleCloseModal = () => {
    setShowForgotPassword(false);
  };

  const handleOtpRequested = (email: string) => {
    console.log('OTP requested for:', email);
    setEmail(email);
  };

  const handleOpenOtpModal = (email: string) => {
    setOtpEmail(email);
    setShowOtpModal(true);
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
  };

  const handleOtpSubmit = (otp: string) => {
    console.log('OTP submitted:', otp);
    // Handle OTP verification here
  };

  const handleResendOtp = () => {
    console.log('Resend OTP for:', otpEmail);
  };

  return (
    <section className="w-full min-h-screen flex relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl"></div>
        
        <div className="absolute top-40 left-[40%] opacity-20 animate-float-slow">
          <BsStars className="text-yellow-400 text-4xl" />
        </div>
        <div className="absolute bottom-40 right-[40%] opacity-20 animate-float-slow">
          <HiOutlineSparkles className="text-amber-400 text-4xl" />
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full min-h-screen">
        
        <div className="lg:flex-1 relative hidden lg:block h-screen">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={LoginImage} 
              alt="Login illustration" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 bg-linear-to-br from-yellow-800/80 via-lime-700/70 to-green-800/80 mix-blend-multiply"></div>
          
          <div className="absolute inset-0 bg-linear-to-t from-yellow-900/60 via-transparent to-lime-600/30"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 z-20">
            <div className="max-w-md text-center">
              <div className="flex justify-center items-center mb-8">
                <span className="text-4xl font-bold text-white drop-shadow-lg">Verso</span>
                <span className="text-4xl font-bold text-yellow-300 drop-shadow-lg">Paid</span>
              </div>
              
              <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">Welcome Back!</h2>
              <p className="text-xl text-yellow-100 leading-relaxed mb-10 drop-shadow">
                Simplify your payment collections and reconciliations. 
                Track who has paid and who hasn't - automatically.
              </p>
              
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <BsShieldCheck className="text-yellow-300 text-2xl" />
                  <span className="text-base font-medium">Bank-grade security</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <BsShieldCheck className="text-yellow-300 text-2xl" />
                  <span className="text-base font-medium">500+ trusted organizations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex-1 w-full lg:h-screen overflow-y-auto bg-linear-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md py-8 lg:py-0">
            <div className="flex justify-center items-center gap-2 mb-8 lg:hidden">
              <span className="text-3xl font-bold text-yellow-600">Verso</span>
              <span className="text-3xl font-bold text-gray-900">Paid</span>
            </div>

            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-gray-600">
                Don't have an account?{' '}
                {/* The Link component already handles navigation correctly */}
                <Link to="/oauth/register" className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </div>

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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <BsEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <BsEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="group w-full flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg mt-8"
              >
                Sign In
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-yellow-50 transition-colors group bg-white/80 backdrop-blur-sm">
                <FaGoogle className="text-red-500" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-600">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-yellow-50 transition-colors group bg-white/80 backdrop-blur-sm">
                <FaMicrosoft className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-600">Microsoft</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-8">
              By signing in, you agree to our{' '}
              <a href="#" className="text-yellow-600 hover:text-yellow-700 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-yellow-600 hover:text-yellow-700 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={handleCloseModal}
        onSubmit={handleOtpRequested}
        onOpenOtp={handleOpenOtpModal}
      />

      <OtpModal
        isOpen={showOtpModal}
        onClose={handleCloseOtpModal}
        onSubmit={handleOtpSubmit}
        email={otpEmail}
        onResend={handleResendOtp}
        expiryTime={300}
      />

    </section>
  );
};

export default LoginPage;