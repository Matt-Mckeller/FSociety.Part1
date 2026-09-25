import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RightPanel = 'detail' | 'chat' | null;
export type Modal = 'edit' | 'animate' | 'sequence-editor' | null;
export type View = 'gallery' | 'sequences';

export interface UiState {
  view: View;
  rightPanel: RightPanel;
  density: 'comfortable' | 'compact';
  modal: Modal;
  selectedSequenceId: string | null;
  lightboxAssetId: string | null;
}

const initial: UiState = {
  view: 'gallery',
  rightPanel: null,
  density: 'comfortable',
  modal: null,
  selectedSequenceId: null,
  lightboxAssetId: null,
};

const slice = createSlice({
  name: 'ui',
  initialState: initial,
  reducers: {
    setView(state, action: PayloadAction<View>) {
      state.view = action.payload;
    },
    setRightPanel(state, action: PayloadAction<RightPanel>) {
      state.rightPanel = action.payload;
    },
    setDensity(state, action: PayloadAction<UiState['density']>) {
      state.density = action.payload;
    },
    openModal(state, action: PayloadAction<Modal>) {
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modal = null;
    },
    setSelectedSequenceId(state, action: PayloadAction<string | null>) {
      state.selectedSequenceId = action.payload;
    },
    openLightbox(state, action: PayloadAction<string>) {
      state.lightboxAssetId = action.payload;
    },
    closeLightbox(state) {
      state.lightboxAssetId = null;
    },
  },
});

export const {
  setView,
  setRightPanel,
  setDensity,
  openModal,
  closeModal,
  setSelectedSequenceId,
  openLightbox,
  closeLightbox,
} = slice.actions;
export default slice.reducer;
