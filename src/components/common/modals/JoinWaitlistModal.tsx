import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import { BsShieldCheck, BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as waitlistApi from '../../../api/modules/waitlist';
import type { CheckWaitlistStatusResponse, WaitlistFieldErrors, WaitlistJoinRequest } from '../../../api/types';

interface JoinWaitlistModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

const getFirstFieldError = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
  return undefined;
};

const PERSONAL_WAITLIST_TYPE = 'OTHER' as const;
const PERSONAL_WAITLIST_NOTE = 'Personal account';

const JoinWaitlistModal = ({ isOpen = true, onClose }: JoinWaitlistModalProps) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');

  const [fieldErrors, setFieldErrors] = useState<WaitlistFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [check, setCheck] = useState<CheckWaitlistStatusResponse | null>(null);
  const [isJoined, setIsJoined] = useState(false);

  const reset = () => {
    setEmail('');
    setPhoneNumber('');
    setFullName('');
    setFieldErrors({});
    setIsSubmitting(false);
    setIsChecking(false);
    setCheck(null);
    setIsJoined(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const shouldCheckEmail = isOpen && isEmailValid && !isSubmitting && !isJoined;

  useEffect(() => {
    if (!shouldCheckEmail) return;

    const handle = window.setTimeout(async () => {
      try {
        setIsChecking(true);
        const result = await waitlistApi.checkWaitlistStatus(email.trim());

        if (result.success) {
          setCheck(result.data ?? null);
        } else {
          // Keep UX clean: do not block submission if the check fails
          setCheck(null);
        }
      } finally {
        setIsChecking(false);
      }
    }, 600);

    return () => window.clearTimeout(handle);
  }, [email, isJoined, isOpen, isSubmitting, shouldCheckEmail]);

  const validateClient = (): boolean => {
    const nextErrors: WaitlistFieldErrors = {};
    const trimmedEmail = email.trim();
    const phoneClean = phoneNumber.replace(/\s+/g, '');

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!phoneClean || !PHONE_REGEX.test(phoneClean)) {
      nextErrors.phone_number = 'Please enter a valid phone number with country code (e.g., +254...).';
    }

    if (!fullName.trim()) {
      nextErrors.business_name = 'Please enter your full name.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleClose = () => onClose?.();

  const buildPayload = (): WaitlistJoinRequest => {
    const phoneClean = phoneNumber.replace(/\s+/g, '').trim();
    return {
      email: email.trim(),
      phone_number: phoneClean,
      business_name: fullName.trim(),
      business_type: PERSONAL_WAITLIST_TYPE,
      other_business_description: PERSONAL_WAITLIST_NOTE,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (check?.registered) {
      setFieldErrors({ email: 'This email is already registered on the waitlist.' });
      toast.error('You are already on the waitlist.', { position: 'top-right' });
      return;
    }

    if (!validateClient()) return;

    try {
      setIsSubmitting(true);
      const result = await waitlistApi.joinWaitlist(buildPayload());

      if (result.success) {
        setIsJoined(true);
        toast.success(result.data?.data?.business_name ? 'Successfully joined the waitlist!' : 'Successfully joined the waitlist!', {
          position: 'top-right',
          autoClose: 4000,
        });
        return;
      }

      const errData = result.error?.data as Record<string, unknown> | undefined;
      const nextErrors: WaitlistFieldErrors = {
        email: getFirstFieldError(errData?.email),
        phone_number: getFirstFieldError(errData?.phone_number),
        business_name: getFirstFieldError(errData?.business_name),
        business_type: getFirstFieldError(errData?.business_type),
        other_business_description: getFirstFieldError(errData?.other_business_description),
      };

      // Remove undefined keys for cleaner rendering
      Object.keys(nextErrors).forEach((k) => {
        if (nextErrors[k as keyof WaitlistFieldErrors] === undefined) delete nextErrors[k as keyof WaitlistFieldErrors];
      });

      setFieldErrors(nextErrors);

      const fallback = result.error?.message ?? 'Something went wrong. Please try again.';
      toast.error(fallback, { position: 'top-right', autoClose: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl" />
            <div className="absolute top-10 right-10 opacity-20">
              <BsStars className="text-yellow-400 text-2xl" />
            </div>
            <div className="absolute bottom-10 left-10 opacity-20">
              <HiOutlineSparkles className="text-amber-400 text-2xl" />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Close waitlist form"
            type="button"
          >
            <FaTimes />
          </button>

          <div className="relative z-10 p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
                <p className="text-gray-600">
                  Get early access for personal accounts. No spam—just product news.
                </p>
              </div>

              <div className="w-16 h-16 bg-linear-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center shrink-0">
                {isJoined ? (
                  <FaPaperPlane className="text-3xl text-yellow-600" />
                ) : (
                  <FaPaperPlane className="text-3xl text-yellow-600" />
                )}
              </div>
            </div>

            {isJoined ? (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
                  <p className="font-semibold text-gray-900 text-lg mb-2">You’re in.</p>
                  <p className="text-gray-600">
                    We’ll contact you at <span className="font-semibold text-yellow-700">{email.trim()}</span> when your onboarding slot is ready.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full group flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  Close
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-200">
                  <BsShieldCheck className="text-yellow-500" />
                  <span>We’ll never share your email with anyone else.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@email.com"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  {fieldErrors.email ? (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                  ) : check?.registered ? (
                    <p className="mt-1 text-sm text-yellow-700">
                      {check.message} You can’t submit again.
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="waitlist-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="waitlist-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="+254712345678"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    aria-invalid={Boolean(fieldErrors.phone_number)}
                  />
                  {fieldErrors.phone_number ? (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.phone_number}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="waitlist-full-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    id="waitlist-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Jane Njeri"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/80"
                    aria-invalid={Boolean(fieldErrors.business_name)}
                  />
                  {fieldErrors.business_name ? (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.business_name}</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isChecking}
                  className="group w-full flex justify-center items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-200">
                  <BsShieldCheck className="text-yellow-500" />
                  <span>We’ll never share your email with anyone else.</span>
                </div>
              </form>
            )}
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

export default JoinWaitlistModal;

