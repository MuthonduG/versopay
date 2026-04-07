import { Toaster } from 'sonner';

/**
 * Sonner with VersoPaid yellow/amber accents (matches auth UI: from-yellow-500 to-amber-500).
 */
export function VersoToaster() {
  return (
    <Toaster
      position="top-right"
      closeButton
      duration={4200}
      gap={10}
      toastOptions={{
        classNames: {
          toast:
            'group rounded-xl border border-yellow-200/90 bg-white/95 text-gray-900 shadow-lg backdrop-blur-sm',
          title: 'font-semibold text-gray-900',
          description: 'text-sm text-gray-600',
          success:
            '!border-yellow-300 !bg-linear-to-br !from-yellow-50 !via-amber-50/90 !to-white !text-gray-900',
          error:
            '!border-red-200 !bg-red-50/95 !text-red-900',
          warning:
            '!border-amber-300 !bg-amber-50/95 !text-amber-950',
          loading: '!border-yellow-200 !bg-yellow-50/80',
          closeButton:
            'border-0 bg-transparent text-gray-500 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg',
        },
      }}
    />
  );
}
