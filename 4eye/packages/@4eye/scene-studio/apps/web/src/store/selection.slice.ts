import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectionState {
  selectedIds: string[];
  startFrameId: string | null;
}

const initial: SelectionState = {
  selectedIds: [],
  startFrameId: null,
};

const slice = createSlice({
  name: 'selection',
  initialState: initial,
  reducers: {
    select(state, action: PayloadAction<{ id: string; mode?: 'replace' | 'toggle' }>) {
      const { id, mode = 'replace' } = action.payload;
      if (mode === 'toggle') {
        state.selectedIds = state.selectedIds.includes(id)
          ? state.selectedIds.filter((x) => x !== id)
          : [...state.selectedIds, id];
      } else {
        state.selectedIds = [id];
      }
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
    setStartFrame(state, action: PayloadAction<string | null>) {
      state.startFrameId = action.payload;
    },
  },
});

export const { select, clearSelection, setStartFrame } = slice.actions;
export default slice.reducer;
