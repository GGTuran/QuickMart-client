import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    codes: ["DISCOUNT10", "FREESHIP", "SAVE20"],
  },
  reducers: {
    setCouponCode: (state, action) => {
      state.codes.push(action.payload);
    },
    clearCouponCode: (state) => {
      state.codes = [];
    },
    deleteCouponCode: (state, action) => {
      state.codes = state.codes.filter((code) => code !== action.payload);
    },
  },
});

export const { setCouponCode, clearCouponCode, deleteCouponCode } = couponSlice.actions;
export default couponSlice.reducer;
