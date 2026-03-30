/**
 * UI slice: manages global UI preferences that persist across routes.
 * Theme, language, and sidebar state are shared by layout components.
 * Can be persisted to localStorage later for user preferences.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Theme: light, dark, or system (follow OS)
export type Theme = 'light' | 'dark' | 'system';
// Language: English or Swahili for i18n
export type Language = 'en' | 'sw';

export interface UIState {
  theme: Theme;
  language: Language;
  sidebarCollapsed: boolean;
}

const initialState: UIState = {
  theme: 'system',
  language: 'en',
  sidebarCollapsed: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Set theme; layout applies class or CSS vars for light/dark
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    // Set language; i18n layer reads this for translations
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    // Toggle sidebar collapsed state; used by sidebar toggle button
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    // Set sidebar collapsed explicitly; useful for responsive breakpoints
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  toggleSidebar,
  setSidebarCollapsed,
} = uiSlice.actions;
export default uiSlice.reducer;
