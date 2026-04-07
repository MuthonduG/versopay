import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { BsShieldCheck } from 'react-icons/bs';
import { useVerifyEmail } from '../../../hooks/useAuth';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = (location.state as { email?: string } | null)?.email;

  const [otpCode, setOtpCode] = useState('');

  const verifyMutation = useVerifyEmail();

  useEffect(() => {
    if (!emailFromState) {
      toast.warning('Start registration to receive a verification code.');
      navigate('/oauth/register', { replace: true });
    }
  }, [emailFromState, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailFromState) return;
    if (!/^[0-9]{6}$/.test(otpCode.trim())) {
      toast.error('Enter the 6-digit code from your email.');
      return;
    }
    const result = await verifyMutation.mutateAsync({
      email: emailFromState,
      otpCode: otpCode.trim(),
    });
    if (result.success && result.data?.token) {
      toast.success('Email verified. Welcome to VersoPaid!');
      navigate('/dashboard', { replace: true });
      return;
    }
    toast.error(result.error?.message ?? 'Verification failed.');
  };

  if (!emailFromState) {
    return null;
  }

  return (
    <section className="w-full min-h-screen flex relative overflow-hidden bg-linear-to-br from-yellow-50 via-white to-amber-50">
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center items-center gap-2 mb-8">
            <span className="text-3xl font-bold text-yellow-600">Verso</span>
            <span className="text-3xl font-bold text-gray-900">Paid</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify your email</h1>
            <p className="text-gray-600">
              We sent a 6-digit code to{' '}
              <span className="font-medium text-gray-600">{emailFromState}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Verification code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 tracking-widest text-center text-lg"
                  placeholder="000000"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={verifyMutation.isPending}
              className="group w-full flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg"
            >
              {verifyMutation.isPending ? 'Verifying…' : 'Continue'}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Wrong email?{' '}
            <Link to="/oauth/register" className="text-yellow-600 font-semibold hover:underline">
              Go back
            </Link>
          </p>

          <div className="flex items-center gap-2 justify-center mt-8 text-xs text-gray-500">
            <BsShieldCheck className="text-yellow-500 shrink-0" />
            <span>Check your spam folder if you don&apos;t see the message.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmailPage;
