/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_GATEWAY: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_CAPTCHA_ENABLED: string;
  readonly VITE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
