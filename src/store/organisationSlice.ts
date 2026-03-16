/**
 * Organisation slice: manages the current organisation context.
 * Users can belong to multiple orgs; this slice tracks which one is active.
 * Used by dashboard, members, roles, and any feature that needs org-scoped data.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Minimal org shape for context; full details come from API
export interface Organisation {
  id: string;
  name: string;
  type: string;
  status: string;
  maxMembers?: number;
}

// State: current org (selected in switcher) and list of orgs user belongs to
export interface OrganisationState {
  current: Organisation | null;
  list: Organisation[];
}

const initialState: OrganisationState = {
  current: null,
  list: [],
};

export const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    // Set the active org when user switches in dropdown; null when none selected
    setCurrentOrganisation: (
      state,
      action: PayloadAction<Organisation | null>
    ) => {
      state.current = action.payload;
    },
    // Populate list after fetching user's orgs; used by org switcher
    setOrganisationList: (state, action: PayloadAction<Organisation[]>) => {
      state.list = action.payload;
    },
    // Clear org context on logout or when leaving dashboard
    clearOrganisationContext: (state) => {
      state.current = null;
      state.list = [];
    },
  },
});

export const {
  setCurrentOrganisation,
  setOrganisationList,
  clearOrganisationContext,
} = organisationSlice.actions;
export default organisationSlice.reducer;
