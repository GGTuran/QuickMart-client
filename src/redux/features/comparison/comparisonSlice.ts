

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ComparisonState {
  selectedProducts: string[];
}

const initialState: ComparisonState = {
  selectedProducts: [],
};

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addProductToCompare: (state, action: PayloadAction<string>) => {
      if (!state.selectedProducts.includes(action.payload)) {
        state.selectedProducts.push(action.payload);
      }
    },
    removeProductFromCompare: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(id => id !== action.payload);
    },
    clearComparison: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { addProductToCompare, removeProductFromCompare, clearComparison } = comparisonSlice.actions;

export default comparisonSlice.reducer;
