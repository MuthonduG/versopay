import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useRegister } from '../../../hooks/useAuth';
import { 
  FaEnvelope, 
  FaLock, 
  FaArrowRight, 
  FaGoogle, 
  FaMicrosoft,
  FaUser,
  FaBuilding,
  FaMapMarkerAlt,
  FaCreditCard,
} from 'react-icons/fa';
import { BsShieldCheck, BsEye, BsEyeSlash, BsStars, BsPeople } from 'react-icons/bs';
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdNumbers } from 'react-icons/md';
import register_image from "../../../assets/register.png";

type AccountType = 'personal' | 'organisation';
type PaymentMethod = 'mpesa' | 'airtel' | 'momo' | 'bank';

function normalizePhone(raw: string): string {
  const s = raw.replace(/\s/g, '');
  if (s.startsWith('+')) return s;
  if (s.startsWith('0')) return `+254${s.slice(1)}`;
  if (s.startsWith('254')) return `+${s}`;
  return s;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Account type (organisation path disabled; keep state for commented UI)
  const [accountType] = useState<AccountType>('personal');
  
  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  
  // Personal account fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Organisation account fields
  const [organisationName, setOrganisationName] = useState('');
  const [businessRegistration, setBusinessRegistration] = useState('');
  const [memberCount, setMemberCount] = useState('');
  
  // Payment method fields
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [airtelNumber, setAirtelNumber] = useState('');
  const [momoNumber, setMomoNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Terms agreement
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when account type changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [accountType]);

  const memberCountOptions = [
    { value: '0-20', label: '0 - 20 members' },
    { value: '21-50', label: '21 - 50 members' },
    { value: '51-100', label: '51 - 100 members' },
    { value: '100-1000', label: '100 - 1000 members' },
    { value: '1000+', label: '1000+ members' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      alert('Please agree to the terms and policies');
      return;
    }

    const result = await registerMutation.mutateAsync({
      firstName,
      lastName,
      email,
      phoneNumber: normalizePhone(phoneNumber),
      password,
      confirmPassword,
      termsAccepted: true,
      accountType: 'PERSONAL',
    });

    if (result.success) {
      toast.success('Account created. We sent a verification code to your email.');
      navigate('/oauth/verify-email', { state: { email } });
      return;
    }

    toast.error(result.error?.message ?? 'Registration failed. Please try again.');
  };

  return (
    <section className="w-full min-h-screen flex relative overflow-hidden">
      
      {/* Decorative elements */}
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
        
        <div className="lg:flex-1 hidden lg:block h-screen sticky top-0">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={register_image} 
              alt="Register illustration" 
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
              
              <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">Join Us Today!</h2>
              <p className="text-xl text-yellow-100 leading-relaxed mb-10 drop-shadow">
                Start automating your payment collections and reconciliations. 
                Create your account in minutes.
              </p>
              
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <BsShieldCheck className="text-yellow-300 text-2xl" />
                  <span className="text-base font-medium">Bank-grade security</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <BsPeople className="text-yellow-300 text-2xl" />
                  <span className="text-base font-medium">500+ trusted organizations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Registration Form - enhanced scrolling */}
        <div 
          ref={scrollContainerRef}
          className="lg:flex-1 w-full lg:h-screen overflow-y-auto overscroll-contain scroll-smooth bg-linear-to-br from-yellow-50 via-white to-amber-50 flex items-start justify-center p-6 lg:p-8"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#eab308 #fef3c7',
          }}
        >
          {/* Custom scrollbar styles */}
          <style>{`
            .lg\\:flex-1::-webkit-scrollbar {
              width: 8px;
            }
            .lg\\:flex-1::-webkit-scrollbar-track {
              background: #fef3c7;
              border-radius: 10px;
            }
            .lg\\:flex-1::-webkit-scrollbar-thumb {
              background: #eab308;
              border-radius: 10px;
            }
            .lg\\:flex-1::-webkit-scrollbar-thumb:hover {
              background: #ca8a04;
            }
          `}</style>

          <div className="w-full max-w-2xl py-8 lg:py-12">
            
            {/* Mobile logo */}
            <div className="flex justify-center items-center gap-2 mb-8 lg:hidden">
              <span className="text-3xl font-bold text-yellow-600">Verso</span>
              <span className="text-3xl font-bold text-gray-900">Paid</span>
            </div>

            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/oauth/login" className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Organisation account type toggle — re-enable when org onboarding returns
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <div className="grid grid-cols-2 gap-4">...</div>
              </div>
              */}

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                      placeholder="Doe"
                    />
                  </div>
                </div>

              {false && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="organisationName" className="block text-sm font-medium text-gray-700 mb-1">
                      Organisation Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBuilding className="text-gray-400" />
                      </div>
                      <input
                        id="organisationName"
                        type="text"
                        value={organisationName}
                        onChange={(e) => setOrganisationName(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="businessRegistration" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Registration <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdNumbers className="text-gray-400" />
                      </div>
                      <input
                        id="businessRegistration"
                        type="text"
                        value={businessRegistration}
                        onChange={(e) => setBusinessRegistration(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="e.g., BRN-2024-001"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="memberCount" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Members
                    </label>
                    <select
                      id="memberCount"
                      value={memberCount}
                      onChange={(e) => setMemberCount(e.target.value)}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    >
                      <option value="">Select member count</option>
                      {memberCountOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Email */}
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

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhoneAlt className="text-gray-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    placeholder="+254 700 000 000"
                  />
                </div>
              </div>

              {/* Password fields */}
              <div className="grid grid-cols-2 gap-4">
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
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <BsEyeSlash className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <BsEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {false && (
              <>
              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Payment Method
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {(['mpesa', 'airtel', 'momo', 'bank'] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-xl border-2 capitalize transition-all ${
                        paymentMethod === method
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-200 hover:border-yellow-200 text-gray-600'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional payment fields */}
              {paymentMethod === 'mpesa' && (
                <div>
                  <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    M-Pesa Number
                  </label>
                  <input
                    id="mpesaNumber"
                    type="tel"
                    value={mpesaNumber}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    placeholder="07XX XXX XXX"
                  />
                </div>
              )}

              {paymentMethod === 'airtel' && (
                <div>
                  <label htmlFor="airtelNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Airtel Money Number
                  </label>
                  <input
                    id="airtelNumber"
                    type="tel"
                    value={airtelNumber}
                    onChange={(e) => setAirtelNumber(e.target.value)}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    placeholder="07XX XXX XXX"
                  />
                </div>
              )}

              {paymentMethod === 'momo' && (
                <div>
                  <label htmlFor="momoNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Momo Money Number
                  </label>
                  <input
                    id="momoNumber"
                    type="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    placeholder="07XX XXX XXX"
                  />
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCreditCard className="text-gray-400" />
                      </div>
                      <input
                        id="cardNumber"
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      id="cardHolderName"
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                      placeholder="JOHN DOE"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        id="cardCvv"
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        required
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    placeholder="Nairobi, Kenya"
                  />
                </div>
              </div>
              </>
              )}

              {/* Terms and policies checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-yellow-600 hover:text-yellow-700 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-yellow-600 hover:text-yellow-700 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="group w-full flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 disabled:opacity-60 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg mt-8"
              >
                {registerMutation.isPending ? 'Creating…' : 'Create Account'}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Social registration */}
            <div className="relative my-8">
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-500">Or sign up with</span>
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
          </div>
        </div>
      </div>

    </section>
  );
};

export default RegisterPage;