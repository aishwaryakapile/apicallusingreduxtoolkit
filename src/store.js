import { configureStore } from "@reduxjs/toolkit";
import formSlice, { formDataSlice } from "./component/formSlice";

 export const store = configureStore({
    reducer: {
      // form:formDataSlice,
      form:formSlice
    },
 })